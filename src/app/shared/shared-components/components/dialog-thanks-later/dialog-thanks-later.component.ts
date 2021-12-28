import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { AbstractDialogComponent } from '../abstract-dialog.component';

@Component({
  selector: 'app-dialog-thanks-later',
  templateUrl: './dialog-thanks-later.component.html',
  styleUrls: ['./dialog-thanks-later.component.css']
})
export class DialogThanksLaterComponent extends AbstractDialogComponent implements OnInit {

  thxFullName: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogThanksLaterComponent, public dialogRef: MatDialogRef<DialogThanksLaterComponent>){
    super(data, dialogRef);
    if(data){
      this.thxFullName = this.data.thxFullName;
    }
  }

  ngOnInit(): void {
  }

  thxLetterSend(){
    this.dialogRef.close({
      type : "thxLater",
      process : true,
      thxFullName : this.thxFullName
    });
  }

}
