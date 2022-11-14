import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbstractDialogComponent } from '../abstract-dialog.component';

export enum eSelectType {
  all = "all",
  candidate = "candidate",
  recruiter = "recruiter",
  employer = "employer"
}

@Component({
  selector: 'app-dialog-select-user-to-export',
  templateUrl: './dialog-select-user-to-export.component.html',
  styleUrls: ['./dialog-select-user-to-export.component.css']
})
export class DialogSelectUserToExportComponent extends AbstractDialogComponent implements OnInit {

  defaultType = eSelectType.all;
  selectTypes = [
    {name : "All", value: eSelectType.all},
    {name : "Candidate", value: eSelectType.candidate},
    {name : "Recruiter", value: eSelectType.recruiter},
	  {name : "Employer", value: eSelectType.employer}
  ];

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogSelectUserToExportComponent, 
    public _dialog: MatDialog, 
    public _dialogRef: MatDialogRef<DialogSelectUserToExportComponent>
  ){
    super(data, _dialogRef);
  }

  ngOnInit(): void {
  }

  export(){
    this._dialogRef.close({type : this.defaultType});
  }

}
