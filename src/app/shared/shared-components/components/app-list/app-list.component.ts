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

  constructor();
  constructor(_id?: string, companyName?: string, jobTitle?: string, jobSpecification?: string, location?: string){
    this._id = _id;
    this.companyName = companyName;
    this.jobTitle = jobTitle;
    this.jobSpecification = jobSpecification;
    this.location = location;
  }
}

export class List {
  constructor(public dynamicColumns: string[], public dataSource : any[]){
  }
}

export class SearchFilter {
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

  constructor() { }

  ngOnInit(): void {
  }

  getColumTitle(){

  }

  edit(item: any){
    this.editEM.emit(item);
  }

}
