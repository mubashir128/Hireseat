import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PeopleEventService } from 'src/app/_services/people-event.service';
import { UserService } from 'src/app/_services/user.service';
import { PeoplesEvent } from '../app-list/app-list.component';
import { DialogCreateEventComponent } from '../dialog-create-event/dialog-create-event.component';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

  eventsList: PeoplesEvent[] = [];
  loggedUser: any;
  showLoader: boolean = true;

  constructor(
    protected _dialog: MatDialog,
    private _peopleEventService: PeopleEventService,
    protected _userService: UserService,
  ){
    this.loggedUser = this._userService.getUserData();
  }

  ngOnInit(): void {
    this.getPeopleEvents();
  }

  getPeopleEvents() {
    this._peopleEventService.getEvents().subscribe(data => {
      this.showLoader = false;
      this.eventsList = data;
    });
  }

  attendEvent(event) {
    this._peopleEventService.attendEvent({eventId : event.eventId}).subscribe(data => {
      this.addAttendingUsers(data);
    }, err=>{
      console.log("err : ",err);
    });
  }

  addAttendingUsers(data){
    this.eventsList.forEach(event => {
      if(event._id == data._id){
        event.attendingUsers = data.attendingUsers;
      }
    });
  }

  checkInUser(event){
    this._peopleEventService.checkInEvent({eventId : event._id}).subscribe((data:any) => {
      this.addCheckInUsers(data);
      this.onCommentPostClick(event._id);
    }, err=>{
      console.log("err : ",err);
    });
  }

  unCheckInUser(event){
    this._peopleEventService.unCheckInEvent({eventId : event._id}).subscribe((data:any) => {      
      this.addCheckInUsers(data)
    }, err=>{
      console.log("err : ",err);
    });
  }

  addCheckInUsers(data){
    this.eventsList.forEach(event => {
      if(event._id == data._id){
        event.checkInUsers = data.checkInUsers;
      }
    });
  }

  cancelAttendEvent(event){
    this._peopleEventService.cancelAttendEvent({eventId : event.eventId}).subscribe(data => {
      this.addAttendingUsers(data);
    }, err=>{
      console.log("err : ",err);
    }); 
  }

  editCreateEvent(eventData){
    const dialogDeleteRef = this._dialog.open(DialogCreateEventComponent, {
      data: {
        dialogType:  eventData ? "edit-event" : "create-event",
        dialogTitle: eventData ? "Edit event" : "Create event",
        eventData: eventData
      },
    });

    dialogDeleteRef.afterClosed().subscribe((result) => {
      if (result && result?.add) {
        this.eventsList = [result?.event, ...this.eventsList];
      }else if (result && result?.edit) {
        this.editAttendingUsers(result);
      }
    });
  }

  editAttendingUsers(data){
    this.eventsList.forEach(event => {
      if(event?._id == data?._id){
        event = {...data};
      }
    });
  }

  deleteEvent(eventId) {
    const dialogDeleteRef = this._dialog.open(DialogDeleteComponent, {
      data: {
        dialogType: "delete-event",
        dialogTitle: "Delete event",
        dialogText: "",
      },
    });

    dialogDeleteRef.afterClosed().subscribe((result) => {
      if (result.process == true) {
        this._peopleEventService.delete(eventId).subscribe((res) => {
            this.removeEventFromList(eventId);
          }, (err) => {
            console.log("err : ", err);
          }
        );
      }
    });
  }

  removeEventFromList(eventId){
    this.eventsList.forEach((event, index) => {
      if(event?._id == eventId){
        this.eventsList.splice(index, 1);
      }
    });
  }

  onCommentPostClick(eventId){
    const payload = {
      userId: this.loggedUser._id,
      message: "I checked In",
      timiline : true
    }

    this._peopleEventService.postEventComment(eventId, payload).subscribe((res)=>{
      if(res){
        this.eventsList.forEach((event)=>{
          if(event._id == eventId){
            event.comments = [...event.comments, res];
          }
        });
      }
    },(err)=>{
      console.log(err)
    })
  }
}
