import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { AbstractDialogComponent } from '../abstract-dialog.component';

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.css']
})
export class DialogDeleteComponent extends AbstractDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogDeleteComponent, public dialogRef: MatDialogRef<DialogDeleteComponent>){
    super(data, dialogRef);
  }

  ngOnInit(): void {
  }

  confirmedDeleteResume(status){
    this.dialogRef.close({
      type : "ConfirmDeleteAction",
      process : status
    });
  }

}
