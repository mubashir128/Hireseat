import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from '@angular/material/dialog';
import { AbstractDialogComponent } from '../abstract-dialog.component';

@Component({
  selector: 'app-dialog-email-preview2',
  templateUrl: './dialog-email-preview2.component.html',
  styleUrls: ['./dialog-email-preview2.component.css']
})
export class DialogEmailPreview2Component extends AbstractDialogComponent implements OnInit {

  cc: string;
  bcc: string;

  recipientName: string;
  recipientEmail: string;

  senderName: string;
  candidateNameIs: string;

  comment1: string;
  comment2: string;
  comment3: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogEmailPreview2Component, public dialog: MatDialog, public dialogRef: MatDialogRef<DialogEmailPreview2Component>){
    super(data, dialogRef);
    if(data){
      this.cc = this.data.cc;
      this.bcc = this.data.bcc;
      
      this.recipientName = this.data.recipientName;
      this.recipientEmail = this.data.recipientEmail;

      this.senderName = this.data.senderName;
      this.candidateNameIs = this.data.candidateNameIs;
      
      this.comment1 = this.data.comment1;
      this.comment2 = this.data.comment2;
      this.comment3 = this.data.comment3;
    }
  }

  ngOnInit(): void {
  }

  share(){
    this.dialogRef.close({
      type : "careerReferral",
      process : true,
      cc : this.cc,
      bcc : this.bcc,
      recipientName : this.recipientName,
      recipientEmail : this.recipientEmail,
      senderName : this.senderName,
      candidateNameIs : this.candidateNameIs,
      comment1 : this.data.comment1,
      comment2 : this.data.comment2,
      comment3 : this.data.comment3
    });
  }

}
