import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from '@angular/material/dialog';
import { AbstractDialogComponent } from '../abstract-dialog.component';
declare var Materialize;

@Component({
  selector: 'app-diaplog-offer-intro-email',
  templateUrl: './diaplog-offer-intro-email.component.html',
  styleUrls: ['./diaplog-offer-intro-email.component.css']
})
export class DiaplogOfferIntroEmailComponent extends AbstractDialogComponent implements OnInit {

  cc: string;
  bcc: string;
  
  flag: boolean;
  clients : any;
  hideBlueBtn: boolean;

  recipientName: string;
  recipientEmail: string;

  senderName: string;
  candidateNameIs: string;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: DiaplogOfferIntroEmailComponent, public dialog: MatDialog, public dialogRef: MatDialogRef<DiaplogOfferIntroEmailComponent>){
    super(dialogRef);
    if(data){
      
      this.cc = this.data.cc;
      this.bcc = this.data.bcc;

      this.clients = this.data.clients;
      this.hideBlueBtn = this.data.hideBlueBtn;
      
      this.dialogType = this.data.dialogType;
      this.dialogTitle = this.data.dialogTitle;
    }
  }

  ngOnInit(): void {
  }

  searchClient(term: string){
    if(term == ""){
      this.flag = false;
    }else{
      this.flag = true;
    }
  }

  onSelectClient(clientObj) {
    if (clientObj) {
      this.flag = false;
      this.recipientName = clientObj.fullName;
      this.recipientEmail = clientObj.email;
    }else{
      return false;
    }
  }

  closeClients($event){
    setTimeout(()=>{
      this.flag = false;
    }, 300);
  }

  closeOfferEmailDialog(){
    this.dialogRef.close({
      cc : this.cc,
      bcc : this.bcc,
      recipientName : this.recipientName,
      recipientEmail : this.recipientEmail
    });
  }

  generateLinkForVideo(){
    this.dialogRef.close({
      type : "copyProfileLink",
      process : true
    });
  }

  generalEmailIntro(){
    if(this.recipientName == ""){
      Materialize.toast("Please fill recipient name", 800, "res");
    }else if(this.recipientEmail == ""){
      Materialize.toast("Please fill email field", 800, "res");
    }else{
      this.dialogRef.close({
        type : "generalReferral",
        process : true,
        cc : this.cc,
        bcc : this.bcc,
        recipientName : this.recipientName,
        recipientEmail : this.recipientEmail
      });
    }
  }

  introduceUser(){
    if(this.recipientName == ""){
      Materialize.toast("Please fill recipient name", 800, "res");
    }else if(this.recipientEmail == ""){
      Materialize.toast("Please fill email field", 800, "res");
    }else{
      this.dialogRef.close({
        type : "careerReferral",
        process : true,
        cc : this.cc,
        bcc : this.bcc,
        recipientName : this.recipientName,
        recipientEmail : this.recipientEmail
      });
    }
  }

}