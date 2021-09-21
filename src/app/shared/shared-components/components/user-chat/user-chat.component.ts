import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ConstantsService } from 'src/app/_services/constants.service';
import { UserService } from 'src/app/_services/user.service';
import { WebsocketService } from 'src/app/_services/websocket.service';

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
  searchTermByNameMember;

  groupName = "";
  addGrpMembers = [];

  public updateProfileimg: FormGroup;
  message: string;
  filepath: File;
  imagePath: any;
  imgURL: any;
  currentGroupId: string | Blob;

  openCreateGroupModal;
  userData;

  constructor(private formBuilder: FormBuilder,
    private _socket: WebsocketService,
    private _constants : ConstantsService,
    private router: Router,
    private userService: UserService,
    private _route: ActivatedRoute
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

    this.auctionFrm = this.formBuilder.group({
      searchTermByNameIs : []
    });

    this.updateProfileimg = this.formBuilder.group({
      file: ["", Validators.compose([Validators.required])],
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
      this.createGroup(false);
      this.groupName = this.userData.fullName + "_Group";
      this.imgURL = this.userData.profileimage;
      this.addMemberThroughDirect(this.userData._id);
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
            this.closeGroupModal();
            this.addPlusIconToAllMembers();
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
    //call to get all emoployers.
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
    if(showValue !== 0){
      this.imgVal = showValue;
      jQuery("#showImage").modal("open");
    }
  }

  closeImageModal() {
    jQuery("#showImage").modal("close");
  }

  closeGroupModal(){
    jQuery("#createGroupModal").modal("close");
  }

  createGroup(status){
    // if(status){
    //   this.groupName = "";
    //   this.imgURL = "";
    //   this.addGrpMembers = [];
    // }
    jQuery("#createGroupModal").modal("open");
  }

  createAndAddGroup(){
    if(this.groupName !== ""){

      let status = true;
      this.groupChatUsers.forEach((grp, index) => {
        if(grp.fullName.toLowerCase() == this.groupName.toLowerCase()){
          status = false;
        }
      });

      if(status){
        let payload = {
          groupName : this.groupName,
          members : [this.loggedInUser._id, ...this.addGrpMembers]
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

  addMember(id){
    if(this.addGrpMembers.indexOf(id) == -1){
      this.addGrpMembers.push(id);
    }else{
      Materialize.toast("Already added...", 1000, "green");
    }
    jQuery("#add_"+id).css("display","none");
    jQuery("#remove_"+id).css("display","block");
  }

  addMemberThroughDirect(id){
    if(this.addGrpMembers.indexOf(id) == -1){
      this.addGrpMembers = [id];
      setTimeout(function(){
        jQuery("#add_"+id).css("display","none");
        jQuery("#remove_"+id).css("display","block");
      }, 1000);
    }else{
      Materialize.toast("Already added...", 1000, "green");
    }
  }

  removeMember(id){
    if(this.addGrpMembers.indexOf(id) !== -1){
      this.addGrpMembers.forEach((member, index) => {
        if (member == ''+id) {
          this.addGrpMembers.splice(index, 1);
        }
      });
      jQuery("#remove_"+id).css("display","none");
      jQuery("#add_"+id).css("display","block");
    }else{
      Materialize.toast("Not added...", 1000, "red");
    }
  }

  addPlusIconToAllMembers(){
    this.chatUsers.forEach((user, index) => {
      jQuery("#remove_"+user._id).css("display","none");
      jQuery("#add_"+user._id).css("display","block");
    });
  }

  preview(files) {
    if (files.length === 0) return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      Materialize.toast(this.message, 1000, "red");
      return;
    }
    this.filepath = <File>files[0];

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
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
          (error) => {
            console.log(error);
          }
        );
      }
    }
  }

}
