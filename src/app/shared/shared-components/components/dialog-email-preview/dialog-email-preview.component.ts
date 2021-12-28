import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from '@angular/material/dialog';
import { AbstractDialogComponent } from '../abstract-dialog.component';

@Component({
  selector: 'app-dialog-email-preview',
  templateUrl: './dialog-email-preview.component.html',
  styleUrls: ['./dialog-email-preview.component.css']
})
export class DialogEmailPreviewComponent extends AbstractDialogComponent implements OnInit {

  cc: string;
  bcc: string;

  recipientName: string;
  recipientEmail: string;

  linedIn: string;

  senderName: string;
  candidateNameIs: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogEmailPreviewComponent, public dialog: MatDialog, public dialogRef: MatDialogRef<DialogEmailPreviewComponent>){
    super(data, dialogRef);
    if(data){
      this.cc = this.data.cc;
      this.bcc = this.data.bcc;

      this.recipientName = this.data.recipientName;
      this.recipientEmail = this.data.recipientEmail;

      this.linedIn = this.data.linedIn;
      this.senderName = this.data.senderName;

      this.candidateNameIs = this.data.candidateNameIs;
    }
  }

  ngOnInit(): void {
  }

  generalEmailIntroSend(){
    this.dialogRef.close({
      type : "copyProfileLink",
      process : true,
      cc : this.cc,
      bcc : this.bcc,
      recipientName : this.recipientName,
      recipientEmail : this.recipientEmail,
      linedIn : this.linedIn,
      senderName : this.senderName,
      candidateNameIs : this.candidateNameIs
    });
  }

}
