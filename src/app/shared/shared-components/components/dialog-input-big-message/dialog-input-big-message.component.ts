import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbstractDialogComponent } from '../abstract-dialog.component';

@Component({
  selector: 'app-dialog-input-big-message',
  templateUrl: './dialog-input-big-message.component.html',
  styleUrls: ['./dialog-input-big-message.component.css']
})
export class DialogInputBigMessageComponent extends AbstractDialogComponent implements OnInit {

  btns: any[] = [];
  message: string = "";

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogInputBigMessageComponent,
    public dialogRef: MatDialogRef<DialogInputBigMessageComponent>
  ) {
    super(data, dialogRef);
    this.btns = this?.data?.btns;
  }

  ngOnInit(): void {
  }

  apply() {
    this.dialogRef.close( { message : this.message, status : true } );
  }

  getBtn(btnName) {
    return this.btns.includes(btnName) ? true : false;
  }

}
