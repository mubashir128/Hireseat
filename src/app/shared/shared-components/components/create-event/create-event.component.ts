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

  eventsList: PeoplesEvent[];
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
        this.getPeopleEvents();
      }
    });
  }

  getPeopleEvents() {
    this._peopleEventService.getEvents().subscribe(data => {
      this.showLoader = false;
      this.eventsList = data;
    });
  }

  attendEvent(event) {
    this._peopleEventService.attendEvent({eventId : event.eventId}).subscribe(data => {
      this.getPeopleEvents();
    }, err=>{
      console.log("err : ",err);
    });
  }

  cancelAttendEvent(event){
    this._peopleEventService.cancelAttendEvent({eventId : event.eventId}).subscribe(data => {
      this.getPeopleEvents();
    }, err=>{
      console.log("err : ",err);
    }); 
  }

  editEvent(eventData){
    const dialogDeleteRef = this._dialog.open(DialogCreateEventComponent, {
      data: {
        dialogType: "edit-event",
        dialogTitle: "Edit event",
        dialogText: "",
        eventData: eventData,
      },
    });

    dialogDeleteRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getPeopleEvents();
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
            this.getPeopleEvents();
          }, (err) => {
            console.log("err : ", err);
          }
        );
      }
    });
  }
}
