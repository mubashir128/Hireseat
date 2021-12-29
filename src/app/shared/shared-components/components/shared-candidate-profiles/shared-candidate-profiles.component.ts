import {
  Component,
  OnInit,
  OnChanges,
  ViewChild,
  ElementRef,
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

import { SubscriberslistService } from "src/app/_services/subscriberslist.service";
import { ConstantsService } from "src/app/_services/constants.service"
import { BiddingEventService } from "src/app/_services/bidding-event.service";
import { ReadResumeService } from "src/app/_services/read-resume.service";
import { AbstractSharedComponent } from "src/app/abstract-classes/abstract-shared.component";
import { MatDialog } from "@angular/material/dialog";

declare var jQuery;
declare var Materialize;
@Component({
  selector: "app-shared-candidate-profiles",
  templateUrl: "./shared-candidate-profiles.component.html",
  styleUrls: ["./shared-candidate-profiles.component.css"],
})
export class SharedCandidateProfilesComponent extends AbstractSharedComponent implements OnInit, OnChanges, OnDestroy {
  
  @ViewChild("searchByName", { static: true }) searchByName: ElementRef;

  // observer
  sharedProfileObserver = new Subject();
  sharedProfileObserver$ = this.sharedProfileObserver.asObservable();

  recipientEmail= "";
  recipientName = "";
  cc: any;
  bcc: any;

  comment1 = "";
  comment2 = "";
  comment3 = "";
  candidateNameIs = "";

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
    public dialog: MatDialog
  ) {
    super(dialog, shareVideoService, userService, formBuilder, _bidEventService, _sanitizer, candidateService, _readResume, resumeService, _subList, spinner, videoCallingService);

    shareVideoService._sharableResumeRecruiter.subscribe((res) => {
      this.shareResume = res;
    });

  }

  ngOnChanges() {
    this.setModel();
  }

  async ngOnInit() {
    this.setModel();

    await this._socket.removeListener({ type: this._constants.sharedProfileType });
    this._socket.addListener({
      type: this._constants.sharedProfileType,
      callback: this.sharedProfileObserver,
    });

    this.getTopRecruiterList();
    this.getIndustries();
    this.getProfiles();

    this.debounceSearchForSkills();

    this.sharedProfileObserver$.subscribe((res: any) => {
      this.handleProfileData(res);
    });
  }

  handleProfileData(res: any) {
    switch (res.subType) {
      case this._constants.getAllSharedProfiles:
        this.resumes = res.data;
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
      default:
        break;
    }
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

    jQuery("#shareEmailModal").modal("close");
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
        subType: this._constants.getAllSharedProfiles,
      },
    });

    if (this.loggedUser.userRole === "candidate") {
      this.myProfile();
    }
  }

  disabledDay(date) { }

  ngAfterViewInit() {
    this.videoSet();
  }

  // share process
  showShareModal(resume) {
    this.cc = resume.candidateKey ? resume.candidateKey.email : resume.candidate_id ? resume.candidate_id.email : "";
    this.bcc = this.loggedUser.email ? this.loggedUser.email : "";
    this.generateLink = true;
    jQuery("#shareEmailModal").modal("open");
    this.shareVideoService.setResume(resume);
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

  async share(intruduce) {

    var EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!EMAIL_REGEXP.test(this.recipientEmail)) {
      Materialize.toast("Invalid email", 800);
      return;
    }

    jQuery("#emaiPreviewModal").modal("close");
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
        async(res) => {
          if (res) {
            this.shareableVideoURL = res.url;

            this.spinner.hide();
            if (this.shareableVideoURL) {
              const payload = {
                recruiterId: this.loggedUser._id,
                resumeId: this.shareResume._id,
                recipientEmail: this.recipientEmail,
                cc: this.cc,
                bcc: this.bcc,
                videoUrl: this.shareableVideoURL,
                fullName: candidateName,
                subject: subject,
                comment: this.shareResume.comments,
                comment2: this.shareResume.comment2,
                comment3: this.shareResume.comment3,
                candidateProfile: this.shareResume.resumeType ? false : true,
                intruduce : intruduce, //only when hitting a introduce
                senderName : this.loggedUser.fullName,
                fileURL : this.shareResume.fileURL,
                recipientName : this.recipientName
              };

              // let finalStatementsArr = await this._readResume.readResume(this.shareResume);
              // console.log("finalStatementsArr : ",finalStatementsArr);

              let userInfo = JSON.parse(localStorage.getItem("currentUser")).userInfo;
              this._socket.sendMessage({
                type: this._constants.sharedProfileType,
                data: {
                  type: userInfo.userRole,
                  payload: payload,
                  subType: this._constants.shareVideoViaRecruiterEmail
                },
              });

              // this.shareVideoSubscription = this.shareVideoService
              //   .shareVideoViaRecruiterEmail(payload)
              //   .subscribe(
              //     (res) => {
              //       if (res) {
              //         // console.log(res);
              //         Materialize.toast(res.msg, 3000);
              //         Materialize.toast(
              //           "You gained 200 recruiter karma points",
              //           4000,
              //           "red"
              //         );
              //         jQuery("#shareEmailModal").modal("close");

              //         let eventObj = {
              //           pointer: "ratingPoints",
              //           subType: "increse",
              //           increseCount: this._constants.sharedPoints,
              //         };
              //         this._subList.recruiterPoints.next(eventObj);

              //         eventObj.pointer = "sharePoints";
              //         this._subList.recruiterPoints.next(eventObj);

              //         this.spinner.hide();
              //       }
              //     },
              //     (err) => {
              //       // console.log(err);
              //       Materialize.toast("unable to send an email!", 3000);
              //       jQuery("#shareEmailModal").modal("close");
              //       this.spinner.hide();
              //     }
              //   );

            } else {
              Materialize.toast("no sharable video available", 3000);
              this.spinner.hide();
            }
          } else {
            this.spinner.hide();
          }
        },
        (err) => {
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

  introduceUser(){
    if(this.recipientName == ""){
      Materialize.toast("Please fill recipient name", 800, "res");
    }else if(this.recipientEmail == ""){
      Materialize.toast("Please fill email field", 800, "res");
    }else{
      this.candidateNameIs = this.shareResume.resumeType ? this.shareResume.candidateName : this.shareResume.candidate_id.fullName;
      this.comment1 = this.shareResume.comments;
      this.comment2 = this.shareResume.comment2;
      this.comment3 = this.shareResume.comment3;
      jQuery("#shareEmailModal").modal("close");
      jQuery("#emaiPreviewModal").modal("open");
    }
  }

  ngOnDestroy() {
    this._socket.removeListener({ type: this._constants.sharedProfileType });
    this.sharedProfileObserver.unsubscribe();
  }
}
