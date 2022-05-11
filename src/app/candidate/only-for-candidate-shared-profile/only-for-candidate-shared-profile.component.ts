import {
  Component,
  OnInit,
  OnChanges,
  OnDestroy,
  EventEmitter,
  Output,
  Input,
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { NgxSpinnerService } from "ngx-spinner";
import { Subject } from "rxjs";
import { ResumeService } from "src/app/_services/resume.service";
import { ShareVideoService } from "src/app/_services/share-video.service";
import { UserService } from "src/app/_services/user.service";
import { VideoCallingService } from "src/app/_services/video-calling.service";
import { WebsocketService } from "src/app/_services/websocket.service";
import { CandidateService } from "src/app/_services/candidate.service";

import {
  debounceTime,
  distinctUntilChanged
} from "rxjs/operators";
import { SubscriberslistService } from "src/app/_services/subscriberslist.service";
import { ConstantsService } from "src/app/_services/constants.service"
import { BiddingEventService } from "src/app/_services/bidding-event.service";
import { ReadResumeService } from "src/app/_services/read-resume.service";
import { Router } from "@angular/router";
import * as myGlobals from "../../globalPath";
import { JoyrideService } from "ngx-joyride";
import { MatDialog } from "@angular/material/dialog";
import { DialogIntroduceComponent } from "src/app/shared/shared-components/components/dialog-introduce/dialog-introduce.component";
import { DialogOfferIntroChatComponent } from "src/app/shared/shared-components/components/dialog-offer-intro-chat/dialog-offer-intro-chat.component";
import { DialogConnectOfferIntroComponent } from "src/app/shared/shared-components/components/dialog-connect-offer-intro/dialog-connect-offer-intro.component";
import { AbstractSharedComponent } from "src/app/abstract-classes/abstract-shared.component";

declare var jQuery;
declare var Materialize;

@Component({
  selector: 'app-only-for-candidate-shared-profile',
  templateUrl: './only-for-candidate-shared-profile.component.html',
  styleUrls: ['./only-for-candidate-shared-profile.component.css']
})
export class OnlyForCandidateSharedProfileComponent extends AbstractSharedComponent implements OnInit, OnChanges, OnDestroy {

  // observer
  onlyForCandidateSharedProfileObserver = new Subject();
  onlyForCandidateSharedProfileObserver$ = this.onlyForCandidateSharedProfileObserver.asObservable();

  CompaniesTeamsRolesFrm: FormGroup;

  searchCTRTerm = "";
  @Input() companyName = "";

  searchText = "onlyCandidateSearch";

  showResult = false;
  searchIndustry = "";

  @Output() countEM = new EventEmitter();

  constructor(
    protected resumeService: ResumeService,
    protected _sanitizer: DomSanitizer,
    protected videoCallingService: VideoCallingService,
    protected userService: UserService,
    protected spinner: NgxSpinnerService,
    protected shareVideoService: ShareVideoService,
    protected formBuilder: FormBuilder,
    private _socket: WebsocketService,
    protected candidateService: CandidateService,
    protected _subList: SubscriberslistService,
    private _constants: ConstantsService,
    protected _bidEventService: BiddingEventService,
    protected _readResume : ReadResumeService,
    private _router: Router,
    private readonly joyrideService: JoyrideService,
    protected dialog: MatDialog
  ) {
    super(dialog, shareVideoService, userService, formBuilder, _bidEventService, _sanitizer, candidateService, _readResume, resumeService, _subList, spinner, videoCallingService);

    this.CompaniesTeamsRolesFrm = this.formBuilder.group({
      tags: ["", Validators.required],
      searchCTRTerm: [""],
    });

  }

  ngOnChanges() {
    this.setModel();
  }

  async ngOnInit() {
    this.setModel();
    this.searchCTRTerm = this.companyName;
    await this._socket.removeListener({ type: this._constants.onlyForCandidateSharedProfileType });
    this._socket.addListener({
      type: this._constants.onlyForCandidateSharedProfileType,
      callback: this.onlyForCandidateSharedProfileObserver,
    });

    this.getTopRecruiterList();
    this.getIndustries();
    this.getProfiles();

    this.debounceSearchForCTR();
    this.debounceSearchForSkills();

    this.onlyForCandidateSharedProfileObserver$.subscribe((res: any) => {
      this.handleProfileData(res);
    });
  }

  tourStart(){
    let loginCount = this.loggedUser.loginCount;
    let beforeMyProfileWalkthrough = JSON.parse(this.userService.getOnlyCandidateWalkthrough());
    if(loginCount !== 1 || beforeMyProfileWalkthrough){
      return ;
    }
    this.joyrideService.startTour({ steps: ['firstStep', 'secondStep', 'thirdStep'], themeColor: '', showPrevButton: false}).subscribe((step) => {
        /*Do something*/
      }, (err) => {
        /*handle error*/
        this.onDone();
      }, () => {
        /*Tour is finished here, do something*/
        this.onDone();
      });
  }

  onDone(){
    this.userService.setOnlyCandidateWalkthroughWalkthrough();
  }

  debounceSearchForCTR(){
    this.CompaniesTeamsRolesFrm.valueChanges
      .pipe(
        debounceTime(1500),
        distinctUntilChanged()).subscribe((value) => {
          let obj = {};
          if(value.searchCTRTerm !== undefined ){
            this.skillText = value.searchCTRTerm;
            obj = {
              searchType: "skill",
              searchSkills: this.skillText,
              userRole : this.loggedUser.userRole
            };
          }
      });
  }

  handleProfileData(res: any) {
    switch (res.subType) {
      case this._constants.getAllOnlyForCandidateSharedProfileType:
        this.resumes = res.data;
        this.addFriendConnectionToProfile(res);
        this.sortProfilesByConpanies();
        this.onCount(this.resumes.length);
        this._subList.loaderList.next({type : "0"});
        break;
      case this._constants.addComment:
        this.addCommentToCommets(res);
        break;
      case this._constants.addNote:
        this.addNoteToNoteSection(res);
        break;
      case this._constants.likeComment:
        this.addLikeToComment(res);
        break;
      case this._constants.replyComment:
        this.addReplyToComment(res);
        break;
      case this._constants.shareVideoViaRecruiterEmail:
        this.handleResponse(res.result);
        break;
      case this._constants.editComment:
        this.editRespectedComment(res);
        break;
      case this._constants.deleteComment:
        this.deleteRespectedComment(res);
        break;
      case this._constants.generateLink:
        this.addCreatedLink(res);
        break;
      case this._constants.userIsOnline:
        this.changesOnlineStatus(res, true);
        break;
      case this._constants.userIsOffline:
        this.changesOnlineStatus(res, false);
        break;
  
      default:
        break;
    }
  }

  onCount(count){
    this.countEM.emit(count);
  }

  changesOnlineStatus(res, status){
    this.resumes.forEach((profile, index) => {
      if(profile.candidateKey && profile.candidateKey._id == res.userId){
        profile.candidateKey.online = status;
      }else if(profile.candidate_id && profile.candidate_id._id == res.userId){
        profile.candidate_id.online = status;
      }
    });
  }

  sortProfilesByConpanies(){
    // let introduceYouToo = this.myProfileContent ? this.myProfileContent.introduceYouToo?.trim().toLowerCase().split(",") : this.loggedUser ? this.loggedUser.introduceYouToo?.trim().toLowerCase().split(",") : [];
    let desiredCompanies = this.myProfileContent ? this.myProfileContent.desiredCompanies?.trim().toLowerCase().split(",") : this.loggedUser ? this.loggedUser.desiredCompanies?.trim().toLowerCase().split(",") : [];
    this.resumes.forEach((profile, index) => {
      let status = false;
      this.clients.push(profile.candidateKey ? profile.candidateKey : profile.candidate_id ? profile.candidate_id : {});
      // introduceYouToo.forEach((intro, index2) => {
      desiredCompanies.forEach((intro, index2) => {
        if(profile.candidateProfileKey){
          if(profile.candidateProfileKey?.desiredCompanies?.toLowerCase().indexOf(intro) !== -1 && profile.candidateProfileKey?.desiredCompanies !== ""){
            status = true;
          }
        }else if(profile.desiredCompanies){
          if(profile.desiredCompanies?.toLowerCase().indexOf(intro) !== -1 && profile.desiredCompanies !== ""){
            status = true;
          }
        }
      });

      if(status){
        this.resumes = [profile, ...this.resumes];
        this.resumes.splice(index + 1, 1);
      }
      
    });
  }

  addFriendConnectionToProfile(res){
    res.frdConnection.forEach((frd, index) => {
      this.resumes.forEach((profile, index2) => {
        if(profile.candidateKey?._id == frd.recipient._id || profile.candidate_id?._id == frd.recipient._id){
          profile.addedAsAFriend = true;
        }else if(profile.candidateKey?._id == frd.requester._id || profile.candidate_id?._id == frd.requester._id){
          profile.addedAsAFriend = true;
        }else{

        }
      });
    });
  }

  handleResponse(res) {
    if (res.message) {
      Materialize.toast(res.message, 3000, "green");
    } else {
      Materialize.toast(res.error, 3000, "red");
    }

    jQuery("#shareEmailModal").modal("close");
    this.spinner.hide();
  }

  getIndustries() {
    this.getProfileSubscription = this.candidateService.getCandidateIndustries().subscribe((res) => {
      if (res) {
        this.industriesAre = res.industries;
        this.industriesAre = [{_id : 1121, name : "All"}, ...this.industriesAre];
      }
    });
  }

  industryClick(type){
    this.searchIndustry = type.trim().toLowerCase();
    this.showResult = true;
    setTimeout(()=>{
      this.tourStart();
    }, 500);
  }

  getProfiles() {
    this._subList.loaderList.next({type : "1"});
    this._socket.sendMessage({
      type: this._constants.onlyForCandidateSharedProfileType,
      data: {
        subType: this._constants.getAllOnlyForCandidateSharedProfileType,
      },
    });

    if (this.loggedUser.userRole === "candidate") {
      this.myProfile();
    }
  }

  ngAfterViewInit() {
    this.videoSet();
  }

  showShareModal2(resume) {
    this.shareVideoService.setResume(resume);
    let payload = {
      dialogType : "OfferIntro",
      dialogTitle : "Offer Intro",
      clients : this.clients,
      loggedUser : this.loggedUser,
      btns : ["Offer Intro"]
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

  emailPreview(result){
    let senderName = this.loggedUser.fullName;
    let recipientName = result.recipientName;
    let payload = {
      dialogType : "OfferIntro",
      dialogTitle : "Email Preview...",
      senderName : senderName,
      recipientName :recipientName,
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
  showShareModal(resume) {
    this.generateLink = true;
    this.shareVideoService.setResume(resume);
    let cc = resume.candidateKey ? resume.candidateKey.email : resume.candidate_id ? resume.candidate_id.email : "";
    let bcc = this.loggedUser.email ? this.loggedUser.email : "";
    cc = cc + ", " + bcc;
    let payload = {
      dialogType : "OfferReferral",
      dialogTitle : "Offer Referral",
      cc : cc,
      bcc : bcc,
      clients : this.clients,
      loggedUser : this.loggedUser,
      btns : ["General Referral", "Career Referral", "Copy Profile Link"]
    }
    this.showShareModalSuper(payload, this.showShareModalSuperCallback);
  }

  shareInvisible(resume){
    Materialize.toast("Not Connectioned", 1000, "red");
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
      this.getArchivedVideoSubscription = this.videoCallingService.getArchivedVideo(archiveIdPayload).subscribe((res) => {
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
              type: this._constants.onlyForCandidateSharedProfileType,
              data: {
                payload: payload,
                subType: this._constants.generateLink
              },
            });
          }

        }
      });
    } else {
      payload = {
        recruiterId: this.loggedUser._id,
        resumeId: this.shareResume._id,
        fullName: candidateName,
        videoUrl: '',
        comment: this.shareResume.comments,
        candidateProfile: this.shareResume.resumeType ? false : true,
      };

      this._socket.sendMessage({
        type: this._constants.onlyForCandidateSharedProfileType,
        data: {
          payload: payload,
          subType: this._constants.generateLink
        },
      });

    }
  }

  async share(result) {

    var EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!EMAIL_REGEXP.test(result.recipientEmail)) {
      Materialize.toast("Invalid email", 800);
      return;
    }
    
    const candidateName = this.shareResume.resumeType ? this.shareResume.candidateName : this.shareResume.candidate_id.fullName;
    const subject ="Hireseat" + " - " + this.loggedUser.companyName + " - " + this.shareResume.jobTitle + " - " + candidateName + " Profile.";
    
    const archiveIdPayload = {
      archivedId: this.shareResume.interviewLinkedByRecruiter,
    };
    
    this.spinner.show();
    
    // getting url
    this.getArchivedVideoSubscription = this.videoCallingService
      .getArchivedVideo(archiveIdPayload)
      .subscribe(
        async(res) => {
          if (res) {
            this.shareableVideoURL = res.url;
            this.spinner.hide();
            if (this.shareableVideoURL) {
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
                type: this._constants.onlyForCandidateSharedProfileType,
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
  // request recruiter process end

  handleToggleSign(obj) {
    if (obj.searchTab) {
      jQuery(".hideAndSHoTab").css("display", "block");
    } else {
      jQuery(".hideAndSHoTab").css("display", "none");
    }
  }

  goToUserChat(resume){
    this.shareVideoService.setResume(resume);
    let introsAt = this.shareResume.introduceYouToo;

    const dialogOfferEmailChatRef = this.dialog.open(DialogOfferIntroChatComponent,{
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
              this.redirectToUserChat();
            }
            break;
          case "offerIntro" : 
            if(result.process){
              this.offerEmailIntro(); 
            }
            break;
        }
      }
    });

  }

  redirectToUserChat(){
    let id = this.shareResume.candidateKey ? this.shareResume.candidateKey._id : this.shareResume.candidate_id ? this.shareResume.candidate_id._id : "";
    if(id !== "" && id !== this.loggedUser._id){
      this._router.navigate(["/"+this.loggedUser.userRole+"/chat-record", id]);
    }else{
      Materialize.toast("It's your Profile, you can't chat to yourself.", 1000, "red");
    }
  }

  connectWithOffers(resume){
    this.shareVideoService.setResume(resume);
    let askAndConnectName = this.shareResume.candidateKey ? this.shareResume.candidateKey.fullName : this.shareResume.candidate_id ? this.shareResume.candidate_id.fullName : "";
    let askAndConnectDesiredCompanies = this.shareResume.introduceYouToo;

    const dialogConnectOfferIntroRef = this.dialog.open(DialogConnectOfferIntroComponent,{
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
            this.connect();
            break;
          case "connectWithIntros" : 
            this.conenctWithIntro();
            break;

        }
      }
    });
  }

  conenctWithIntro(){
    jQuery("#askOfferAndConnect").modal("close");
    this.goToUserChat(this.shareResume);
    this.connect();
  }

  connect(){
    let id = this.shareResume.candidateKey ? this.shareResume.candidateKey._id : this.shareResume.candidate_id ? this.shareResume.candidate_id._id : "";
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

  connected(resume){
    Materialize.toast("Already Connected !...", 1000, "green");
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
    });
  }

  offerEmailIntro(){
    let senderName = this.loggedUser.fullName;
    let candidateNameIs = this.shareResume.resumeType ? this.shareResume.candidateName : this.shareResume.candidate_id.fullName;
    let recipientName = candidateNameIs;
    let recipientEmail = this.shareResume.resumeType ? this.shareResume.email : this.shareResume.candidate_id.email;
    this.linedIn = this.shareResume.linkedIn;

    let resultIs = {
      recipientName : recipientName,
      recipientEmail : recipientEmail,
      cc : "atulpisal.ap@gmail.com"
    }

    const dialogIntroduceRef = this.dialog.open(DialogIntroduceComponent,{
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

  goBack(){
    this.showResult = false;
  }

  getIntroduceCount(resume){
    return (resume?.introduceCount) ? resume.introduceCount : (resume?.candidateProfileKey?.introduceCount) ? resume.candidateProfileKey.introduceCount : 0;
  }

  ngOnDestroy() {
    this._socket.removeListener({ type: this._constants.onlyForCandidateSharedProfileType });
    this.onlyForCandidateSharedProfileObserver.unsubscribe();
    this.onDone();
  }
}
