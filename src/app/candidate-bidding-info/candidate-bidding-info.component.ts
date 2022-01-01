import { IBiddingEvent } from '../models/bidding-event';
import {
  Component,
  OnInit,
  OnChanges,
  ViewChild,
  ElementRef,
  OnDestroy,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import {
  FormBuilder,
  FormControl,
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
import { SubscriberslistService } from "src/app/_services/subscriberslist.service";
import { ConstantsService } from "src/app/_services/constants.service";
import { BidService } from '../_services/bid.service';
import { AbstractSharedComponent } from '../abstract-classes/abstract-shared.component';
import { MatDialog } from '@angular/material/dialog';
import { ReadResumeService } from '../_services/read-resume.service';
import { BiddingEventService } from '../_services/bidding-event.service';

declare var jQuery;
declare var Materialize;
@Component({
  selector: 'app-candidate-bidding-info',
  templateUrl: './candidate-bidding-info.component.html',
  styleUrls: ['./candidate-bidding-info.component.css']
})
export class CandidateBiddingInfoComponent extends AbstractSharedComponent implements OnInit, OnChanges, OnDestroy {
  bid: any;
  isSubmited:boolean = false;
  @Input() public biddingEvent: IBiddingEvent;

  @Output() ResumeCount: EventEmitter<any> = new EventEmitter<any>();

  // observer
  sharedCandidateProfileType = new Subject();
  sharedCandidateProfileType$ = this.sharedCandidateProfileType.asObservable();

  constructor(
    protected resumeService: ResumeService,
    protected sanitizer: DomSanitizer,
    protected videoCallingService: VideoCallingService,
    protected userService: UserService,
    protected spinner: NgxSpinnerService,
    private shareVideoService: ShareVideoService,
    protected formBuilder: FormBuilder,
    private _socket: WebsocketService,
    protected candidateService: CandidateService,
    protected _subList: SubscriberslistService,
    private _constants: ConstantsService,
    private bidService: BidService,
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
    
    await this._socket.removeListener({ type: this._constants.sharedCandidateProfileType });
    this._socket.addListener({
      type: this._constants.sharedCandidateProfileType,
      callback: this.sharedCandidateProfileType,
    });
    
    this.sharedCandidateProfileType$.subscribe((res: any) => {
      this.handleProfileData(res);
    });
    
    this.getProfiles();
  }
  
  submitResume(resume){
      let recruiterKey : any = this.biddingEvent.employerKey;
      this.bid = {
        biddingEventKey: this.biddingEvent.$key,
        candidateName: resume.candidate_id.fullName,
        candidateKey: resume._id,
        recruiterKey: recruiterKey._id,
        resumeKey: resume._id,
        shortlisted: false,
        status: "pending",
      }
   
      this.spinner.show();  
      this.bidService.createCandidateBid(this.bid).subscribe((data: any) => {
        if (data) {
          this.myProfile();
          this.ResumeCount.emit(1);
          Materialize.toast('Candidate submitted successfully! !', 4000);
        } else {
          Materialize.toast('Something Went Wrong!', 4000);
        }
        this.spinner.hide();
      },
        (error) => {
          console.log(error);
          this.spinner.hide();
          Materialize.toast('Something Went Wrong!', 4000);
        });
  }

  handleProfileData(res: any) {
    switch (res.subType) {
      case this._constants.getAllSharedProfiles:
        this.resumes = res.data;
        break;
      case this._constants.addComment:
        this.addCommentToCommets(res);
        break;
      case this._constants.editComment :
        this.editRespectedComment(res);
        break;
      default:
        break;
    }
  }
  
  addCommentToCommets(res) {
    if(this.resume.biddingEvent._id === res.profileId){
      this.resume.comments.length !==0 ? this.resume.comments.unshift(res.data) : this.resume.comments.push(res.data);
    }
  }

  addLikeToComment(res) {
    this.resume.comments.forEach((item, index) => {
      if(item._id === res.data._id){
        item.like.push(res.data);
      }
    });
  }

  addReplyToComment(res){
    this.resume.comments.forEach((item, index) => {
      if(item._id === res.data._id){
        item.reply.length !== 0 ? item.reply.unshift(res.data.replyComment) : item.reply.push(res.data.replyComment);
      }
    });
  }

  getProfiles() {
    if (this.loggedUser.userRole === "candidate") {
      this.myProfile();
    }
  }

  likeThisCommet(cmt, resume) {
    const payload = {
      recruiterId: cmt.recruiterId._id,
      cmtId: cmt._id,
      resumeId: resume._id,
    };

    this.likeCommetSubscription = this.resumeService
      .likeRecruiterComment(payload)
      .subscribe(
        (res) => {
          if(res){
            Materialize.toast("You just gave recruiter a 50 Karma points!", 5000, "red");
            this.addLikeToComment(res);
          }
        }, (err)=>{
          Materialize.toast("The post is already liked!", 5000, "red");
        }
      );
  }

  editComment(cmt, resume) {
    if (this.editTo === cmt.review) {
      Materialize.toast("No change!");
    } else {
      let candidateProfile;
      resume?.resumeType
        ? (candidateProfile = false)
        : (candidateProfile = true);

      const payload = {
        oldCmt: {
          review: cmt.review,
          _id: cmt._id,
        },
        newCmt: {
          review: this.editTo,
        },
        resumeId: resume._id,
        candidateProfile,
      };
      this.editCommentSucription = this.resumeService
        .editComment(payload)
        .subscribe(
          (res) => {
            if (res) {
              this.editRespectedComment(res);
              this.cancelEdit(cmt);
            }
          },
          (err) => {
            Materialize.toast("Something went wrong!");
          }
        );
    }
  }

  editRespectedComment(res){
    this.resume.comments.forEach((item, index) => {
      if(item._id === res.data.cmtId){
        item.review = res.data.review;
      }
    });
  }

  replyToThisComment(i, comment, resume, cmtId) {
    const payload = {
      resumeId: resume._id,
      cmtId: cmtId,
      replyComment: comment,
    };

    this.replyTocommentSubscription = this.resumeService
      .replyCandidateToComment(payload)
      .subscribe(
        (res) => {
          if (res) {
            this.replyToComment[i] = "";
            this.addReplyToComment(res);
          }
        },
        (err) => {}
      );
  }

  ngAfterViewInit() {
    this.videoSet();
  }

  // async share() {
  //   jQuery("#shareEmailModal").modal("close");
  //   this.spinner.show();

  //   const candidateName = this.shareResume.resumeType
  //     ? this.shareResume.candidateName
  //     : this.shareResume.candidate_id.fullName;
  //   const subject =
  //     "Hireseat" +
  //     " - " +
  //     this.loggedUser.companyName +
  //     " - " +
  //     this.shareResume.jobTitle +
  //     " - " +
  //     candidateName +
  //     " Profile.";

  //   const archiveIdPayload = {
  //     archivedId: this.shareResume.interviewLinkedByRecruiter,
  //   };

  //   // getting url
  //   this.getArchivedVideoSubscription = this.videoCallingService
  //     .getArchivedVideo(archiveIdPayload)
  //     .subscribe(
  //       (res) => {
  //         if (res) {
  //           this.shareableVideoURL = res.url;

  //           this.spinner.hide();
  //           if (this.shareableVideoURL) {
  //             const payload = {
  //               recruiterId: this.loggedUser._id,
  //               resumeId: this.shareResume._id,
  //               recipientEmail: this.recipientEmail,
  //               cc: this.cc,
  //               bcc: this.bcc,
  //               videoUrl: this.shareableVideoURL,
  //               fullName: candidateName,
  //               subject: subject,
  //               comment: this.shareResume.comments,
  //               candidateProfile: this.shareResume.resumeType ? false : true,
  //             };

  //             let userInfo = JSON.parse(localStorage.getItem("currentUser")).userInfo;
  //             this._socket.sendMessage({
  //               type: this._constants.sharedProfileType,
  //               data: {
  //                 type: userInfo.userRole,
  //                 payload : payload,
  //                 subType: "shareVideoViaRecruiterEmail"
  //               },
  //             });                
  //           }else{
  //             Materialize.toast("no sharable video available", 3000);
  //             this.spinner.hide();
  //           }
  //         }else{
  //           this.spinner.hide();
  //         }
  //       },
  //       (err) => {
  //         this.spinner.hide();
  //         return false;
  //       }
  //     );
  // }

  myProfile() {
    this.getProfileSubscription = this.candidateService
      .getCandidateProfileBid(this.biddingEvent.$key)
      .subscribe((res) => {
        this.isSubmited = res.isSubmited;
        this.resume = res.candidateKey;
        this.resume.commentsAre = res.candidateKey.comments;
        this.resume.comments = res.biddingEvent.comments;
        this.resume.recruiterKey = res.biddingEvent.recruiterKey;
        this.resume.biddingEvent = res.biddingEvent;
      });
         
  }

  handleIndustries($event, _id){
    let selectIndex = 0;
    this.industriesAre.forEach((item, index)=>{
      if(item._id ===_id){
        selectIndex = index;
      }
    });

    if($event.target.checked){
      this.industries.push(this.industriesAre[selectIndex]._id);
    }else{
      this.industries.forEach((Id, index)=>{
        if(Id ===_id){
          this.industries.splice(index, 1);
        }
      });
    }

  }

  setCurrentTimeEvent(obj){
    this.setCurrentTime(obj.seconds , obj.questionNumber);
  }

  ngOnDestroy() {
    this._socket.removeListener({ type: this._constants.sharedProfileType });
    this.sharedCandidateProfileType.unsubscribe();
  }
}


