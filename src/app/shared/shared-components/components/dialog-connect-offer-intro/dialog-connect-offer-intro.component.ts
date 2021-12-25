import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from '@angular/material/dialog';
import { AbstractDialogComponent } from '../abstract-dialog.component';

@Component({
  selector: 'app-dialog-connect-offer-intro',
  templateUrl: './dialog-connect-offer-intro.component.html',
  styleUrls: ['./dialog-connect-offer-intro.component.css']
})
export class DialogConnectOfferIntroComponent extends AbstractDialogComponent implements OnInit {

  askAndConnectName: string;
  askAndConnectDesiredCompanies: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogConnectOfferIntroComponent, public dialog: MatDialog, public dialogRef: MatDialogRef<DialogConnectOfferIntroComponent>){
    super(data, dialogRef);
    if(data){
      this.askAndConnectName = this.data.askAndConnectName;
      this.askAndConnectDesiredCompanies = this.data.askAndConnectDesiredCompanies;
    }
  }

  ngOnInit(): void {
  }

  conenctWithIntro(){
    this.dialogRef.close({
      type : "connectWithIntros",
      process : true
    });
  }

  connect(){
    this.dialogRef.close({
      type : "connect",
      process : true
    });
  }
}
