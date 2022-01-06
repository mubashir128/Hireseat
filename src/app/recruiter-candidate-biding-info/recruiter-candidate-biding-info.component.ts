import {
  Component,
  OnInit,
  OnChanges,
  OnDestroy,
  Input,
} from "@angular/core";
import {
  FormBuilder,
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
  map,
  filter,
  debounceTime,
  distinctUntilChanged,
  tap,
} from "rxjs/operators";
import { fromEvent } from "rxjs";
import { SubscriberslistService } from "src/app/_services/subscriberslist.service";
import { ConstantsService } from "src/app/_services/constants.service";
import { IBiddingEvent } from "../models/bidding-event";
import { AbstractSharedComponent } from "../abstract-classes/abstract-shared.component";
import { MatDialog } from "@angular/material/dialog";
import { ReadResumeService } from "../_services/read-resume.service";
import { BiddingEventService } from "../_services/bidding-event.service";

declare var jQuery;
declare var Materialize;
@Component({
  selector: "app-recruiter-candidate-biding-info",
  templateUrl: "./recruiter-candidate-biding-info.component.html",
  styleUrls: ["./recruiter-candidate-biding-info.component.css"],
})
export class RecruiterCandidateBidingInfoComponent extends AbstractSharedComponent
  implements OnInit, OnChanges, OnDestroy {

  // observer
  sharedRecruiterProfileType = new Subject();
  sharedRecruiterProfileType$ = this.sharedRecruiterProfileType.asObservable();

  @Input() public biddingEvent: IBiddingEvent;

  skillsClass = "fas fa-long-arrow-alt-down";
  skillsShow = false;

  constructor(
    protected resumeService: ResumeService,
    protected sanitizer: DomSanitizer,
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
    protected dialog: MatDialog
  ){
    super(dialog, shareVideoService, userService, formBuilder, _bidEventService, sanitizer, candidateService, _readResume, resumeService, _subList, spinner, videoCallingService);

    shareVideoService._sharableResumeRecruiter.subscribe((res) => {
      this.shareResume = res;
    });
  }

  ngOnChanges() {
    this.setModel();
  }

  async ngOnInit() {
    this.setModel();

    await this._socket.removeListener({ type: this._constants.sharedRecruiterProfileType });
    this._socket.addListener({
      type: this._constants.sharedRecruiterProfileType,
      callback: this.sharedRecruiterProfileType,
    });

    this.sharedRecruiterProfileType$.subscribe((res: any) => {
      this.handleProfileData(res);
    });

    this.myProfile();
  }

  handleProfileData(res: any) {
    switch (res.subType) {
      case this._constants.getAllSharedProfiles:
        this.resumes = res.data;
        break;
      case this._constants.likeComment:
        this.addLikeToComment(res);
        break;
      case this._constants.replyComment:
        this.addReplyToComment(res);
        break;
      case this._constants.deleteComment:
        this.deleteRespectedComment(res);
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
    this.getProfileSubscription = this.candidateService
      .getCandidateIndustries()
      .subscribe((res) => {
        if (res) {
          this.industriesAre = res.industries;
        }
      });
  }

  addCommentToCommets(res) {
    this.resumes.filter((element) => {
      if (element._id === res.profileId) {
        element.comments.length !== 0 ? element.comments.unshift(res.data) : element.comments.push(res.data);
      }
    });
  }

  addLikeToComment(res) {
    this.resumes.filter((element) => {
      if (element._id === res.profileId) {
        element.comments.filter((comment) => {
          if (comment._id === res.data._id) {
            comment.like.push(res.data);
          }
        });
      }
    });
  }

  addReplyToComment(res) {
    this.resumes.filter((element) => {
      if (element._id === res.profileId) {
        element.comments.filter((comment) => {
          if(comment._id === res.data._id){
            comment.reply.length !== 0 ? comment.reply.unshift(res.data.replyComment) : comment.reply.push(res.data.replyComment);
          }
        });
      }
    });
  }

  disabledDay(date) {}

  searchTermByName() {
    fromEvent(this.searchByName.nativeElement, "keyup")
      .pipe(
        map((event) => event),
        filter(Boolean),
        debounceTime(800),
        distinctUntilChanged(),
        tap((text) => {
          let obj = {
            searchType: "name",
            searchTerm: this.searchTerm,
          };

          // this.getAllSharedResumes(obj);
        })
      )
      .subscribe();
  }

  editComment(cmt, resume) {
    if (this.editTo === cmt.review) {
      Materialize.toast("No change!");
    }else{
      const payload = {
        oldCmt: {
          review: cmt.review,
          _id: cmt._id,
        },
        newCmt: {
          review: this.editTo,
        },
        resumeId: resume._id,
      };

      this.editCommentSucription = this.resumeService.editRecruiterComment(payload).subscribe((res) => {
          if(res){
            this.editRespectedComment(res);
            this.cancelEdit(cmt);
          }
        }, (err) => {
        Materialize.toast("Something went wrong!");
      });
    }
  }

  editRespectedComment(res) {
    this.resumes.filter((element) => {
      if (element._id === res.profileId) {
        element.comments.forEach((item, index) => {
          if (item._id === res.data.cmtId) {
            item.review = res.data.review;
          }
        });
      }
    });
  }

  ngAfterViewInit() {
    this.videoSet();
  }

  // share process
  showShareModal(resume) {
    jQuery("#shareEmailModal").modal("open");
    this.shareVideoService.setResume(resume);
  }

  closeShareModal() {
    jQuery("#shareEmailModal").modal("close");
  }

  async share() {
    jQuery("#shareEmailModal").modal("close");
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
                recipientEmail: this.recipientEmail,
                cc: this.cc,
                bcc: this.bcc,
                videoUrl: this.shareableVideoURL,
                fullName: candidateName,
                subject: subject,
                comment: this.shareResume.comments,
                candidateProfile: this.shareResume.resumeType ? false : true,
              };

              let userInfo = JSON.parse(localStorage.getItem("currentUser"))
                .userInfo;
              this._socket.sendMessage({
                type: this._constants.sharedProfileType,
                data: {
                  type: userInfo.userRole,
                  payload: payload,
                  subType: "shareVideoViaRecruiterEmail",
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

  myProfile() {
    this.getProfileSubscription = this.candidateService.getRecruiterCandidateBids(this.biddingEvent.$key).subscribe((res) => {
      this.resumes = res;
    });
  }

  openResume(url){
    window.open(url, "_blank");
  }

  upDownSkills(){
    this.skillsShow = this.skillsShow ? false : true;
    this.skillsClass = this.skillsShow ? "fas fa-long-arrow-alt-up" : "fas fa-long-arrow-alt-down";
  }

  setCurrentTimeEvent(obj){
    this.setCurrentTime(obj.seconds , obj.questionNumber);
  }
  
  ngOnDestroy() {
    this._socket.removeListener({ type: this._constants.sharedProfileType });
    this.sharedRecruiterProfileType.unsubscribe();
  }
}
