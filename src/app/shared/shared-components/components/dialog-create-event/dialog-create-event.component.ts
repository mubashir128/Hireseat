import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { PeopleEventService } from "src/app/_services/people-event.service";
import {
  AbstractDialogComponent,
  FileType,
  uploadFile,
} from "../abstract-dialog.component";
import { PeoplesEvent } from "../app-list/app-list.component";
import * as moment from "moment";

declare var jQuery;
declare var Materialize;

@Component({
  selector: "app-dialog-create-event",
  templateUrl: "./dialog-create-event.component.html",
  styleUrls: ["./dialog-create-event.component.css"],
})
export class DialogCreateEventComponent
  extends AbstractDialogComponent
  implements OnInit
{
  createEventForm: FormGroup;
  peopleEvent: PeoplesEvent;

  progress: Observable<any>;
  progressPercent: Number;
  inProgress: boolean = false;

  public updateProfileimg: FormGroup;
  imgURL: any;

  message: string;
  filepath: File;
  imagePath: any;

  files = new Map();
  fileError: string = null;

  moduleDurationHint: String;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _dialogRef: MatDialogRef<DialogCreateEventComponent>,
    private _formBuilder: FormBuilder,
    private _peopleEventService: PeopleEventService
  ) {
    super(data, _dialogRef);
    this.createEventForm = this._formBuilder.group({
      name: ["", Validators.compose([Validators.required])],
      eventDate: [""],
      location: [""],
      link: [""],
    });

    this.peopleEvent = new PeoplesEvent();
  }

  ngOnInit(): void {
    this.getEventData();
  }

  getEventData() {
    if (this.data.eventData) {
      console.log(this.data.eventData);
      this.peopleEvent = this.data.eventData;
      this.imgURL = this.data.eventData.eventPicture;
    }
  }

  formSubmit() {
    this.progress = this._peopleEventService.save(this.peopleEvent, this.imagePath);
    this.progressPercent = 0;
    this.progress.subscribe(
      (progress) => {
        console.log(`Upload ${progress.percent}% completed`);
        this.inProgress = true;
        this.progressPercent = progress.percent;
        if (progress.completeStatus && progress.body && !this.peopleEvent._id) {
          this._dialogRef.close(progress.body);
        } else {
          this._dialogRef.close();
        }
      },
      (error) => {
        this.inProgress = false;
        this.progressPercent = 0;
        console.log("error : ", error);
      },
      () => {
        this.inProgress = false;
        console.log("completed : ");
      }
    );
  }

  preview(files) {
    if (files.length === 0) return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      Materialize.toast(this.message, 1000, "red");
      return;
    }
    this.filepath = <File>files[0];

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }
}
