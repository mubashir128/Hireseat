import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeopleEventService } from 'src/app/_services/people-event.service';
import { PeoplesEvent } from '../app-list/app-list.component';
import { UserService } from "../../../../_services/user.service";
import { DialogConnectOfferIntroComponent } from '../dialog-connect-offer-intro/dialog-connect-offer-intro.component';
import { MatDialog } from '@angular/material/dialog';
import { CandidateService } from 'src/app/_services/candidate.service';
import { DialogOfferIntroChatComponent } from '../dialog-offer-intro-chat/dialog-offer-intro-chat.component';
import { DialogIntroduceComponent } from '../dialog-introduce/dialog-introduce.component';
import { ConstantsService } from 'src/app/_services/constants.service';
import * as myGlobals from "../../../../globalPath";
import { ShareVideoService } from 'src/app/_services/share-video.service';

declare var Materialize;

@Component({
  selector: 'app-event-list-users',
  templateUrl: './event-list-users.component.html',
  styleUrls: ['./event-list-users.component.css']
})
export class EventListUsersComponent implements OnInit {
  eventId: any;
  eventsList: PeoplesEvent;

  loggedUser: any;
  showLoader: boolean = true;

  linedIn: string;
  
  constructor(
    private _route: ActivatedRoute,
    private _peopleEventService: PeopleEventService,
    private _router: Router,
    private _userService:UserService,
    protected _dialog: MatDialog,
    protected candidateService: CandidateService,
    private _constants: ConstantsService,
    protected shareVideoService: ShareVideoService
  ) {
    this._route.params.subscribe(params => {
      this.eventId = params.eventId;
    });
    this.loggedUser = this._userService.getUserData();
  }

  ngOnInit(): void {
    this.getPeopleEvents();
  }

  getPeopleEvents() {
    this._peopleEventService.getEvents(this.eventId).subscribe(data => {
      this.showLoader = false;
      this.eventsList = data[0];
      this.setCheckInUsersInEventList();
      
    },err=>{
      this.showLoader = false;
    });
  }

  backToEvents(){
    this._router.navigate(["/candidate/suggest-and-events"], { queryParams: { eventRoute: 1}});
  }

  gotoChat(userId){
    this._router.navigate(["/"+this.loggedUser.userRole+"/chat-record", userId]);
  }

  setCheckInUsersInEventList(){
    if(this.eventsList.attendingUsers.length!=0){
      for (let index = 0; index < this.eventsList.attendingUsers.length; index++) {
        this.eventsList.attendingUsers[index].checkIn=false;
        this.verifyCheckInUser(this.eventsList.attendingUsers[index].userId._id,this.eventsList.checkInUsers)          
      }
      let attendingUsers = this.eventsList.attendingUsers.sort((x,y)=>{
        return Number(y.checkIn)-Number(x.checkIn);
      })

      this.eventsList.attendingUsers = attendingUsers;
    }
  }

  verifyCheckInUser(userId, checkInUsers) {
    // console.log(userId, checkInUsers)
    for (let index = 0; index < checkInUsers.length; index++) {
      if (checkInUsers[index].userId._id == userId && checkInUsers[index].checkIn) {
        for (let j = 0; j < this.eventsList.attendingUsers.length; j++) {
          if(this.eventsList.attendingUsers[j].userId._id==checkInUsers[index].userId._id){
            this.eventsList.attendingUsers[j].checkIn=true;
           //console.log(checkInUsers[index].userId._id,this.eventsList.attendingUsers[j])
          }          
        }
        return true;
      }
    }
  }

  connectWithOffers(eventUsers){
    let askAndConnectName = eventUsers?.userId?.fullName;
    let askAndConnectDesiredCompanies = eventUsers?.candidate_id?.introduceYouToo;

    const dialogConnectOfferIntroRef = this._dialog.open(DialogConnectOfferIntroComponent,{
      data: {
        dialogType : "OfferIntro...",
        dialogTitle : "Offer Intro...",
        askAndConnectName : askAndConnectName,
        askAndConnectDesiredCompanies : askAndConnectDesiredCompanies
      }
    });

    dialogConnectOfferIntroRef.afterClosed().subscribe(result => {
      if(result){
        switch(result.type){
          case "connect" : 
            this.connect(eventUsers);
            break;
          case "connectWithIntros" : 
            this.conenctWithIntro(eventUsers);
            break;
        }
      }
    });
  }

  conenctWithIntro(eventUsers){
    this.goToUserChat(eventUsers);
    this.connect(eventUsers);
  }

  connect(eventUsers){
    let id = eventUsers.userId._id;
    let payload = {
      recipient : id
    };
    
    if(this.loggedUser._id == id){
      Materialize.toast("It's your Profile, you can't connect yourself.", 1000, "red");
      return ;
    }

    this.candidateService.connectWithUsers(payload).subscribe((res) => {
      Materialize.toast(res.message, 1000, "green");
    }, (err) => {
      Materialize.toast("Something went wrong!", 1000);
    });
  }

  goToUserChat(eventUsers){
    let introsAt = eventUsers?.candidate_id?.introduceYouToo;

    const dialogOfferEmailChatRef = this._dialog.open(DialogOfferIntroChatComponent,{
      data: {
        dialogType : "OfferIntro...",
        dialogTitle : "Offer Intro...",
        introsAt : introsAt
      }
    });

    dialogOfferEmailChatRef.afterClosed().subscribe(result => {
      if(result){
        switch(result.type){
          case "noThankYou" : 
            if(result.process){
              this.redirectToUserChat(eventUsers);
            }
            break;
          case "offerIntro" : 
            if(result.process){
              this.offerEmailIntro(eventUsers);
            }
            break;
        }
      }
    });

  }

  redirectToUserChat(eventUsers){
    let id = eventUsers.userId._id;
    if(id !== "" && id !== this.loggedUser._id){
      this._router.navigate(["/"+this.loggedUser.userRole+"/chat-record", id]);
    }else{
      Materialize.toast("It's your Profile, you can't chat to yourself.", 1000, "red");
    }
  }

  offerEmailIntro(eventUsers){
    let senderName = this.loggedUser.fullName;
    let candidateNameIs = eventUsers?.userId?.fullName;
    let recipientName = candidateNameIs;
    let recipientEmail = eventUsers?.userId?.email;
    this.linedIn = eventUsers?.userId?.linkedIn;

    let resultIs = {
      recipientName : recipientName,
      recipientEmail : recipientEmail,
      cc : "atulpisal.ap@gmail.com"
    }

    const dialogIntroduceRef = this._dialog.open(DialogIntroduceComponent,{
      data: {
        dialogType : "OfferIntro",
        dialogTitle : "Email Preview...",
        senderName : senderName,
        recipientName : recipientName
      }
    });

    dialogIntroduceRef.afterClosed().subscribe(result2 => {
      if(result2){
        this.emailSend(resultIs, result2);
      }
    });
  }

  emailSend(result, result2){
    let payload = {
      recipientEmail : result.recipientEmail,
      fullName : result.recipientName,
      cc : result.cc,
      senderName : result2.senderName,
      recipientName : result.recipientName,
      linkedIn : this.linedIn,
      companies : result2.companies,
      emailType : this._constants.offerEmailIntro,
      chatLink : myGlobals.chatRedirectUrl + this.loggedUser.userRole + "/chat-record/" + this.loggedUser._id
    };
    
    this.shareVideoService.sendCandidateMailToUsers(payload).subscribe(
      (res) => {
        if (res.msg) {
          Materialize.toast(res.msg, 3000, "green");
        } else {
          Materialize.toast(res.err, 3000, "red");
        }
    }, (err) => {
      Materialize.toast(err.err, 3000, "red");
    });
  }
}
