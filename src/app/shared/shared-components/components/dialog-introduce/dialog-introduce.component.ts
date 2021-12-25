import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { AbstractDialogComponent } from '../abstract-dialog.component';

@Component({
  selector: 'app-dialog-introduce',
  templateUrl: './dialog-introduce.component.html',
  styleUrls: ['./dialog-introduce.component.css']
})
export class DialogIntroduceComponent extends AbstractDialogComponent implements OnInit {
  
  companies: string;
  senderName: string;
  recipientName: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogIntroduceComponent, public dialogRef: MatDialogRef<DialogIntroduceComponent>){
    super(data, dialogRef);
    if(data){
      this.senderName = this.data.senderName;
      this.recipientName = this.data.recipientName;
    }
  }

  ngOnInit(): void {
  }

  closeIntroduceDialog(){
    this.dialogRef.close({
      companies : this.companies,
      senderName : this.senderName
    });
  }

}
