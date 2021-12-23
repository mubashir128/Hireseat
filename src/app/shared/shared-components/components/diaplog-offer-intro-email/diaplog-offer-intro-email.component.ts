import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from '@angular/material/dialog';
import { UserService } from 'src/app/_services/user.service';
import { DialogIntroduceComponent } from '../dialog-introduce/dialog-introduce.component';

@Component({
  selector: 'app-diaplog-offer-intro-email',
  templateUrl: './diaplog-offer-intro-email.component.html',
  styleUrls: ['./diaplog-offer-intro-email.component.css']
})
export class DiaplogOfferIntroEmailComponent implements OnInit {

  loggedUser: any;

  flag: boolean;
  clients : any;
  hideBlueBtn: boolean;

  dialogType: String;
  dialogTitle: String;

  cc: any;
  bcc: any;
  recipientEmail: String;
  recipientName: String;

  senderName: String;
  candidateNameIs: String;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: DiaplogOfferIntroEmailComponent, public dialog: MatDialog, public dialogRef: MatDialogRef<DiaplogOfferIntroEmailComponent>){
    console.log("data : ",this.data);
    if(data){
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
}
