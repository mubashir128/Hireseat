import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from '@angular/material/dialog';
import { AbstractDialogComponent } from '../abstract-dialog.component';

@Component({
  selector: 'app-dialog-ask-to-send-profile-link',
  templateUrl: './dialog-ask-to-send-profile-link.component.html',
  styleUrls: ['./dialog-ask-to-send-profile-link.component.css']
})
export class DialogAskToSendProfileLinkComponent extends AbstractDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogAskToSendProfileLinkComponent, 
    public dialog: MatDialog, 
    public dialogRef: MatDialogRef<DialogAskToSendProfileLinkComponent>
  ){
    super(data, dialogRef);
  }

  ngOnInit(): void {
  }

  sendLink(result){
    this.dialogRef.close(result);
  }

}
