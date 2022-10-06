import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PeopleEventService } from 'src/app/_services/people-event.service';
import { UserService } from 'src/app/_services/user.service';
import { PeoplesEvent } from '../app-list/app-list.component';
import { DialogCreateEventComponent } from '../dialog-create-event/dialog-create-event.component';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

  eventsList: PeoplesEvent[];
  loggedUser: any;

  constructor(
    protected _dialog: MatDialog,
    private _peopleEventService: PeopleEventService,
    protected _userService: UserService
  ){
    this.loggedUser = this._userService.getUserData();
  }

  ngOnInit(): void {
    this.getPeopleEvents();
  }

  createEvent() {
    const dialogDeleteRef = this._dialog.open(DialogCreateEventComponent, {
      data: {
        dialogType: "create-event",
        dialogTitle: "Create event",
        dialogText: ""
      }
    });

    dialogDeleteRef.afterClosed().subscribe(result => {
      if (result) {
        this.eventsList = [result, ...this.eventsList];
      }
    });
  }

  getPeopleEvents() {
    this._peopleEventService.getEvents().subscribe(data => {
      this.eventsList = data;
    });
  }

  attendEvent(event) {
    this._peopleEventService.attendEvent({eventId : event.eventId}).subscribe(data => {
      this.addUserToAttendingUsers(event, data);
    }, err=>{
      console.log("err : ",err);
    });
  }

  cancelAttendEvent(event){
    this._peopleEventService.cancelAttendEvent({eventId : event.eventId}).subscribe(data => {
      this.removeUserFromAttendingUsers(event);
    }, err=>{
      console.log("err : ",err);
    });
  }

  addUserToAttendingUsers(mainEvent, data){
    this.eventsList.forEach((event: any, index)=>{
      if(event._id == mainEvent.eventId){
        event.attendingUsers = [...data.attendingUsers];
      }
    });
  }

  removeUserFromAttendingUsers(mainEvent){
    this.eventsList.forEach((event: any)=>{
      if(event._id == mainEvent.eventId){
        event.attendingUsers.forEach((user: any, index: any)=>{
          if(user.userId._id == this.loggedUser._id){
            event.attendingUsers.splice(index, 1);
          }
        }); 
      }
    });
  }
}
