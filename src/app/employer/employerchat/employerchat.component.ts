import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { ConstantsService } from 'src/app/_services/constants.service';
import { WebsocketService } from 'src/app/_services/websocket.service';

@Component({
  selector: 'app-employerchat',
  templateUrl: './employerchat.component.html',
  styleUrls: ['./employerchat.component.css']
})
export class EmployerchatComponent implements OnInit {

  chgStyle = true;

  employerChatObserver = new Subject();
  employerChatObserver$ = this.employerChatObserver.asObservable();

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
    await this._socket.removeListener({ type: this._constants.employerChatType });
    this._socket.addListener({
      type: this._constants.employerChatType,
      callback: this.employerChatObserver,
    });

    //when any activity of notification is happened, then this observable is called.
    this.employerChatObserver$.subscribe((res: any) => {
      this.handleEmployerChat(res);
    });
  }

  //handle al user chat.
  handleEmployerChat(res: any) {
    switch (res.subType) {
      case this._constants.getAllEmployees:
        console.log("--- res : ",res);
        this.chatUsers = res.data;
        break;
      default : 
        break;
    }
  }

  getAllEmployers(){
    //call to get all emoployers.
    this._socket.sendMessage({
      type: this._constants.employerChatType,
      data: {
        subType: this._constants.getAllEmployees
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
      this.getAllEmployers();
    }
  }

}
