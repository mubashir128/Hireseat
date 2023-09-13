import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { AbstractDialogComponent } from '../abstract-dialog.component';

declare var Materialize;

export enum selectButtons {
  introInApp = "introInApp",
  introOnEmail = "introOnEmail"
}

@Component({
  selector: 'app-dialog-select-butttons',
  templateUrl: './dialog-select-butttons.component.html',
  styleUrls: ['./dialog-select-butttons.component.css']
})
export class DialogSelectButttonsComponent extends AbstractDialogComponent implements OnInit {

  btns: string[];
  selectButtons: any = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogSelectButttonsComponent,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogSelectButttonsComponent>
  ) {
    super(data, dialogRef);
    this.selectButtons.introInApp = selectButtons.introInApp;
    this.selectButtons.introOnEmail = selectButtons.introOnEmail;
    
    if (data) {
      this.btns = this.data.btns;
    }
  }

  ngOnInit(): void {
  }

  getBtns(btnName) {
    return this.btns.includes(btnName) ? true : false;
  }

  selectBtn(btnName){
    this.dialogRef.close({
      btnName : btnName
    });
  }

}
