import { AfterViewChecked, Component, ElementRef, OnChanges, OnInit, ViewChild } from '@angular/core';
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
  
  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService, private _socket: WebsocketService, private _constants: ConstantsService) {
    // this.messageIs = '';
    this.loggedInUser = this.userService.getUserData();
    this.route.params.subscribe(params => {
      this.receiverId = params.id;
      this.groupChat = this.route.snapshot.queryParams["groupChat"];
      if(!this.groupChat){
        this.handleUserData();
      }
    });

    this.settingLists = [{
      id : 1,
      name : "Show Members"
    },{
      id : 2,
      name : "Add Members"
    },{
      id : 3,
      name : "Upload Profile Picture"
    }];
  }

  async ngOnInit() {
    jQuery(".modal").modal();

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
          this.insertGrpMembers();
        }
        break;
      case this._constants.addNewChat:
        if (res.data) {
          if (res.data.message.senderId === this.receiverId || res.sameUser) {
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
          this.groupMessages = res.data;
          this.user = this.groupMessages;
          this.addGrpMembers = [];
          this.insertGrpMembers();
        }
        break;
      default:
        break;
    }
  }

  insertGrpMembers(){
    this.groupMessages.members.forEach((member) => {
      this.addGrpMembers.push(member.memberId._id);
    });
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

  setting(){
    console.log("setting() : ");
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

  updateMembers(){
    let payload = {
      groupId : this.receiverId,
      members : this.addGrpMembers
    }

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
    console.log("this.addGrpMembers : ",this.addGrpMembers);
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
    console.log("this.addGrpMembers : ",this.addGrpMembers);
  }

}
