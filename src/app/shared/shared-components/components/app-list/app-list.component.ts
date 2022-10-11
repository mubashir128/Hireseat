import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { UserService } from "src/app/_services/user.service";
import { DialogDeleteComponent } from "../dialog-delete/dialog-delete.component";

export enum actionType {
  postJob = "postJob",
}

export enum dialogPopupType {
  createPostJob = "createPostJob",
  editPostJob = "editPostJob",
}

export class PostJob {
  public _id: string;
  public companyName: string;
  public jobTitle: string;
  public jobSpecification: string;
  public location: string;

  constructor();
  constructor(
    _id?: string,
    companyName?: string,
    jobTitle?: string,
    jobSpecification?: string,
    location?: string
  ) {
    this._id = _id;
    this.companyName = companyName;
    this.jobTitle = jobTitle;
    this.jobSpecification = jobSpecification;
    this.location = location;
  }
}

export class PeoplesEvent {
  _id: string;
  name: string;
  eventDate: Date;
  location: string;
  link: string;
  eventDetails:string;
  eventPicture: string;
  attendingUsers: any[];

  constructor();
  constructor(
    _id?: string,
    name?: string,
    eventDate?: Date,
    location?: string,
    link?: string,
    eventPicture?: string,
    attendingUsers?: any[]
  ) {
    this._id = _id;
    this.name = name;
    this.eventDate = eventDate;
    this.location = location;
    this.link = link;
    this.eventPicture = eventPicture;
    this.attendingUsers = attendingUsers;
  }
}

export class List {
  constructor(public dynamicColumns: string[], public dataSource: any[]) {}
}

export class SearchFilter {
  constructor(public column: string, public value: string) {}
}

@Component({
  selector: "app-app-list",
  templateUrl: "./app-list.component.html",
  styleUrls: ["./app-list.component.css"],
})
export class AppListComponent implements OnInit {
  @Input() lists: List;
  @Input() columnNames: any;
  @Input() type: actionType;

  @Output() filterEM = new EventEmitter();
  @Output() editEM = new EventEmitter();
  @Output() selectEM = new EventEmitter();

  constructor(
    protected _dialog: MatDialog,
    protected _userService: UserService
  ) {}

  ngOnInit(): void {}

  getColumTitle() {}

  edit(item: any) {
    this.editEM.emit(item);
  }

  delete(postJobId) {
    console.log(postJobId);

    const dialogDeleteRef = this._dialog.open(DialogDeleteComponent, {
      data: {
        dialogType: "delete-post-Job",
        dialogTitle: "Delete Post Job",
        dialogText: "",
      },
    });

    dialogDeleteRef.afterClosed().subscribe((result) => {
      if (result.process == true) {
        this._userService.deletePostJob(postJobId).subscribe(
          (res) => {
            const eventIndex = this.lists.dataSource.findIndex((x) => {
              return x._id == postJobId;
            });
            this.lists.dataSource.splice(eventIndex, 1);
          },
          (err) => {
            console.log("err : ", err);
          }
        );
      }
    });
  }
}
