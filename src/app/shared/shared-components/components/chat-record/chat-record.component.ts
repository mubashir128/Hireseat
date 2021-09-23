import { AfterViewChecked, Component, ElementRef, OnChanges, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ConstantsService } from 'src/app/_services/constants.service';
import { UserService } from 'src/app/_services/user.service';
import { WebsocketService } from 'src/app/_services/websocket.service';

declare var jQuery;
declare var $: any;
declare var Materialize;

@Component({
  selector: 'app-chat-record',
  templateUrl: './chat-record.component.html',
  styleUrls: ['./chat-record.component.css']
})
export class ChatRecordComponent implements OnInit, AfterViewChecked, OnChanges {

  receiverId: any;
  loggedInUser: any;
  user: any;
  messageIs: any;

  userMessages: any;

  userChatMessageObserver = new Subject();
  userChatMessageObserver$ = this.userChatMessageObserver.asObservable();

  groupChat;
  groupMessages;

  @ViewChild('chatDiv', { static: true }) private chatDiv: ElementRef;
  @ViewChild('inputDiv', { static: true }) private inputDiv: ElementRef;

  settingLists = [];
  addGrpMembers = [];
  updateGrpMembers = [];
  allUpdateGrpMembers = [];

  public updateProfileimg: FormGroup;
  message: string;
  filepath: File;
  imagePath: any;
  imgURL: any;

  allNewMembers = [];
  addNewGrpMembers = [];
  
  constructor(private route: ActivatedRoute, 
    private router: Router, 
    private userService: UserService, 
    private _socket: WebsocketService, 
    private _constants: ConstantsService,
    private _formBuilder: FormBuilder
  ) {
    // this.messageIs = '';
    this.loggedInUser = this.userService.getUserData();
    this.route.params.subscribe(params => {
      this.receiverId = params.id;
      this.groupChat = this.route.snapshot.queryParams["groupChat"];
      if(!this.groupChat){
        this.handleUserData();
      }
    });

  }

  async ngOnInit() {
    jQuery(".modal").modal();

    this.updateProfileimg = this._formBuilder.group({
      file: ["", Validators.compose([Validators.required])],
    });

    //add a observable for userChat
    await this._socket.removeListener({ type: this._constants.userChatMessageType });
    this._socket.addListener({
      type: this._constants.userChatMessageType,
      callback: this.userChatMessageObserver,
    });

    //when any activity of userChat is happened, then this observable is called.
    this.userChatMessageObserver$.subscribe((res: any) => {
      this.handleChatMessage(res);
    });

    this.getAllChats();
  }


  ngOnChanges() {
    jQuery(".modal").modal();
  }

  ngAfterViewChecked() {
    this.goToBottom();
  }

  getAllChats() {
    if(this.groupChat){
      //call to get all group chats.
      this._socket.sendMessage({
        type: this._constants.userChatMessageType,
        data: {
          subType: this._constants.getAllGroupChats,
          payload : {
            groupId: this.receiverId
          }
        }
      });
    }else{
      //call to get all chats.
      this._socket.sendMessage({
        type: this._constants.userChatMessageType,
        data: {
          subType: this._constants.getAllChats,
          receiverId: this.receiverId
        }
      });
    }
  }

  //handle all user chat message.
  handleChatMessage(res: any) {
    switch (res.subType) {
      case this._constants.getAllChats:
        if (res.data) {
          this.userMessages = res.data;
        }
        break;
      case this._constants.getAllGroupChats:
        if (res.data) {
          this.groupMessages = res.data;
          this.user = this.groupMessages;
          this.insertSettingList();
          this.insertGrpMembers();
          this.getAllUsers();
          this.imgURL = this.groupMessages.profileimage;
        }
        break;
      case this._constants.addNewChat:
        if (res.data) {
          if (res.data.user1._id === this.receiverId || res.data.user2._id === this.receiverId) {
            if (this.userMessages === undefined) {
              res.data.message = [res.data.message];
              this.userMessages = res.data;
            } else {
              this.userMessages.message = [...this.userMessages.message, res.data.message];
            }
          }
        }
        break;
      case this._constants.addNewGroupChat:
        if (res.data) {
          if (res.data._id == this.receiverId || res.sameUser) {
            if (this.groupMessages == undefined) {
              this.groupMessages = res.data;
            } else {
              this.groupMessages.message = [...this.groupMessages.message, res.data.message[res.data.message.length - 1]];
            }
          }
        }
        break;
      case this._constants.updateGroupMembers : 
        if(res.data){
          this.closeMembersModal();
          this.closeAddMemberModal();
          this.groupMessages = res.data;
          this.user = this.groupMessages;
          this.addGrpMembers = [];
          this.insertGrpMembers();
          this.updateGrpMembers = [];
          this.addAllNewMembers();
          this.addNewGrpMembers = [];
        }
        break;
      case this._constants.getAllUsers:
        this.allUpdateGrpMembers = res.data;
        this.addAllNewMembers();
        break;
      default:
        break;
    }
  }

  addAllNewMembers(){
    this.allUpdateGrpMembers.forEach((ele, index) => {
      let temp = true;
      this.user.members.forEach((eleMatch, index2) => {
        if(ele._id == eleMatch.memberId._id){
          temp = false;
        }
      });
      if(temp){
        this.updateGrpMembers.push(ele);
      }
    });
  }

  getAllUsers(){
    //call to get all users.
    this._socket.sendMessage({
      type: this._constants.userChatMessageType,
      data: {
        subType: this._constants.getAllUsers
      },
    });
  }

  insertGrpMembers(){
    this.groupMessages.members.forEach((member) => {
      this.addGrpMembers.push(member.memberId._id);
    });
  }

  insertSettingList(){
    this.settingLists = [{
      id : 1,
      status : true,
      name : "Show Members"
    },{
      id : 2,
      status : (this.loggedInUser._id == this.user.createdBy?._id),
      name : "Add Members"
    },{
      id : 3,
      status : true,
      name : "Upload Profile Picture"
    }];
  }

  handleUserData() {
    this.getCurrentUserDetails();
  }

  getCurrentUserDetails() {
    this.userService.getUserDetails({ receiverId: this.receiverId }).subscribe((res: any) => {
      this.user = res.data;
    });
  }

  backToChat() {
    this.router.navigate(["/" + this.loggedInUser.userRole + "/user-chat"], { queryParams: { groupChatActive: this.groupChat ? 3 : 1 }});
  }

  sendChatMessage(text) {
    this.messageIs = this.inputDiv.nativeElement.value;

    if (this.messageIs == '' || this.messageIs == undefined) {
      return;
    }

    if(!this.groupChat){
      let payload = {
        receiverId: this.receiverId,
        message: this.messageIs
      };

      if (this.messageIs) {
        this._socket.sendMessage({
          type: this._constants.userChatMessageType,
          data: {
            subType: this._constants.addNewChat,
            data: payload
          },
        });
      }
    }else{
      let payload = {
        groupId: this.receiverId,
        message: this.messageIs
      };

      if (this.messageIs) {
        this._socket.sendMessage({
          type: this._constants.userChatMessageType,
          data: {
            subType: this._constants.addNewGroupChat,
            payload: payload
          },
        });
      }
    }

    this.messageIs = "";
  }

  goToBottom() {
    try {
      this.chatDiv.nativeElement.scrollTop = this.chatDiv.nativeElement.scrollHeight;
    } catch (err) {
      console.log(err);
    }
  }

  showImageModal(showValue) {
    if (showValue) {
      jQuery("#showImage").modal("open");
    }
  }

  closeImageModal() {
    jQuery("#showImage").modal("close");
  }

  twoWayChatsetting(){
    let userData = (this.userMessages.user1._id == this.loggedInUser._id) ? this.userMessages.user2 : this.userMessages.user1;
    this.router.navigate(["/"+this.loggedInUser.userRole+"/user-chat"], { queryParams: { groupChatActive : 3, openCreateGroupModal : true, userData :  JSON.stringify(userData) }});
  }

  setting(){
    this.openSettingModal();
  }

  openSettingModal() {
    jQuery("#showSettings").modal("open");
  }

  closeSettingModal() {
    jQuery("#showSettings").modal("close");
  }

  openListsModals(id){
    this.closeSettingModal();
    switch(id){
      case 1 : 
        this.openMembersModal();
        break ;
      case 2 : 
        this.openAddMemberModal();
        break ;
      case 3 : 
        this.openUpdateProfilePictureModal();
        break ;
      default : 
        break ;
    }
  }

  openMembersModal() {
    jQuery("#showMembers").modal("open");
  }

  closeMembersModal() {
    jQuery("#showMembers").modal("close");
  }

  openUpdateProfilePictureModal() {
    jQuery("#updateNewImage").modal("open");
  }

  closeUpdateProfilePictureModal() {
    jQuery("#updateNewImage").modal("close");
  }

  openAddMemberModal() {
    jQuery("#addMember").modal("open");
  }

  closeAddMemberModal() {
    jQuery("#addMember").modal("close");
  }

  updateMembers(){
    let payload = {
      groupId : this.receiverId,
      members : this.addGrpMembers
    };

    this._socket.sendMessage({
      type: this._constants.userChatMessageType,
      data: {
        subType: this._constants.updateGroupMembers,
        payload: payload
      },
    });

  }

  addMoreGroupMembers(){
    let previousMembers = [];
    this.user.members.forEach((item) => {
      previousMembers.push(item.memberId._id);
    });

    let payload = {
      groupId : this.receiverId,
      members : [...previousMembers, ...this.addNewGrpMembers]
    };

    this._socket.sendMessage({
      type: this._constants.userChatMessageType,
      data: {
        subType: this._constants.updateGroupMembers,
        payload: payload
      },
    });
  }

  addMember(id){
    if(this.addGrpMembers.indexOf(id) == -1){
      jQuery("#add_"+id).css("display","none");
      jQuery("#remove_"+id).css("display","block");
      this.addGrpMembers.push(id);
    }else{
      Materialize.toast("Already added...", 1000, "green");
    }
  }

  removeMember(id){
    if(this.addGrpMembers.indexOf(id) !== -1){
      jQuery("#remove_"+id).css("display","none");
      jQuery("#add_"+id).css("display","block");
      this.addGrpMembers.forEach((member, index) => {
        if (member == ''+id) {
          this.addGrpMembers.splice(index, 1);
        }
      });
    }else{
      Materialize.toast("Not added...", 1000, "red");
    }
  }

  addNewGroupMember(id){
    if(this.addNewGrpMembers.indexOf(id) == -1){
      jQuery("#addNewGroup_"+id).css("display","none");
      jQuery("#removeNewGroup_"+id).css("display","block");
      this.addNewGrpMembers.push(id);
    }else{
      Materialize.toast("Already added...", 1000, "green");
    }
  }

  removeNewGroupMember(id){
    if(this.addNewGrpMembers.indexOf(id) !== -1){
      jQuery("#removeNewGroup_"+id).css("display","none");
      jQuery("#addNewGroup_"+id).css("display","block");
      this.addNewGrpMembers.forEach((member, index) => {
        if (member == ''+id) {
          this.addNewGrpMembers.splice(index, 1);
        }
      });
    }else{
      Materialize.toast("Not added...", 1000, "red");
    }
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

  updateProfilePicture(){
    if(this.filepath){
      if (!this.imagePath) {
        Materialize.toast(
          "Please click on the plus Icon to upload a Picture !",
          4000
        );
      } else {
        let fddd = new FormData();
        fddd.append("file", this.imagePath[0], this.imagePath[0].name);
        fddd.append("id", this.receiverId);
        this.userService.updateGroupProfileImg(fddd).subscribe(
          (res) => {
            this.user.profileimage = res.data.profileimage;
            this.closeUpdateProfilePictureModal();
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
