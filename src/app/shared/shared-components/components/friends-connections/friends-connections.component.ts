import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { CandidateService } from 'src/app/_services/candidate.service';
import { ConstantsService } from 'src/app/_services/constants.service';
import { ShareVideoService } from 'src/app/_services/share-video.service';
import { SubscriberslistService } from 'src/app/_services/subscriberslist.service';
import { UserService } from 'src/app/_services/user.service';
import { VideoCallingService } from 'src/app/_services/video-calling.service';
import { WebsocketService } from 'src/app/_services/websocket.service';
import { Plugins } from '@capacitor/core';
import { NgxSpinnerService } from 'ngx-spinner';
import * as myGlobals from "../../../../globalPath";
import { AbstractSharedComponent } from 'src/app/abstract-classes/abstract-shared.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { BiddingEventService } from 'src/app/_services/bidding-event.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ReadResumeService } from 'src/app/_services/read-resume.service';
import { ResumeService } from 'src/app/_services/resume.service';

const { Share } = Plugins;
declare var jQuery;
declare var Materialize;

@Component({
  selector: 'app-friends-connections',
  templateUrl: './friends-connections.component.html',
  styleUrls: ['./friends-connections.component.css']
})
export class FriendsConnectionsComponent extends AbstractSharedComponent implements OnInit {

  requestedFriendAre =  [];
  friendsConnections = [];
  companiesUsresAre = [];

  showRequest = true;
  showFriends = false;

  connectFriendObserver = new Subject();
  connectFriendObserver$ = this.connectFriendObserver.asObservable();

  loggedUser: any;

  itemsIs = 0;

  thxFullObj;
  
  constructor(
    protected _userService: UserService,
    protected _candidateService: CandidateService,
    protected _subList: SubscriberslistService,
    private _constants: ConstantsService,
    private _socket: WebsocketService,
    private _router: Router,
    protected shareVideoService: ShareVideoService,
    protected videoCallingService: VideoCallingService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    protected formBuilder: FormBuilder,
    protected _bidEventService: BiddingEventService,
    protected _sanitizer: DomSanitizer,
    protected _readResume : ReadResumeService,
    protected _resumeService: ResumeService
  ){
    super(dialog, shareVideoService, _userService, formBuilder, _bidEventService,_sanitizer, _candidateService, _readResume, _resumeService, _subList, spinner, videoCallingService);
  }

  async ngOnInit(){
    jQuery(".modal").modal();

    //add a observable for connection
    await this._socket.removeListener({ type: this._constants.connectionFriendType });
    this._socket.addListener({
      type: this._constants.connectionFriendType,
      callback: this.connectFriendObserver,
    });

    //when any activity of connection is happened, then this observable is called.
    this.connectFriendObserver$.subscribe((res: any) => {
      this.handleConnectionFriendData(res);
    });

    this.getFriendConnections();
  }

  handleConnectionFriendData(res: any) {
    switch (res.subType) {
      case this._constants.addFriendRequest :
        this.addRequestToRequestFriendConnection(res.data);
        break;
      case this._constants.generateLink:
        this.addCreatedLink(res);
        break;
      case this._constants.shareVideoViaRecruiterEmail:
        this.handleResponse(res.result);
        break;
      case this._constants.connectedAsFriend:
        this.friendsConnections = [res.data, ...this.friendsConnections];
        break;
      default:
        break;
    }
  }

  async addCreatedLink(res) {
    this.generateLink = false;
    this.createdUrl = res.result.link;
    this.copyLink();

    let shareRet = await Share.share({
      url: this.createdUrl,
      dialogTitle: 'Share with'
    });
  }

  copyLink() {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.createdUrl;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

    Materialize.toast("Link copied to clipboard", 1000);
  }

  handleResponse(res) {
    if (res.message) {
      Materialize.toast(res.message, 3000, "green");
    } else {
      Materialize.toast(res.error, 3000, "red");
    }
    this.spinner.hide();
  }

  getFriendConnections(){
    let payload = {};
    this._subList.loaderList.next({type : "1"});
    this._candidateService.getAllConnectedUsers(payload).subscribe((res) => {
      this._subList.loaderList.next({type : "0"});
      this.sortBasedOnStatusAsFriend(res.data);
    }, (err) => {
      console.log(err);
      this._subList.loaderList.next({type : "0"});
    });
  }

  sortBasedOnStatusAsFriend(data){
    data.forEach((friend, index) => {
      if(friend.status === this._constants.asAFriend){
        this.friendsConnections = [friend, ...this.friendsConnections];
        this.getUserWithRespectCompanies(friend);
        this.clients.push(friend.recipient?._id !== this.loggedUser._id ? friend.recipient : friend.requester);
      }else if(friend.recipient._id == this.loggedUser._id && friend.status === this._constants.asARequested){
        this.requestedFriendAre = [friend, ...this.requestedFriendAre];
      }
    });
  }

  getUserWithRespectCompanies(friend){
    let obj; // for resume data
    let obj2; //for user data
    if(friend.recipient._id == this.loggedUser._id){
      obj = friend.resumeId;
      obj2 = friend.requester;
    }else if(friend.requester._id == this.loggedUser._id){
      obj = friend.resumeId2;
      obj2 = friend.recipient;
    }

    obj.introduceYouToo?.split(",").forEach((company)=>{
      let str = company.toUpperCase().trim();
      let temp = this.companiesUsresAre.filter((com)=>{
        if(com.companyName === str){
          return true;
        }
      });

      //if temp lenght 0 then company not exists in array so insert into companiesUsresAre array
      if(temp.length == 0 && str !== ""){
        this.companiesUsresAre.push({companyName : str, users : [{user : obj2, resume : obj}]});
      }else{
        this.companiesUsresAre.forEach((item)=>{
          if(item.companyName == str){
            item.users.push({user : obj2, resume : obj});
          }
        });
      }
    });
  }

  gotoUser(userId){
    this.switchPage(1);
    setTimeout(()=>{
      var scrollPos =  jQuery("#mention_"+userId).offset().top - 25;
      jQuery(window).scrollTop(scrollPos);
      jQuery("#mention_"+userId).parent().css("border","1px solid red");
    }, 500);
  }

  acceptClick(userObj){
    let payload = {
      id : userObj._id
    };

    this._candidateService.acceptFriendRequest(payload).subscribe((res) => {
      this.removeRequestFromFriendRequest(res.data);
      this.addFriendToFriendConnection(res.data);
      this.getUserWithRespectCompanies(userObj);
    }, (err) => {
      console.log(err);
    });
  }

  changeLogo(notify){
    notify.showCreatedLogo = true;
  }

  removeRequestFromFriendRequest(res){
    this.requestedFriendAre.forEach((frdRequest, index) => {
      if(res._id == frdRequest._id){
        this.requestedFriendAre.splice(index, 1);
      }
    });
  }

  addFriendToFriendConnection(res){
    this.friendsConnections = [res, ...this.friendsConnections];
  }

  addRequestToRequestFriendConnection(res){
    this.requestedFriendAre = [res, ...this.requestedFriendAre];
  }

  cancelClick(id){
    let payload = {
      id : id
    };

    this._candidateService.cancelFriendRequest(payload).subscribe((res) => {
      this.removeRequestFromFriendRequest(res.data);
    }, (err) => {
      console.log(err);
    });
  }

  switchPage(page){
    jQuery("#switch" + this.itemsIs).css("background-color", "#33aaff");
    this.itemsIs = page;
    jQuery("#switch" + page).css("background-color", "#27B1BD");

    if(this.itemsIs == 0){
      this.showRequest = true;
      this.showFriends = false;
    }else{
      this.showFriends = true;
      this.showRequest = false;
    }
  }

  emailPreview(result){
    let senderName = this.loggedUser.fullName;
    let recipientName = result.recipientName;
    let payload = {
      dialogType : "OfferIntro",
      dialogTitle : "Email Preview...",
      senderName : senderName,
      recipientName : recipientName,
      recipientEmail : result.recipientEmail,
      cc : result.cc
    }
    this.emailPreviewSuper(payload, this.emailPreviewSuperCallback);
  }

  emailPreviewSuperCallback(payload, result, THIS){
    THIS.emailSend(payload, result);
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
    
    this.spinner.show();
    this.shareVideoService.sendCandidateMailToUsers(payload).subscribe(
      (res) => {
        if (res.msg) {
          Materialize.toast(res.msg, 3000, "green");
        } else {
          Materialize.toast(res.err, 3000, "red");
        }
        this.spinner.hide();
    }, (err) => {
      Materialize.toast(err.err, 3000, "red");
    });
  }

  // share process
  showShareModal(_id, resumeId, resumeId2) {
    this.generateLink = true;
    let resume = (_id !== this.loggedUser._id) ? resumeId : resumeId2;
    this.shareVideoService.setResume(resume);
    let cc = resume.candidate_id.email;
    let bcc = this.loggedUser.email ? this.loggedUser.email : "";
    cc = cc + ", " + bcc;
    let payload = {
      dialogType : "OfferReferral",
      dialogTitle : "Offer Referral",
      cc : cc,
      bcc : bcc,
      clients : this.clients,
      loggedUser : this.loggedUser,
      btns : ["Offer Intro", "General Referral", "Career Referral", "Copy Profile Link"]
    }
    this.showShareModalSuper(payload, this.showShareModalSuperCallback);
  }

  showShareModalSuperCallback(result, THIS){
    switch(result.type){
      case "copyProfileLink" : 
        if(result.process){
          THIS.generateLinkForVideo();
        }
        break;
      case "careerReferral" : 
        if(result.process){
          THIS.introduceUser(result);
        }
        break;
      case "generalReferral" : 
        if(result.process){
          THIS.generalEmailIntro(result);
        }
        break;
      case "OfferIntro" : 
        if(result.process){
          THIS.emailPreview(result);
        }
        break;
    }
  }  

  goToUserChat(_id, resumeId, resumeId2){
    let resume = (_id !== this.loggedUser._id) ? resumeId : resumeId2;
    let id = resume.candidate_id._id;
    if(id !== ""){
      this._router.navigate(["/"+this.loggedUser.userRole+"/chat-record", id]);
    }
  }

  thxLetter(_id, resumeId, resumeId2){
    this.thxFullObj = (_id !== this.loggedUser._id) ? resumeId : resumeId2;
    let thxFullName = this.thxFullObj.candidate_id.fullName;
  
    let payload = {
      dialogType : "ThanksLetter",
      dialogTitle : "Thanks Letter",
      thxFullName : thxFullName
    }
    this.thxLetterSuper(payload, this.thxLetterSuperCallback);
  }

  thxLetterSuperCallback(result, THIS){
    THIS.thxLetterSend(result);
  }

  thxLetterSend(result){
    let payload = {
      toId : this.thxFullObj.candidate_id._id,
      toEmailId : this.thxFullObj.candidate_id.email,
      thxFullName : result.thxFullName,
      fullname : this.loggedUser.fullName,
      fromEmail : this.loggedUser.email
    };

    this.spinner.show();
    this._candidateService.sayThxLetter(payload).subscribe((res) => {
      if (res) {
        Materialize.toast("Say thx successfully", 1000, "green");
      }
      this.spinner.hide();
    }, (err)=>{
      this.spinner.hide();
    });
  }

  async generateLinkForVideo() {
    let payload = {};
    const candidateName = this.shareResume.resumeType ? this.shareResume.candidateName : this.shareResume.candidate_id.fullName;
    let userInfo = JSON.parse(localStorage.getItem("currentUser")).userInfo;

    if (this.shareResume.interviewLinkedByRecruiter || this.shareResume.recordedId) {
      const archiveIdPayload = {
        archivedId: this.shareResume.interviewLinkedByRecruiter ? this.shareResume.interviewLinkedByRecruiter : this.shareResume.recordedId,
      };

      // getting url
      this.videoCallingService.getArchivedVideo(archiveIdPayload).subscribe((res) => {
        if (res) {

          this.shareableVideoURL = res.url;

          if (this.shareableVideoURL) {
            payload = {
              recruiterId: this.loggedUser._id,
              resumeId: this.shareResume._id,
              videoUrl: this.shareableVideoURL,
              fullName: candidateName,
              comment: this.shareResume.comments,
              candidateProfile: this.shareResume.resumeType ? false : true,
            };

            this._socket.sendMessage({
              type: this._constants.connectionFriendType,
              data: {
                payload: payload,
                subType: this._constants.generateLink
              },
            });

          }

        }
      });
    } else {
      console.log('no archive link available ');
      payload = {
        recruiterId: this.loggedUser._id,
        resumeId: this.shareResume._id,
        fullName: candidateName,
        videoUrl: '',
        comment: this.shareResume.comments,
        candidateProfile: this.shareResume.resumeType ? false : true,
      };

      this._socket.sendMessage({
        type: this._constants.connectionFriendType,
        data: {
          payload: payload,
          subType: this._constants.generateLink
        },
      });

    }
  }
  
  introduceUser(result){
    let candidateNameIs = this.shareResume.resumeType ? this.shareResume.candidateName : this.shareResume.candidate_id.fullName;
    let comment1 = this.shareResume.comments;
    let comment2 = this.shareResume.comment2;
    let comment3 = this.shareResume.comment3;
    let senderName = this.loggedUser.fullName;

    let payload = {
      dialogType : "EmailPreview...",
      dialogTitle : "Email Preview...",
      cc : result.cc,
      bcc : result.bcc,
      recipientName : result.recipientName,
      recipientEmail : result.recipientEmail,
      senderName : senderName,
      candidateNameIs : candidateNameIs,
      comment1 : comment1,
      comment2 : comment2,
      comment3 : comment3
    }

    this.introduceUserSuper(payload, this.introduceUserSuperCallback);
  }

  introduceUserSuperCallback(result, THIS){
    THIS.share(result);
  }

  async share(result) {

    var EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!EMAIL_REGEXP.test(result.recipientEmail)) {
      Materialize.toast("Invalid email", 800);
      return;
    }

    this.spinner.show();

    const candidateName = this.shareResume.resumeType ? this.shareResume.candidateName : this.shareResume.candidate_id.fullName;
    const subject =
      "Hireseat" +
      " - " +
      this.loggedUser.companyName +
      " - " +
      this.shareResume.jobTitle +
      " - " +
      candidateName +
      " Profile.";

    const archiveIdPayload = {
      archivedId: this.shareResume.interviewLinkedByRecruiter,
    };

    // getting url
    this.videoCallingService
      .getArchivedVideo(archiveIdPayload)
      .subscribe(
        async(res) => {
          if (res) {
            this.shareableVideoURL = res.url;

            this.spinner.hide();
            if (this.shareableVideoURL) {
              let systemUserId;
              this.friendsConnections.forEach((prof, index)=>{
                if(prof.recipient && (prof.recipient.fullName == result.recipientName) && (prof.recipient.email == result.recipientEmail)){
                  systemUserId = prof.recipient._id;
                }else if(prof.requester && (prof.requester.fullName == result.recipientName) && (prof.requester.email == result.recipientEmail)){
                  systemUserId = prof.requester._id;
                }
              });
              const payload = {
                recruiterId: this.loggedUser._id,
                resumeId: this.shareResume._id,
                recipientEmail: result.recipientEmail,
                cc: result.cc,
                bcc: result.bcc,
                videoUrl: this.shareableVideoURL,
                fullName: candidateName,
                subject: subject,
                comment: result.comment1,
                comment2: result.comment2,
                comment3: result.comment3,
                candidateProfile: this.shareResume.resumeType ? false : true,
                intruduce : true, //only when hitting a introduce
                senderName : result.senderName,
                fileURL : this.shareResume.fileURL,
                recipientName : result.recipientName,
                onlyCandidate : true,
                linkedIn : this.shareResume.linkedIn
              };

              // let finalStatementsArr = await this._readResume.readResume(this.shareResume);
              // console.log("finalStatementsArr : ",finalStatementsArr);

              let userInfo = JSON.parse(localStorage.getItem("currentUser")).userInfo;
              this._socket.sendMessage({
                type: this._constants.connectionFriendType,
                data: {
                  type: userInfo.userRole,
                  payload: payload,
                  subType: this._constants.shareVideoViaRecruiterEmail
                },
              });
            } else {
              Materialize.toast("no sharable video available", 3000);
              this.spinner.hide();
            }
          } else {
            this.spinner.hide();
          }
        }, (err) => {
          this.spinner.hide();
          return false;
        }
      );
    // got url
  }

  generalEmailIntro(result){
    let senderName = this.loggedUser.fullName;
    let candidateNameIs = this.shareResume.resumeType ? this.shareResume.candidateName : this.shareResume.candidate_id.fullName;
    let linedIn = this.shareResume.linkedIn;
    let payload = {
      dialogType : "EmailPreview...",
      dialogTitle : "Email Preview...",
      cc : result.cc,
      bcc : result.bcc,
      recipientName : result.recipientName,
      recipientEmail : result.recipientEmail,
      senderName : senderName,
      candidateNameIs : candidateNameIs,
      linedIn : linedIn
    }
    this.generalEmailIntroSuper(payload, this.generalEmailIntroSuperCallback);
  }

  generalEmailIntroSuperCallback(result, THIS){
    THIS.generalEmailIntroSend(result);
  }

  generalEmailIntroSend(result){
    let payload = {
      recipientEmail : result.recipientEmail,
      fullName : result.candidateNameIs,
      senderName : result.senderName,
      recipientName : result.recipientName,
      cc: result.cc,
      bcc: result.bcc,
      linkedIn : result.linedIn,
      emailType : this._constants.generalEmailIntro
    };
    
    this.spinner.show();
    this.shareVideoService.sendCandidateMailToUsers(payload).subscribe(
      (res) => {
        if (res.msg) {
          Materialize.toast(res.msg, 3000, "green");
        } else {
          Materialize.toast(res.err, 3000, "red");
        }
        this.spinner.hide();
    }, (err) => {
      Materialize.toast(err.err, 3000, "red");
      this.spinner.hide();
    });
  }

  //unscubscribe the subscribed variables.
  ngOnDestroy() {
    this.connectFriendObserver.unsubscribe();
  }

}
