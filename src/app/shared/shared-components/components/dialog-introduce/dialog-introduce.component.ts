import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-introduce',
  templateUrl: './dialog-introduce.component.html',
  styleUrls: ['./dialog-introduce.component.css']
})
export class DialogIntroduceComponent implements OnInit {

  dialogType: String;
  dialogTitle: String;

  companies: String;
  senderName: String;
  recipientName: String;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogIntroduceComponent, public dialogRef: MatDialogRef<DialogIntroduceComponent>){
    console.log("data : ",this.data);
    if(data){
      this.dialogType = this.data.dialogType;
      this.dialogTitle = this.data.dialogTitle;

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
