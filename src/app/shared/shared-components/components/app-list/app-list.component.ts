import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { UserService } from "src/app/_services/user.service";
import { DialogDeleteComponent } from "../dialog-delete/dialog-delete.component";
import { PostJobService } from "src/app/_services/post-job.service";

export enum actionType {
  postJob = "postJob",
}

export enum dialogPopupType {
  createPostJob = "createPostJob",
  editPostJob = "editPostJob",
}

export enum shareConstants {
  shareConferenceRoom = "shareConferenceRoom"
}

export class PostJob {
  public _id: string;
  public companyName: string;
  public jobTitle: string;
  public jobSpecification: string;
  public location: string;
  public point1: string;
  public point2: string;
  public point3: string;
  public pointBoolean1: Boolean;
  public pointBoolean2: Boolean;
  public pointBoolean3: Boolean;
  public suggestBy: any;
  public candidate: any[];
  public salary: string;

  constructor();
  constructor(_id?: string, companyName?: string, jobTitle?: string, jobSpecification?: string, location?: string, point1?: string, point2?: string, point3?: string, pointBoolean1?: Boolean, pointBoolean2?: Boolean, pointBoolean3?: Boolean, suggestBy?: string, candidate?: any[], salary?: string){
    this._id = _id;
    this.companyName = companyName;
    this.jobTitle = jobTitle;
    this.jobSpecification = jobSpecification;
    this.location = location;
    this.point1 = point1;
    this.point2 = point2;
    this.point3 = point3;
    this.pointBoolean1 = pointBoolean1;
    this.pointBoolean2 = pointBoolean2;
    this.pointBoolean3 = pointBoolean3;
    this.suggestBy = suggestBy;
    this.candidate = candidate;
    this.salary = salary;
  }
}

export class PeoplesEvent {
  _id: string;
  name: string;
  eventDate: Date;
  eventTime:string;
  location: string;
  link: string;
  eventDetails:string;
  eventPicture: string;
  attendingUsers: any[];
  attendingCandidateList: any[];
  comments:any=[];
  checkInUsers:any=[];

  constructor();
  constructor(
    _id?: string,
    name?: string,
    eventDate?: Date,
    location?: string,
    link?: string,
    eventPicture?: string,
    attendingUsers?: any[],
    attendingCandidateList?: any[]
  ) {
    this._id = _id;
    this.name = name;
    this.eventDate = eventDate;
    this.location = location;
    this.link = link;
    this.eventPicture = eventPicture;
    this.attendingUsers = attendingUsers;
    this.attendingCandidateList = attendingCandidateList;
  }
}

export class List {
  constructor(public dynamicColumns: string[], public dataSource: any[]) {}
}

export class SearchFilter2 {
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

  @Output() annoucePostJobEM = new EventEmitter();

  constructor(
    protected _dialog: MatDialog,
    protected _postJobService: PostJobService
  ) {}

  ngOnInit(): void {}

  getColumTitle() {}

  edit(item: any) {
    this.editEM.emit(item);
  }

  annoucPostJob(postJobData){
    this.annoucePostJobEM.emit(postJobData);
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
        this._postJobService.deletePostJob(postJobId).subscribe(
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
