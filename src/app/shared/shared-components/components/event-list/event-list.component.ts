import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { ConstantsService } from "src/app/_services/constants.service";
import { PeopleEventService } from "src/app/_services/people-event.service";
import { UserService } from "src/app/_services/user.service";
import { WebsocketService } from "src/app/_services/websocket.service";
import { PeoplesEvent } from "../app-list/app-list.component";
import { DialogCreateEventComponent } from "../dialog-create-event/dialog-create-event.component";
import { DialogDeleteComponent } from "../dialog-delete/dialog-delete.component";

declare var jQuery;

@Component({
  selector: "app-event-list",
  templateUrl: "./event-list.component.html",
  styleUrls: ["./event-list.component.css"],
})
export class EventListComponent implements OnInit {
  @Input() eventsList: PeoplesEvent[];
  @Output() attendEM = new EventEmitter();
  @Output() cancelAttendEM = new EventEmitter();

  @Output() checkInUserEM = new EventEmitter();
  @Output() unCheckInUserEM = new EventEmitter();

  @Output() editEventEM = new EventEmitter();
  @Output() deleteEventEM = new EventEmitter();
  
  commentData:any="";
  loggedUser: any;
  profileImageLength: number = 5;

  peopleEventCommnetsObserver = new Subject();
  peopleEventCommnetsObserver$ = this.peopleEventCommnetsObserver.asObservable();

  constructor(
    protected _dialog: MatDialog,
    protected _userService: UserService,
    private _router: Router,
    private _peopleEventService: PeopleEventService,
    private _socket: WebsocketService, 
    private _constants: ConstantsService,
  ) {}

  async ngOnInit(){
    this.loggedUser = this._userService.getUserData();
    //add a observable for userChat
    await this._socket.removeListener({ type: this._constants.peopleEventComment });
    this._socket.addListener({
      type: this._constants.peopleEventComment,
      callback: this.peopleEventCommnetsObserver,
    });

    //when any activity of userChat is happened, then this observable is called.
    this.peopleEventCommnetsObserver$.subscribe((res: any) => {
      this.handlePeopleEventComments(res);
    });
  }

  handlePeopleEventComments(res: any){
    switch (res.subType) {
      case this._constants.postPeopleEventComment:
        this.addPeopleEventComment(res);
        break;
    }
  }

  addPeopleEventComment(eventRes){
    const eventData = this.eventsList.find((x)=>{
      return x._id==eventRes.eventId;
    });

    eventData.comments.push(eventRes.data)
  }

  checkStatus(event) {
    let status: boolean = false;
    if (this.loggedUser.userRole == "candidate") {
      event.attendingUsers.forEach((user) => {
        if (user.userId._id == this.loggedUser._id) {
          status = true;
        }
      });
    }
    return status;
  }

  attendEvent(event) {
    this.attendEM.emit({ eventId: event._id });
  }

  cancelAttendEvent(event) {
    this.cancelAttendEM.emit({ eventId: event._id });
  }

  seeEventUsers(event) {
    this._router.navigate(["/candidate/see-event-users/", event._id]);
  }

  editEvent(eventData: any) {
    this.editEventEM.emit(eventData);
  }

  deleteEvent(eventData: any) {
    this.deleteEventEM.emit(eventData);
  }

  onCommentPostClick(eventId, eventIndex){
    const payload = {
      userId:this.loggedUser._id,
      message:this.commentData
    }

    this._peopleEventService.postEventComment(eventId, payload).subscribe((res)=>{
      if(res){        
        this.eventsList[eventIndex].comments.push(res);
        this.commentData="";
        this.scrollCommentToBottom(eventId, 'post_comment');
      }
    },(err)=>{
      console.log(err)
    })
  }

  onCheckInClick(event){
    this.checkInUserEM.emit(event);
  }

  onUncheckInClick(event){
    this.unCheckInUserEM.emit(event);
  }

  checkInUserStatus(event){
    let status: boolean = false;
    if (this.loggedUser.userRole == "candidate") {
      event.checkInUsers.forEach((user) => {
        if (user.userId._id == this.loggedUser._id) {
          status = true;
        }
      });
    }
    return status;
  }

  matTabChange(event,eventId){
    if(event.index==1) this.scrollCommentToBottom(eventId,'go_to_bottom');
  }

  scrollCommentToBottom(eventId, type){
    setTimeout(() => {
      const element = document.getElementById('comment-list_'+eventId);
      element.scroll({ top: element.scrollHeight, behavior: 'smooth' }); 
    }, type=='post_comment' ? 500 : 0);
  }
}
