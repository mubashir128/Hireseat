import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { ConstantsService } from 'src/app/_services/constants.service';
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

  chatUsers = [];

  users = [{
    fullName : 'a121',
    profileimage : ''
  },
  {
    fullName : 'a1s1',
    profileimage : ''
  }];

  public auctionFrm: FormGroup;

  constructor(private formBuilder: FormBuilder, private _socket: WebsocketService, private _constants : ConstantsService) { }

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
      this.handleEmployerChat(res);
    });
  }

  //handle al user chat.
  handleEmployerChat(res: any) {
    switch (res.subType) {
      case this._constants.getAllUsers:
        console.log("--- res : ",res);
        this.chatUsers = res.data;
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

  showUserData(){
    console.log("--- showUserData : ");
  }

  setting(){
    console.log("--- setting : ");
  }

  changesType(type){
    this.chgStyle = (type === '1') ? true : false;
    if(type === '1'){
      this.chatUsers = this.users;
    }else if(type === '2'){
      this.getAllUsers();
    }
  }

}
