import { Component, Inject, OnInit } from '@angular/core';
import { AbstractDialogComponent } from '../abstract-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-input-text-message',
  templateUrl: './dialog-input-text-message.component.html',
  styleUrls: ['./dialog-input-text-message.component.css']
})
export class DialogInputTextMessageComponent extends AbstractDialogComponent implements OnInit {

  message: string = "";

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogInputTextMessageComponent,
    public dialogRef: MatDialogRef<DialogInputTextMessageComponent>
  ){
    super(data, dialogRef);
  }

  ngOnInit(): void {
  }

  submit(){
    this.dialogRef.close({message : this.message});
  }

}
