import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
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

  loggedUser: any;
  profileImageLength: number = 5;

  constructor(
    protected _dialog: MatDialog,
    protected _userService: UserService,
    private _router: Router,
    private _peopleEventService: PeopleEventService
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
        this.eventsList = [result, ...this.eventsList];
      }
    });
  }

  deleteEvent(eventId) {
    console.log(eventId);

    const dialogDeleteRef = this._dialog.open(DialogDeleteComponent, {
      data: {
        dialogType: "delete-event",
        dialogTitle: "Delete event",
        dialogText: "",
      },
    });

    dialogDeleteRef.afterClosed().subscribe((result) => {
      if (result.process == true) {
        this._peopleEventService.delete(eventId).subscribe(
          (res) => {
            const eventIndex = this.eventsList.findIndex((x) => {
              return x._id == eventId;
            });
            this.eventsList.splice(eventIndex, 1);
          },
          (err) => {
            console.log("err : ", err);
          }
        );
      }
    });
  }
}
