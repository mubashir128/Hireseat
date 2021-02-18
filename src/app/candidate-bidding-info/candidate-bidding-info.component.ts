import { IBiddingEvent } from '../models/bidding-event';
import {
  Component,
  OnInit,
  OnChanges,
  ViewChild,
  ElementRef,
  OnDestroy,
  Input,
} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { NgxSpinnerService } from "ngx-spinner";
import { Subject, Subscription } from "rxjs";
import { ResumeService } from "src/app/_services/resume.service";
import { ShareVideoService } from "src/app/_services/share-video.service";
import { UserService } from "src/app/_services/user.service";
import { VideoCallingService } from "src/app/_services/video-calling.service";
import { WebsocketService } from "src/app/_services/websocket.service";
import videojs from "video.js";
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
import { BidService } from '../_services/bid.service';
import { IBid } from '../models/bid';

declare var jQuery;
declare var $: any;
declare var Materialize;
@Component({
  selector: 'app-candidate-bidding-info',
  templateUrl: './candidate-bidding-info.component.html',
  styleUrls: ['./candidate-bidding-info.component.css']
})
export class CandidateBiddingInfoComponent implements OnInit, OnChanges, OnDestroy {
  bid: any;
  isSubmited:boolean = false;
  @Input() public biddingEvent: IBiddingEvent;

  
  @ViewChild("playVideo") videojsPlay: ElementRef;
  @ViewChild("searchByName", { static: true }) searchByName: ElementRef;

  // observer
  sharedCandidateProfileType = new Subject();
  sharedCandidateProfileType$ = this.sharedCandidateProfileType.asObservable();

  player: videojs.Player;
  canComment = false;
  public today = new Date();

  // subscription
  getVideoURLSubscription: Subscription;
  getAllSharedCandidateProfileSubscription: Subscription;
  // getArchivedVideoSubscription: Subscription;
  shareVideoSubscription: Subscription;
  getMyPostedProfilesSubscription: Subscription;
  postCommentSubscription: Subscription;
  deleteCommentSucription: Subscription;
  getProfileSubscription: Subscription;
  shareWithRecruiterSubscription: Subscription;
  requestCoachingSubscription: Subscription;
  getRecruiterPostedProfileSubscription: Subscription;

  // subject
  refresh: Subject<any> = new Subject();

  // form group
  QuestionsGroup: FormGroup;
  Search: FormGroup;
  requestDatesForm: FormGroup;
  // pagination
  p = 1;
  searchTerm: any;
  resumes = [];
  resume: any;
  show: any;
  editTextIndex: any;
  loggedUser: any;
  // recipientEmail: any;
  // cc: any;
  // bcc: any;
  shareableVideoURL: any;
  shareResume: any;
  videoURL: any;
  questionNumber: any;
  options: any;
  questionsByRecruiter: any;
  recruiterReview: any;
  showCmts: any;
  myComment: any;
  replyToComment: any;
  editTo: any;
  editCommentSucription: Subscription;
  selectedCoachingRecruiter = [{}];
  availableTime: any[];
  payload: {
    recipientEmail: string;
    candidateFullName: any;
    candidatePhoneNo: any;
    recruiterFullName: any;
    subject: string;
  };
  availableDetails: any;
  dayToBeAvailable: any;
  disableDay: any;
  daysArray: any;
  myProfileContent: any;
  likeCommetSubscription: Subscription;
  replyTocommentSubscription: Subscription;

  industriesAre = [];
  industries = [];

  constructor(
    private resumeService: ResumeService,
    private sanitizer: DomSanitizer,
    private videoCallingService: VideoCallingService,
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private shareVideoService: ShareVideoService,
    private formBuilder: FormBuilder,
    private _socket: WebsocketService,
    private candidateService: CandidateService,
    private _subList: SubscriberslistService,
    private _constants: ConstantsService,
    private bidService: BidService,

  ){
    this.resumes = [];
    this.myComment = [];
    this.replyToComment = [];
    this.loggedUser = this.userService.getUserData();

    shareVideoService._sharableResumeRecruiter.subscribe((res) => {
      this.shareResume = res;
    });

    this.QuestionsGroup = this.formBuilder.group({
      question1: new FormControl(null, [Validators.max(100)]),
      timeStamp1: new FormControl(null),

      question2: new FormControl(null, [Validators.max(100)]),
      timeStamp2: new FormControl(null),

      question3: new FormControl(null, [Validators.max(100)]),
      timeStamp3: new FormControl(null),

      question4: new FormControl(null, [Validators.max(100)]),
      timeStamp4: new FormControl(null),

      question5: new FormControl(null, [Validators.max(100)]),
      timeStamp5: new FormControl(null),
    });

    this.requestDatesForm = this.formBuilder.group({
      date1: new FormControl(null, Validators.compose([Validators.required])),
      time1: new FormControl(null, Validators.compose([Validators.required])),
      date2: new FormControl(null, Validators.compose([Validators.required])),
      time2: new FormControl(null, Validators.compose([Validators.required])),
      date3: new FormControl(null, Validators.compose([Validators.required])),
      time3: new FormControl(null, Validators.compose([Validators.required])),
    });
  }

  ngOnChanges() {
    jQuery(".modal").modal();
    jQuery("select").material_select();
  }

  async ngOnInit() {
    jQuery(".modal").modal();
    jQuery("select").material_select();
    
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

  getUsersProfile() {
    this.userService
      .getUserProfile(this.userService.getUserData().userRole)
      .subscribe(
        (data: any) => {
          if (data != null && data != undefined && data != "") {
            this.userService.setUserProfile(data.res);
          } else {
            Materialize.toast("Something went wrong", 1000);
          }
          this.spinner.hide();
        },
        (error) => {
          console.log(error);
          this.spinner.hide();
        }
      );
  }

  postMycmt(i, cmt, resume) {
    if (
      this.myComment[i] === "" ||
      this.myComment[i] === null ||
      this.myComment[i] === undefined
    ) {
      Materialize.toast("Comment box is empty!");
    } else {
      const payload = {
        resumeId: resume._id,
        review: cmt,
        role: "recruiter",
      };

      this.postCommentSubscription = this.resumeService
        .postMyComment(payload)
        .subscribe(
          (res) => {
            if (res) {
              this.addCommentToCommets(res.detailedCommentObj);
              Materialize.toast(
                "You gained 100 recruiter karma points",
                4000,
                "red"
              );

              let candidateObj = {
                pointer: "advicePoints",
                subType: "divide",
                increseCount: res.points.advicePoints,
              };
              this.userService.candidateProfileObservable.next(candidateObj);

              this._subList.recruiterPoints.next(candidateObj);

              this.myComment[i] = "";
            }
          },
          (err) => {
            Materialize.toast("Unable to post!", 5000);
          }
        );
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

  edit(cmt) {
    this.editTo = cmt.review;
    if (this.editTextIndex === cmt._id) {
      this.editTextIndex = -1;
    } else {
      this.editTextIndex = cmt._id;
    }
  }

  cancelEdit(cmt) {
    this.editTo = "";
    if (this.editTextIndex === cmt._id) {
      this.editTextIndex = -1;
    }
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
    if (this.videoURL) {
      this.player = videojs(
        this.videojsPlay.nativeElement,
        {
          autoplay: true,
          controlls: true,
        },
        () => {
          // console.log('onPlayerReady', this);
        }
      );
    }
  }

  getVideo(payload) {
    this.getVideoURLSubscription = this.videoCallingService
      .getArchivedVideo(payload)
      .subscribe((url) => {
        if (url) {
          window.open(url.url);
        } else {
          Materialize.toast("unable to load url", 3000);
        }
      });
  }

  linkedIn(url) {
    window.open(url, "_blank");
  }

  // share process
  // showShareModal(resume) {
  //   jQuery("#shareEmailModal").modal("open");
  //   this.shareVideoService.setResume(resume);
  // }

  // closeShareModal() {
  //   jQuery("#shareEmailModal").modal("close");
  // }

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

  // END share process
  toggleAccordian(index, event, resume) {
    if (this.show === index) {
      this.show = -1;
    } else {
      this.show = index;
      if (resume.recordedId) {
        console.log("has recorded id");

        this.viewVideo(resume["recordedId"]);
      } else {
        if (resume["interviewLinkedByRecruiter"]) {
          this.viewVideo(resume["interviewLinkedByRecruiter"]);
        }
        this.recruiterReview = resume["recruiterReview"];
        this.questionsByRecruiter = resume["questionsByRecruiter"][0];
        // setting up values for QuestionsGroup
        if (this.questionsByRecruiter) {
          this.QuestionsGroup.setValue({
            question1: this.questionsByRecruiter.question1,
            question2: this.questionsByRecruiter.question2,
            question3: this.questionsByRecruiter.question3,
            question4: this.questionsByRecruiter.question4,
            question5: this.questionsByRecruiter.question5,
            timeStamp1: this.questionsByRecruiter.timeStamp1,
            timeStamp2: this.questionsByRecruiter.timeStamp2,
            timeStamp3: this.questionsByRecruiter.timeStamp3,
            timeStamp4: this.questionsByRecruiter.timeStamp4,
            timeStamp5: this.questionsByRecruiter.timeStamp5,
          });
        }
      }
    }
    this.videoURL = "";
  }

  showComments(index, resume) {
    if (this.showCmts === index) {
      this.showCmts = -1;
    } else {
      this.showCmts = index;
    }
  }

  /**
   *
   * @param canReview return wheather logged in recruiter is allowed to comment or not
   */
  allowedToComment(canReview) {
    canReview.forEach((element) => {
      if (element.recruiterId === this.loggedUser._id) {
        this.canComment = true;
      }
    });
    if (this.canComment) {
      return true;
    } else {
      return false;
    }
  }
  
  viewVideo(archivedId) {
    this.videoURL = "";
    const payload = {
      archivedId: archivedId,
    };
    this.videoCallingService.getArchivedVideo(payload).subscribe((url) => {
      if (url) {
        this.videoURL = url.url;
      } else {
        console.log("unable to load url");
      }
    });
  }

  //
  setCurrentTime(seconds, questionNumber) {
    this.questionNumber = questionNumber;
    try {
      this.videojsPlay.nativeElement.currentTime = seconds;
    } catch (e) {
      console.log(e);
    }
  }

  // request recruiter process
  /**
   *  JQuery modals operations
   */
  // openSelectDatesModal() {
  //   jQuery("#selectDates").modal("open");
  // }

  // closeSelectDatesModal() {
  //   jQuery("#selectDates").modal("close");
  // }


  openRecruiterModal(recruiterId) {
    jQuery("#showRecruiterModal").modal("open");
    const payload = {
      recruiterId,
    };
    this.getRecruiterPostedProfileSubscription = this.candidateService
      .getPostedRecruiter(payload)
      .subscribe(
        (res) => {
          this.selectedCoachingRecruiter = res[0];
        },
        (err) => {
          console.log(err);
        }
      );
  }

  closeRecruiterModal() {
    jQuery("#showRecruiterModal").modal("close");
    this.selectedCoachingRecruiter = [{}];
  }
  
  /**
   *
   * @param recruiter open ups a modal for accepting dates from candidate
   */
  onReqCoaching(recruiter) {
    console.log("calling req", this.loggedUser);

    this.availableTime = [];
    // this.selectedRecruiter = recruiter;

    // contact@hireseat.com
    this.payload = {
      recipientEmail: "contact@hireseat.com",

      candidateFullName: this.loggedUser.fullName,
      candidatePhoneNo: this.loggedUser.phoneNo,
      recruiterFullName: recruiter.fullName,
      subject:
        this.loggedUser.fullName + " " + "Candidate request for coaching",
    };
    recruiter.refUserId.available.forEach((item) => {
      this.availableTime.push(item.from + "-" + item.to);
    });
    this.availableDetails = recruiter.refUserId.available;
    this.availableDetails.forEach((item, index) => {
      this.dayToBeAvailable.push(item.day.dayId);
    });
    this.disableDay = this.daysArray.filter(
      (val) => !this.dayToBeAvailable.includes(val)
    );

    this.reqCoachingFunction();
    this.closeRecruiterModal();
  }

  /**
   *
   * @param link opens a provided url in new window
   */
  // onLinkedIn(link: string) {
  //   if (link.includes("https")) {
  //     console.log("includes https");
  //     window.open(link, "_blank");
  //   } else {
  //     console.log("includes nothing");
  //     window.open("https://" + link, "_blank");
  //   }
  // }

  selectionChanged(event) {
    console.log(event);
  }

  myProfile() {
    this.getProfileSubscription = this.candidateService
      .getCandidateProfileBid(this.biddingEvent.$key)
      .subscribe((res) => {
        this.isSubmited = res.isSubmited;
        this.resume = res.candidateKey;
        this.resume.comments = res.biddingEvent.comments;
        this.resume.recruiterKey = res.biddingEvent.recruiterKey;
        this.resume.biddingEvent = res.biddingEvent;
      });
         
  }

  confirmSelectDatesEvent() {
    this.reqCoachingFunction();
    this.closeRecruiterModal();
  }

  reqCoachingFunction() {
    this.payload = {
      recipientEmail: "contact@hireseat.com",
      candidateFullName: this.loggedUser.fullName,
      candidatePhoneNo: this.loggedUser.phoneNo,
      recruiterFullName: this.selectedCoachingRecruiter["refUserId"].fullName,
      subject:
        this.loggedUser.fullName + " " + "Candidate request for coaching",
    };
    if (this.myProfileContent) {
      this.requestCoachingSubscription = this.candidateService
        .reqCoaching(this.payload)
        .subscribe(
          (res) => {
            if (res) {
              Materialize.toast("Recruiter will reach out to you!", 4000);

              this.onShareWithRecruiter(this.selectedCoachingRecruiter);
              this.spinner.hide();
            }
          },
          (err) => {
            Materialize.toast("Something Went Wrong !", 1000);
            this.spinner.hide();
          }
        );
    }
  }

  onShareWithRecruiter(recruiter) {
    this.spinner.show();
    Materialize.toast("Sharing your profile with the recruiter...", 4000);

    const payload = {
      recruiter_id: recruiter.refUserId._id,
      reqAvailableTime: this.requestDatesForm.value,
    };
    this.shareWithRecruiterSubscription = this.candidateService
      .sharewithRecruiter(payload)
      .subscribe(
        (res) => {
          if (res) {
            Materialize.toast(res.msg, 1000);
            this.spinner.hide();
          }
        },
        (err) => {
          console.log(err);
          Materialize.toast("Something went wrong!", 1000);
          this.spinner.hide();
        }
      );
  }

  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
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

  ngOnDestroy() {
    this._socket.removeListener({ type: this._constants.sharedProfileType });
    this.sharedCandidateProfileType.unsubscribe();
  }
}


