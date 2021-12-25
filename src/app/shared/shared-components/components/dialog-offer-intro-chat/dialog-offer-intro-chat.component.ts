import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from '@angular/material/dialog';
import { AbstractDialogComponent } from '../abstract-dialog.component';

@Component({
  selector: 'app-dialog-offer-intro-chat',
  templateUrl: './dialog-offer-intro-chat.component.html',
  styleUrls: ['./dialog-offer-intro-chat.component.css']
})
export class DialogOfferIntroChatComponent extends AbstractDialogComponent implements OnInit {

  introsAt: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogOfferIntroChatComponent, public dialog: MatDialog, public dialogRef: MatDialogRef<DialogOfferIntroChatComponent>){
    super(data, dialogRef);
    if(data){
      this.introsAt = this.data.introsAt;
    }
  }

  ngOnInit(): void {
  }

  offerEmailIntroPopup(){
    this.dialogRef.close({
      type : "offerIntro",
      process : true
    });
  }

  redirectToUserChat(){
    this.dialogRef.close({
      type : "noThankYou",
      process : true
    });
  }

}
