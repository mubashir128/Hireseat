import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ConstantsService } from 'src/app/_services/constants.service';
import { UserService } from 'src/app/_services/user.service';
import { WebsocketService } from 'src/app/_services/websocket.service';

@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.css']
})
export class UserChatComponent implements OnInit {

  chgStyle = true;

  userChatObserver = new Subject();
  userChatObserver$ = this.userChatObserver.asObservable();

  onlyChatUsers = [];
  chatUsers = [];

  loggedInUser: any;

  public auctionFrm: FormGroup;
  searchTermByName;

  constructor(private formBuilder: FormBuilder, private _socket: WebsocketService, private _constants : ConstantsService, private router: Router, private userService: UserService) {
    this.loggedInUser = this.userService.getUserData();
  }

  async ngOnInit() {
    this.auctionFrm = this.formBuilder.group({
      searchTermByNameIs : []
    });

    //add a observable for notificaton
    await this._socket.removeListener({ type: this._constants.userChatType });
    this._socket.addListener({
      type: this._constants.userChatType,
      callback: this.userChatObserver,
    });

    //when any activity of notification is happened, then this observable is called.
    this.userChatObserver$.subscribe((res: any) => {
      this.handleUserChat(res);
    });

    this.getOnlyUserChats();

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

}
