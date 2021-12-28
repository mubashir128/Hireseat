import { MatDialog } from "@angular/material/dialog";
import { DialogEmailPreviewComponent } from "../shared/shared-components/components/dialog-email-preview/dialog-email-preview.component";
import { DialogEmailPreview2Component } from "../shared/shared-components/components/dialog-email-preview2/dialog-email-preview2.component";
import { DialogIntroduceComponent } from "../shared/shared-components/components/dialog-introduce/dialog-introduce.component";
import { DialogThanksLaterComponent } from "../shared/shared-components/components/dialog-thanks-later/dialog-thanks-later.component";
import { DiaplogOfferIntroEmailComponent } from "../shared/shared-components/components/diaplog-offer-intro-email/diaplog-offer-intro-email.component";
import { FriendsConnectionsComponent } from "../shared/shared-components/components/friends-connections/friends-connections.component";

export abstract class AbstractSharedComponent{
  
  constructor(public dialog: MatDialog) {
  }

  showShareModalSuper(payload, callback){
    const dialogOfferIntroEmailRef = this.dialog.open(DiaplogOfferIntroEmailComponent,{
      data: {
        dialogType : payload.dialogType,
        dialogTitle : payload.dialogTitle,
        cc : payload.cc,
        bcc : payload.bcc,
        clients : payload.clients,
        hideBlueBtn : payload.hideBlueBtn,
        showCombine : payload.showCombine
      }
    });

    dialogOfferIntroEmailRef.afterClosed().subscribe(result => {
      if(result){
        callback(result);
      }
    });
  }

  generalEmailIntroSuper(payload, callback){
    const dialogEmailPreviewRef = this.dialog.open(DialogEmailPreviewComponent ,{
      data: {
        dialogType : payload.dialogType,
        dialogTitle : payload.dialogTitle,
        cc : payload.cc,
        bcc : payload.bcc,
        recipientName : payload.recipientName,
        recipientEmail : payload.recipientEmail,
        senderName : payload.senderName,
        candidateNameIs : payload.candidateNameIs,
        linedIn : payload.linedIn
      }
    });

    dialogEmailPreviewRef.afterClosed().subscribe(result => {
      if(result){
        callback(result);
      }
    });
  }

  introduceUserSuper(payload, callback){
    const dialogEmailPreview2Ref = this.dialog.open(DialogEmailPreview2Component,{
      data: {
        dialogType : payload.dialogType,
        dialogTitle : payload.dialogTitle,
        cc : payload.cc,
        bcc : payload.bcc,
        recipientName : payload.recipientName,
        recipientEmail : payload.recipientEmail,
        senderName : payload.senderName,
        candidateNameIs : payload.candidateNameIs,
        comment1 : payload.comment1,
        comment2 : payload.comment2,
        comment3 : payload.comment3
      }
    });

    dialogEmailPreview2Ref.afterClosed().subscribe(result => {
      if(result){
        callback(result);
      }
    });
  }

  emailPreviewSuper(payload, callback){
    const dialogIntroduceRef = this.dialog.open(DialogIntroduceComponent,{
      data: {
        dialogType : payload.dialogType,
        dialogTitle : payload.dialogTitle,
        senderName : payload.senderName,
        recipientName : payload.recipientName
      }
    });

    dialogIntroduceRef.afterClosed().subscribe(result => {
      if(result){
        callback(payload, result);
      }
    });
  }

  thxLetterSuper(payload, callback){
    const dialogThanksLaterRef = this.dialog.open(DialogThanksLaterComponent,{
      data: {
        dialogType : payload.dialogType,
        dialogTitle : payload.dialogTitle,
        thxFullName : payload.thxFullName
      }
    });

    dialogThanksLaterRef.afterClosed().subscribe(result => {
      if(result){
        callback(result);
      }
    });
  }
}