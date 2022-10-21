import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { PeopleEventService } from "src/app/_services/people-event.service";
import { UserService } from "src/app/_services/user.service";
import { PeoplesEvent } from "../app-list/app-list.component";
import { DialogCreateEventComponent } from "../dialog-create-event/dialog-create-event.component";
import { DialogDeleteComponent } from "../dialog-delete/dialog-delete.component";

@Component({
  selector: "app-event-list",
  templateUrl: "./event-list.component.html",
  styleUrls: ["./event-list.component.css"],
})
export class EventListComponent implements OnInit {
  @Input() eventsList: PeoplesEvent[];
  @Output() attendEM = new EventEmitter();
  @Output() cancelAttendEM = new EventEmitter();

  @Output() editEventEM = new EventEmitter();
  @Output() deleteEventEM = new EventEmitter();

  commentData:any="";
  loggedUser: any;
  profileImageLength: number = 5;

  constructor(
    protected _dialog: MatDialog,
    protected _userService: UserService,
    private _router: Router,
    private _peopleEventService: PeopleEventService,
  ) {}

  ngOnInit(): void {
    this.loggedUser = this._userService.getUserData();
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

  onCommentPostClick(eventId,eventIndex){
    const payload = {
      userId:this.loggedUser._id,
      message:this.commentData
    }

    this._peopleEventService.postEventComment(eventId,payload).subscribe((res)=>{
      if(res){        
      this.eventsList[eventIndex].comments = res.comments;
        this.commentData="";
      }
    },(err)=>{
      console.log(err)
    })
  }
}
