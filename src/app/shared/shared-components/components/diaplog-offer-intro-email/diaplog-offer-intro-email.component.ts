import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from '@angular/material/dialog';
import { AbstractDialogComponent } from '../abstract-dialog.component';
import { shareConstants } from '../app-list/app-list.component';
import { DialogMessageComponent } from '../dialog-message/dialog-message.component';

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

  showCombine: boolean;

  loggedUser: any;

  btns: string[];

  systemUser: any;
  
  shareConstants: any;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: DiaplogOfferIntroEmailComponent, public dialog: MatDialog, public dialogRef: MatDialogRef<DiaplogOfferIntroEmailComponent>){
    super(data, dialogRef);
    if(data){
      this.cc = this.data.cc;
      this.bcc = this.data.bcc;

      this.clients = this.data.clients;
      this.hideBlueBtn = this.data.hideBlueBtn;

      this.loggedUser = this.data.loggedUser;

      this.btns = this.data.btns;
    }
    this.shareConstants = shareConstants;
  }

  ngOnInit(): void {
  }

  getBtns(btnName){
    return this.btns.includes(btnName) ? true : false;
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
      this.systemUser = clientObj;
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

  async closeOfferEmailDialog(){
    let result = await this.checkFields();
    if(!result){
      return ;
    }
    
    this.dialogRef.close({
      type : "OfferIntro",
      process : true,
      cc : this.cc,
      bcc : this.bcc,
      recipientName : this.recipientName,
      recipientEmail : this.recipientEmail
    });
  }

  generateLinkForVideo(){
    this.dialogRef.close({
      type : "copyProfileLink",
      process : true,
      systemUserId : this.systemUser._id
    });
  }
  
  shareConferenceRoom(){
    console.log("shareConferenceRoom : ");
    const dialogMessageRef = this.dialog.open(DialogMessageComponent,{
      data: {
        dialogType : "shareConferenceRoom",
        dialogTitle : "Share Conference room",
        dialogText : "Would you like share conference room ? ",
        btns : {"share" : "Share", "cancel" : "Cancel"}
      }
    });

    dialogMessageRef.afterClosed().subscribe(result => {
      if(result){
        this.dialogRef.close({
          type : this.shareConstants.shareConferenceRoom,
          process : true,
          systemUserId : this.systemUser._id
        });
      }
    });
  }

  async generalEmailIntro(){
    let result = await this.checkFields();
    if(!result){
      return ;
    }

    this.dialogRef.close({
      type : "generalReferral",
      process : true,
      cc : this.cc,
      bcc : this.bcc,
      recipientName : this.recipientName,
      recipientEmail : this.recipientEmail
    });
  }

  async introduceUser(){
    let result = await this.checkFields();
    if(!result){
      return ;
    }

    this.dialogRef.close({
      type : "careerReferral",
      process : true,
      cc : this.cc,
      bcc : this.bcc,
      recipientName : this.recipientName,
      recipientEmail : this.recipientEmail
    });
  }

  checkFields(){
    let result = true;
    if(this.recipientName == "" || this.recipientName == undefined || this.recipientEmail == "" || this.recipientEmail == undefined){
      Materialize.toast("Please fill all fields...", 1000, "red");
      result = false;
    }
    return result;
  }

  async showShareTouserModal() {
    let result = await this.checkFields();
    if(!result){
      return ;
    }

    this.dialogRef.close({
      type : "shareOnHireseat"
    });
  }

  async share(){
    let result = await this.checkFields();
    if(!result){
      return ;
    }

    this.dialogRef.close({
      type : "SEND",
      process : true,
      cc : this.cc,
      bcc : this.bcc,
      recipientName : this.recipientName,
      recipientEmail : this.recipientEmail
    });
  }

}