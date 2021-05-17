import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  userMessages : any;

  userChatMessageObserver = new Subject();
  userChatMessageObserver$ = this.userChatMessageObserver.asObservable();

  @ViewChild('chatDiv') content: ElementRef;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService, private _socket: WebsocketService, private _constants : ConstantsService) {
    this.loggedInUser = this.userService.getUserData();
    this.route.params.subscribe(params => {
      this.receiverId = params.id;
      this.handleUserData();
    });
  }

  async ngOnInit(){
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

    this.getAllChats();

  }

  getAllChats(){
    //call to get all chats.
    this._socket.sendMessage({
      type: this._constants.userChatMessageType,
      data: {
        subType: this._constants.getAllChats,
        receiverId : this.receiverId
      }
    });
  }

  //handle all user chat message.
  handleChatMessage(res: any) {
    switch (res.subType) {
      case this._constants.getAllChats:
          console.log("+++ res : ",res);
          if(res.data){
            this.userMessages = res.data;
          }
          // this.goToBottom();
        break;
      case this._constants.addNewChat:
        console.log("res : ",res);
        if(res.data){
          this.userMessages.message.push(res.data.message);
        }
        // this.goToBottom();
        break;
      default : 
        break;
    }
  }

  handleUserData(){
    this.getCurrentUserDetails();
  }

  getCurrentUserDetails(){
    this.userService.getUserDetails({receiverId : this.receiverId}).subscribe((res : any)=>{
      this.user = res.data;
      console.log("this.user : ",this.user);
    });
  }

  backToChat(){
    this.router.navigate(["/"+this.loggedInUser.userRole+"/chat"]);
  }

  sendChatMessage(){
    let payload = {
      receiverId : this.receiverId,
      message : this.message
    };

    this._socket.sendMessage({
      type: this._constants.userChatMessageType,
      data: {
        subType: this._constants.addNewChat,
        data : payload
      },
    });

    this.message = "";
  }

  goToBottom(){
    console.log("------------------------ : ",this.content.nativeElement.scrollHeight);
    try {
      this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
      console.log("this.content.nativeElement.scrollHeight : ",this.content.nativeElement.scrollHeight);
    }catch(err){
      console.log(err);
    }
  }

}
