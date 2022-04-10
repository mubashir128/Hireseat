import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ConstantsService } from 'src/app/_services/constants.service';
import { SubscriberslistService } from 'src/app/_services/subscriberslist.service';
import { UserService } from 'src/app/_services/user.service';
import { WebsocketService } from 'src/app/_services/websocket.service';
import { DialogCreateGroupComponent } from '../dialog-create-group/dialog-create-group.component';
import { DialogImagePreviewComponent } from '../dialog-image-preview/dialog-image-preview.component';

declare var jQuery
declare var $: any;
declare var Materialize;
@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.css']
})
export class UserChatComponent implements OnInit, OnChanges {

  chgStyle = 1;

  userChatObserver = new Subject();
  userChatObserver$ = this.userChatObserver.asObservable();

  onlyChatUsers = [];
  chatUsers = [];
  groupChatUsers = [];

  currentUserRole;
  loggedInUser: any;

  imgVal = '';

  public auctionFrm: FormGroup;
  searchTermByName;

  groupName = "";
  addGrpMembers = [];

  message: string;
  filepath: File;
  imagePath: any;
  imgURL: any;
  currentGroupId: string | Blob;

  openCreateGroupModal;
  userData;

  showAddedUserAre = [];

  constructor(private formBuilder: FormBuilder,
    private _socket: WebsocketService,
    private _constants : ConstantsService,
    private router: Router,
    private userService: UserService,
    private _route: ActivatedRoute,
    public dialog: MatDialog,
    private _subList : SubscriberslistService
  ){
    this.loggedInUser = this.userService.getUserData();
    if(this.loggedInUser.userRole == "employer"){
      this.currentUserRole = "EMPLOYERS";
    }else if(this.loggedInUser.userRole == "recruiter"){
      this.currentUserRole = "RECRUITERS";
    }else if(this.loggedInUser.userRole == "candidate"){
      this.currentUserRole = "CANDIDATES";
    }

    this._route.params.subscribe(params => {
      this.chgStyle = this._route.snapshot.queryParams["groupChatActive"];
      this.chgStyle = this.chgStyle !== undefined ? this.chgStyle : 1;
      this.openCreateGroupModal = this._route.snapshot.queryParams["openCreateGroupModal"];
      this.userData = JSON.parse(this._route.snapshot.queryParams["userData"]);
    });

  }

  async ngOnInit() {
    jQuery(".modal").modal();

    this._subList.mobileMenuTabSub.next({show : true});

    this.auctionFrm = this.formBuilder.group({
      searchTermByNameIs : []
    });

    //add a observable for userChat
    await this._socket.removeListener({ type: this._constants.userChatType });
    this._socket.addListener({
      type: this._constants.userChatType,
      callback: this.userChatObserver,
    });

    //when any activity of userChat is happened, then this observable is called.
    this.userChatObserver$.subscribe((res: any) => {
      this.handleUserChat(res);
    });

    this.getOnlyUserChats();
    this.getAllUsers();
    this.getGroupUsers();

    this.openTwoWayChatCreateGroup();
  }

  ngOnChanges() {
    jQuery(".modal").modal();
  }

  openTwoWayChatCreateGroup(){
    if(this.openCreateGroupModal){
      this.groupName = this.userData.fullName + "_Group";
      this.imgURL = this.userData.profileimage;
      this.addMemberThroughDirect(this.userData);
      this.createGroup();
    }
  }

  getOnlyUserChats(){
    //call to get all chats.
    this._socket.sendMessage({
      type: this._constants.userChatType,
      data: {
        subType: this._constants.getOnlyUserChats
      }
    });
  }

  //handle all user chat.
  handleUserChat(res: any) {
    switch (res.subType) {
      case this._constants.getAllUsers:
        this.chatUsers = res.data;
        break;
      case this._constants.getOnlyUserChats:
        this.onlyChatUsers = res.data;
        break;
      case this._constants.getGroupChatUsers:
        this.groupChatUsers = res.data;
        break;
      case this._constants.createAndAddGroup:
        if(res){
          this.groupChatUsers = [res.data, ...this.groupChatUsers];
          if(res.sameUser){
            this.addGrpMembers = [];
            this.currentGroupId = res.data._id;
            this.updateProfileImg();
          }else{

          }
        }
        break;
      default : 
        break;
    }
  }

  getAllUsers(){
    //call to get all users.
    this._socket.sendMessage({
      type: this._constants.userChatType,
      data: {
        subType: this._constants.getAllUsers
      },
    });
  }

  showUserData(id, groupChat){
    this.router.navigate(["/"+this.loggedInUser.userRole+"/chat-record", id], { queryParams: { groupChat : groupChat }});
  }

  setting(){
    console.log("--- setting : ");
  }

  changesType(type){
    this.chgStyle = type;
    // if(type === '1'){
    //   this.getOnlyUserChats();
    // }else if(type === '2'){
    //   this.getAllUsers();
    // }else if(type === '3'){
    //   this.getAllUsers();
    //   this.getGroupUsers();
    // }
  }

  getGroupUsers(){
    this._socket.sendMessage({
      type: this._constants.userChatType,
      data: {
        subType: this._constants.getGroupChatUsers
      },
    });
  }

  showImageModal(showValue) {
    const dialogImagePreviewRef = this.dialog.open(DialogImagePreviewComponent,{
      data: {
        dialogType : "imagePreview",
        dialogTitle : "Image Preview...",
        imgUrl : showValue.profileimage,
        fullName : showValue.fullName
      }
    });

    dialogImagePreviewRef.afterClosed().subscribe(result => {
      if(result){
      }
    });
  }

  createGroup(){
    const dialogCreateGroupRef = this.dialog.open(DialogCreateGroupComponent,{
      data: {
        dialogType : "creatGroup",
        dialogTitle : "Create Group...",
        chatUsers : this.chatUsers,
        loggedInUser: this.loggedInUser,
        showAddedUserAre : this.showAddedUserAre,
        addGrpMembers : this.addGrpMembers,
        groupName : this.groupName,
        imgURL : this.imgURL
      }
    });

    dialogCreateGroupRef.afterClosed().subscribe(result => {
      if(result){
        this.createAndAddGroup(result);
      }
    });
  }

  createAndAddGroup(result){
    this.imagePath = result.imagePath;
    this.filepath = result.filepath;
    if(result.groupName !== ""){
      let status = true;
      this.groupChatUsers.forEach((grp, index) => {
        if(grp.fullName.toLowerCase() == result.groupName.toLowerCase()){
          status = false;
        }
      });

      if(status){
        let payload = {
          groupName : result.groupName,
          members : [this.loggedInUser._id, ...result.addGrpMembers]
        };
        
        this._socket.sendMessage({
          type: this._constants.userChatType,
          data: {
            subType: this._constants.createAndAddGroup,
            payload : payload
          },
        });
      }else{
        Materialize.toast("Group Name Already Exists...", 1000, "red");
      }
    }else{
      Materialize.toast("Group Name must not empty...", 1000, "red");
    }
  }

  addMemberThroughDirect(user){
    let id = user._id;
    if(this.addGrpMembers.indexOf(id) == -1){
      this.addGrpMembers = [id];
      this.showAddedUserAre = [user];
      setTimeout(function(){
        jQuery("#add_"+id).css("display","none");
        jQuery("#remove_"+id).css("display","block");
      }, 1000);
    }else{
      Materialize.toast("Already added...", 1000, "green");
    }
  }

  updateProfileImg() {
    if(this.filepath){
      if (!this.imagePath) {
        Materialize.toast(
          "Please click on the plus Icon to upload a Picture !",
          4000
        );
      } else {
        let fddd = new FormData();
        fddd.append("file", this.imagePath[0], this.imagePath[0].name);
        fddd.append("id", this.currentGroupId);
        this.userService.updateGroupProfileImg(fddd).subscribe(
          (res) => {
            Materialize.toast(res.message, 1000, "green");
          },
          (err) => {
            console.log(err);
          }
        );
      }
    }
  }

  getImage(obj){
    obj.showCreatedLogo = true;
  }

}
