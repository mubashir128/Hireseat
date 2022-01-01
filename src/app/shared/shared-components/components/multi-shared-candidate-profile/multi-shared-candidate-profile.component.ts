import {
  Component,
  OnInit,
  OnChanges,
  OnDestroy,
} from "@angular/core";
import {
  FormBuilder
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
import { AbstractSharedComponent } from "src/app/abstract-classes/abstract-shared.component";
import { MatDialog } from "@angular/material/dialog";

declare var jQuery;
declare var Materialize;

@Component({
  selector: "app-multi-shared-candidate-profile",
  templateUrl: "./multi-shared-candidate-profile.component.html",
  styleUrls: ["./multi-shared-candidate-profile.component.css"],
})
export class MultiSharedCandidateProfileComponent extends AbstractSharedComponent implements OnInit, OnChanges, OnDestroy {

  // observer
  multiSharedProfileObserver = new Subject();
  multiSharedProfileObserver$ = this.multiSharedProfileObserver.asObservable();

  currentUserRole : any;

  constructor(
    protected resumeService: ResumeService,
    protected _sanitizer: DomSanitizer,
    private videoCallingService: VideoCallingService,
    private userService: UserService,
    private spinner: NgxSpinnerService,
    protected shareVideoService: ShareVideoService,
    protected formBuilder: FormBuilder,
    private _socket: WebsocketService,
    protected candidateService: CandidateService,
    protected _subList: SubscriberslistService,
    private _constants: ConstantsService,
    protected _bidEventService: BiddingEventService,
    protected _readResume : ReadResumeService,
    public dialog: MatDialog
  ) {
    super(dialog, shareVideoService, userService, formBuilder, _bidEventService, _sanitizer, candidateService, _readResume, resumeService, _subList, spinner, videoCallingService);

    this.myComment = [];
    this.replyToComment = [];

    this.currentUserRole = (this.loggedUser.userRole == 'recruiter') ? 'Recruiters' : 'Employers';

    shareVideoService._sharableResumeRecruiter.subscribe((res) => {
      this.shareResume = res;
    });

    this.isMultiShare = true;
  }

  ngOnChanges() {
    this.setModel();
  }

  async ngOnInit() {
    this.setModel();

    await this._socket.removeListener({ type: this._constants.sharedProfileType });
    this._socket.addListener({
      type: this._constants.sharedProfileType,
      callback: this.multiSharedProfileObserver,
    });

    this.getTopRecruiterList();
    this.getIndustries();
    this.getProfiles();

    this.debounceSearchForSkills();

    this.multiSharedProfileObserver$.subscribe((res: any) => {
      this.handleProfileData(res);
    });

  }

  debounceSearchForSkills(){
    this.searchSkillsFrm.valueChanges
      .pipe(
        debounceTime(1500),
        distinctUntilChanged()).subscribe((value) => {
          let obj = {};
          if(value.searchSkillTerm !== undefined ){
            this.skillText = value.searchSkillTerm;
            obj = {
              searchType: "skill",
              searchSkills: this.skillText
            };
          }
          this.resumes = [];
          this._subList.loaderListAfterSearch.next({type : "1"});
          this.getMultiSearchBySkills(obj);
      });
  }

  async handleProfileData(res: any) {
    switch (res.subType) {
      case this._constants.getAllMultiSharedProfiles:
        this.resumes = res.data;
        this._subList.loaderList.next({type : "0"});
        let rs = await this.getReverseUniqueResumeIds(res.result);
        this.addShareFromUser(res);
        break;
      case this._constants.addComment:
        this.addCommentToCommets(res);
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
      default:
        break;
    }
  }

  getReverseUniqueResumeIds(obj){
    let array = [];
    return new Promise(async function (resolve, reject) {
      for(let i = obj.length-1; i >= 0 ; i--){
        if(array.indexOf(''+obj[i].resumeId) === -1){
          array.push(''+obj[i].resumeId);
        }
        if(i === obj.length - 1){
          resolve(array);
        }
      }
    });
  }

  addShareFromUser(res){
    this.resumes.forEach((item , index) => {
      res.result.forEach((item2 , index2) => {
        if(item2.resumeId === item._id){
          item.shareFrom = item2.sharedFrom;
        }
      });
    });
  }

  handleResponse(res) {
    if (res.message) {
      Materialize.toast(res.message, 3000, "green");
      Materialize.toast("You gained 200 recruiter karma points", 4000, "blue");

      let eventObj = {
        pointer: "ratingPoints",
        subType: "increse",
        increseCount: this._constants.sharedPoints,
      };
      this._subList.recruiterPoints.next(eventObj);

      eventObj.pointer = "sharePoints";
      this._subList.recruiterPoints.next(eventObj);
    } else {
      Materialize.toast(res.error, 3000, "red");
    }
    this.spinner.hide();
  }

  getIndustries() {
    this.getProfileSubscription = this.candidateService.getCandidateIndustries().subscribe((res) => {
      if (res) {
        this.industriesAre = res.industries;
      }
    });
  }

  getProfiles() {
    this._subList.loaderList.next({type : "1"});
    this._socket.sendMessage({
      type: this._constants.sharedProfileType,
      data: {
        subType: this._constants.getAllMultiSharedProfiles,
      },
    });
  }

  getMultiSearchBySkills(payload){
    this.resumeService.getMultiSearchBySkills(payload).subscribe((res) => {
        if (res) {
          this.resumes = res;
          this._subList.loaderListAfterSearch.next({type : "0"});
          this.handleResumeData();
        }
      }, (err) => {
        this._subList.loaderListAfterSearch.next({type : "0"});
    });
  }

  ngAfterViewInit() {
    // instantiate Video.js
    this.videoSet();
  }

  // share process
  showShareModal(resume) {
    this.generateLink = true;
    this.shareVideoService.setResume(resume);
    let cc = resume.candidateKey ? resume.candidateKey.email : resume.candidate_id ? resume.candidate_id.email : "";
    let bcc = this.loggedUser.email ? this.loggedUser.email : "";
    cc = cc + ", " + bcc;
    let payload = {
      dialogType : "Share",
      dialogTitle : "Share",
      cc : cc,
      bcc : bcc,
      clients : this.clients,
      loggedUser : this.loggedUser,
      btns : ["Share on HireSeat", "Career Referral", "Copy Profile Link"]
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
      case "shareOnHireseat" : 
        THIS.showShareTouserModal();
        break;
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

  showShareTouserModal(){
    this.finalRecruitersAre = [];
    let payload = {
      dialogType : "shareToUsers",
      dialogTitle : "Share to Users",
      topRecruiters : this.topRecruiters,
      loggedUser : this.loggedUser,
      finalRecruitersAre : this.finalRecruitersAre
    };
    this.showShareTouserModalSuper(payload, this.showShareTouserModalSuperCallback);
  }

  showShareTouserModalSuperCallback(result, THIS){
    THIS.shareToUsers(result);
  }

  async generateLinkForVideo() {
    let payload = {};

    const candidateName = this.shareResume.resumeType ? this.shareResume.candidateName : this.shareResume.candidate_id.fullName;

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
              type: this._constants.sharedProfileType,
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
        type: this._constants.sharedProfileType,
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

    this.spinner.show();

    const candidateName = this.shareResume.resumeType
      ? this.shareResume.candidateName
      : this.shareResume.candidate_id.fullName;
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
    this.getArchivedVideoSubscription = this.videoCallingService
      .getArchivedVideo(archiveIdPayload)
      .subscribe(
        (res) => {
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
                comment: result.comments,
                comment2: result.comment2,
                comment3: result.comment3,
                candidateProfile: this.shareResume.resumeType ? false : true,
              };

              let userInfo = JSON.parse(localStorage.getItem("currentUser")).userInfo;
              this._socket.sendMessage({
                type: this._constants.sharedProfileType,
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
        },
        (err) => {
          console.log("none responses");

          this.spinner.hide();
          return false;
        }
      );
  }

  getMultiSortByIndustries() {
    this.candidateService.getMultiSortByIndustries({ industries: this.industries }).subscribe((res: any) => {
      this.resumes = res.data;
      this.addShareFromUser(res);
    });
  }

  handleToggleSign(obj) {
    if (obj.searchTab) {
      jQuery(".hideAndSHoTab").css("display", "block");
    } else {
      jQuery(".hideAndSHoTab").css("display", "none");
    }
  }

  ngOnDestroy() {
    this._socket.removeListener({ type: this._constants.sharedProfileType });
    this.multiSharedProfileObserver.unsubscribe();
  }
}
