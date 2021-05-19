import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ConstantsService } from 'src/app/_services/constants.service';
import { UserService } from 'src/app/_services/user.service';
import { WebsocketService } from 'src/app/_services/websocket.service';

declare var jQuery;
@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.css']
})
export class UserChatComponent implements OnInit, OnChanges {

  chgStyle = true;

  userChatObserver = new Subject();
  userChatObserver$ = this.userChatObserver.asObservable();

  onlyChatUsers = [];
  chatUsers = [];

  currentUserRole;
  loggedInUser: any;

  imgVal = '';

  public auctionFrm: FormGroup;
  searchTermByName;

  constructor(private formBuilder: FormBuilder, private _socket: WebsocketService, private _constants : ConstantsService, private router: Router, private userService: UserService) {
    this.loggedInUser = this.userService.getUserData();
    if(this.loggedInUser.userRole == "employer"){
      this.currentUserRole = "EMPLOYERS";
    }else if(this.loggedInUser.userRole == "recruiter"){
      this.currentUserRole = "RECRUITERS";
    }else if(this.loggedInUser.userRole == "candidate"){
      this.currentUserRole = "CANDIDATES";
    }
  }

  async ngOnInit() {
    jQuery(".modal").modal();

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

  }

  ngOnChanges() {
    jQuery(".modal").modal();
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

  showUserData(id){
    this.router.navigate(["/"+this.loggedInUser.userRole+"/chat-record", id]);
  }

  setting(){
    console.log("--- setting : ");
  }

  changesType(type){
    this.chgStyle = (type === '1') ? true : false;
    if(type === '1'){
      this.getOnlyUserChats();
    }else if(type === '2'){
      this.getAllUsers();
    }
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

}
