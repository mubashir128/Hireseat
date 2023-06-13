import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export enum actionType {
  postJob = 'postJob'
}

export enum dialogPopupType {
  createPostJob = "createPostJob",
  editPostJob = "editPostJob"
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

  constructor();
  constructor(_id?: string, companyName?: string, jobTitle?: string, jobSpecification?: string, location?: string, point1?: string, point2?: string, point3?: string, pointBoolean1?: Boolean, pointBoolean2?: Boolean, pointBoolean3?: Boolean, suggestBy?: string, candidate?: any[]){
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
  }
}

export class List {
  constructor(public dynamicColumns: string[], public dataSource : any[]){
  }
}

export class SearchFilter2 {
  constructor(
    public column: string,
    public value: string
  ){}
}

@Component({
  selector: 'app-app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.css']
})
export class AppListComponent implements OnInit {

  @Input() lists: List;
  @Input() columnNames: any;
  @Input() type: actionType;

  @Output() filterEM = new EventEmitter();
  @Output() editEM = new EventEmitter();
  @Output() selectEM = new EventEmitter();

  @Output() annoucePostJobEM = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  getColumTitle(){

  }

  edit(item: any){
    this.editEM.emit(item);
  }

  annoucPostJob(postJobData){
    this.annoucePostJobEM.emit(postJobData);
  }

}
