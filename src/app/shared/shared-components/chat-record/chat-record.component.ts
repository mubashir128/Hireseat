import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ConstantsService } from 'src/app/_services/constants.service';
import { UserService } from 'src/app/_services/user.service';
import { WebsocketService } from 'src/app/_services/websocket.service';

@Component({
  selector: 'app-chat-record',
  templateUrl: './chat-record.component.html',
  styleUrls: ['./chat-record.component.css']
})
export class ChatRecordComponent implements OnInit {

  receiverId : any;
  loggedInUser: any;
  user : any;
  message : any;

  userMessages = [];

  userChatMessageObserver = new Subject();
  userChatMessageObserver$ = this.userChatMessageObserver.asObservable();

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService, private _socket: WebsocketService, private _constants : ConstantsService) {
    this.loggedInUser = this.userService.getUserData();
  }

  async ngOnInit(){
    this.route.params.subscribe(params => {
      this.receiverId = params.id;
      this.handleUserData();
    });

    //add a observable for notificaton
    await this._socket.removeListener({ type: this._constants.userChatMessageType });
    this._socket.addListener({
      type: this._constants.userChatMessageType,
      callback: this.userChatMessageObserver,
    });

    //when any activity of notification is happened, then this observable is called.
    this.userChatMessageObserver$.subscribe((res: any) => {
      this.handleChatMessage(res);
    });

  }

  //handle all user chat message.
  handleChatMessage(res: any) {
    switch (res.subType) {
      case this._constants.addMessage:
        console.log("--- res : ",res);
        this.userMessages = res.data;
        break;
      default : 
        break;
    }
  }

  handleUserData(){
    console.log("receiverId : ",this.receiverId);
    this.getCurrentUserDetails();
  }

  getCurrentUserDetails(){
    this.userService.getUserDetails({userId : this.receiverId}).subscribe((res : any)=>{
      console.log("res : ",res);
      this.user = res.data;
    });
  }

  backToChat(){
    console.log("---- : ");
    this.router.navigate(["/"+this.loggedInUser.userRole+"/chat"]);
  }

  sendChatMessage(){
    let payload = {
      senderId : this.loggedInUser._id,
      receiverId : this.receiverId,
      message : this.message
    };

    this._socket.sendMessage({
      type: this._constants.userChatMessageType,
      data: {
        subType: this._constants.addMessage,
        data : payload
      },
    });
  }

}
