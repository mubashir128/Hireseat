import { AfterViewChecked, Component, ElementRef, OnChanges, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ConstantsService } from 'src/app/_services/constants.service';
import { UserService } from 'src/app/_services/user.service';
import { WebsocketService } from 'src/app/_services/websocket.service';

declare var jQuery;

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

  @ViewChild('chatDiv', { static: true }) private chatDiv: ElementRef;
  @ViewChild('inputDiv', { static: true }) private inputDiv: ElementRef;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService, private _socket: WebsocketService, private _constants: ConstantsService) {
    // this.messageIs = '';
    this.loggedInUser = this.userService.getUserData();
    this.route.params.subscribe(params => {
      this.receiverId = params.id;
      this.handleUserData();
    });
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
    //call to get all chats.
    this._socket.sendMessage({
      type: this._constants.userChatMessageType,
      data: {
        subType: this._constants.getAllChats,
        receiverId: this.receiverId
      }
    });
  }

  //handle all user chat message.
  handleChatMessage(res: any) {
    switch (res.subType) {
      case this._constants.getAllChats:
        if (res.data) {
          this.userMessages = res.data;
        }
        break;
      case this._constants.addNewChat:
        if (res.data) {
          if (this.userMessages === undefined) {
            res.data.message = [res.data.message];
            this.userMessages = res.data;
          } else {
            this.userMessages.message.push(res.data.message);
            if(res.data.message.senderId === this.receiverId || res.sameUser){
              if(res.data){
                if(this.userMessages === undefined){
                  res.data.message = [res.data.message];
                  this.userMessages = res.data;
                }else{
                  this.userMessages.message.push(res.data.message);
                }
              }
            }
          }
        }
        break;
      default:
        break;
    }
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
    this.router.navigate(["/" + this.loggedInUser.userRole + "/user-chat"]);
  }

  sendChatMessage(text) {
    this.messageIs = this.inputDiv.nativeElement.value;

    if(this.messageIs == '' || this.messageIs == undefined){
      return ;
    }

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
    if(showValue){
      jQuery("#showImage").modal("open");
    }
  }

  closeImageModal() {
    jQuery("#showImage").modal("close");
  }

}
