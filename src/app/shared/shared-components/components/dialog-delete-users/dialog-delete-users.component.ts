import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbstractDialogComponent } from '../abstract-dialog.component';

declare var jQuery;
declare var Materialize;

export enum eSelectContentType {
  pendingCandidates = "pendingCandidates",
  allCandidates = "allCandidates",
  select = "select"
}

@Component({
  selector: 'app-dialog-delete-users',
  templateUrl: './dialog-delete-users.component.html',
  styleUrls: ['./dialog-delete-users.component.css']
})
export class DialogDeleteUsersComponent extends AbstractDialogComponent implements OnInit {
  defaultType = eSelectContentType.select;
  selectTypes = [
    { name: "Select", value: eSelectContentType.select },
    { name: "Pending Candidates", value: eSelectContentType.pendingCandidates },
    { name: "All Candidates", value: eSelectContentType.allCandidates }
  ];

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogDeleteUsersComponent,
    public _dialog: MatDialog,
    public _dialogRef: MatDialogRef<DialogDeleteUsersComponent>
  ) {
    super(data, _dialogRef);
  }

  ngOnInit(): void {
  }

  select(){
    if(this.defaultType !== eSelectContentType.select){
      this._dialogRef.close({type : this.defaultType});
    }else{
      Materialize.toast("Please select other option", 1000, "red");
    }
  }

}
