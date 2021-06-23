import {
  Component,
  OnInit,
  OnChanges,
  ViewChild,
  ElementRef,
  OnDestroy,
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
import { ConstantsService } from "src/app/_services/constants.service"
import { BiddingEventService } from "src/app/_services/bidding-event.service";
import { Plugins } from '@capacitor/core';
const { Share } = Plugins;

declare var jQuery;
declare var $: any;
declare var Materialize;
@Component({
  selector: "app-multi-shared-candidate-profile",
  templateUrl: "./multi-shared-candidate-profile.component.html",
  styleUrls: ["./multi-shared-candidate-profile.component.css"],
})
export class MultiSharedCandidateProfileComponent implements OnInit, OnChanges, OnDestroy {

  @ViewChild("playVideo") videojsPlay: ElementRef;
  @ViewChild("searchByName", { static: true }) searchByName: ElementRef;

  // observer
  multiSharedProfileObserver = new Subject();
  multiSharedProfileObserver$ = this.multiSharedProfileObserver.asObservable();

  player: videojs.Player;
  canComment = false;
  public today = new Date();

  // subscription
  getVideoURLSubscription: Subscription;
  getAllSharedCandidateProfileSubscription: Subscription;
  getArchivedVideoSubscription: Subscription;
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
  recipientEmail: any;
  cc: any;
  bcc: any;
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

  skillsClass = "fas fa-long-arrow-alt-down";
  skillsShow = false;

  createdUrl = "";
  generateLink = true;

  topRecruiters = [];
  allTopRecruiters = [];
  searchTermByNameIs;
  public auctionFrm: FormGroup;
  finalRecruitersAre = [];
  @ViewChild('searchInputTerm') searchInputTerm : ElementRef;

  currentUserRole : any;

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
    private _bidEventService: BiddingEventService
  ) {
    this.resumes = [];
    this.Search = this.formBuilder.group({
      tags: ["", Validators.required],
      searchTerm: [""],
    });

    this.Search.get("searchTerm").valueChanges.pipe(debounceTime(800)).subscribe((res) => {
      if (res) {
        let obj = {
          searchType: "name",
          searchTerm: res,
        };
        this.getAllSharedResumes(obj);
      }
    });

    this.myComment = [];
    this.replyToComment = [];
    this.loggedUser = this.userService.getUserData();
    this.currentUserRole = (this.loggedUser.userRole == 'recruiter') ? 'Recruiters' : 'Employers';

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

    this.auctionFrm = this.formBuilder.group({
      searchTermByNameIs : []
    });

    await this._socket.removeListener({ type: this._constants.sharedProfileType });
    this._socket.addListener({
      type: this._constants.sharedProfileType,
      callback: this.multiSharedProfileObserver,
    });

    this.getTopRecruiterList();
    this.getIndustries();
    this.getProfiles();

    this.multiSharedProfileObserver$.subscribe((res: any) => {
      this.handleProfileData(res);
    });

  }

  getTopRecruiterList(){
    this._bidEventService.getTopRecruiterList({userRole : this.loggedUser.userRole}).subscribe(res=>{
      this.topRecruiters = res;
      this.allTopRecruiters = this.topRecruiters;
    },err=>{
      console.log(err);
    });
  }

  async handleProfileData(res: any) {
    switch (res.subType) {
      case this._constants.getAllMultiSharedProfiles:
        this.resumes = res.data;
        let rs = await this.getReverseUniqueResumeIds(res.result);
        
        this._subList.loaderList.next({type : "0"});
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

  async addCreatedLink(res) {
    this.generateLink = false;
    this.createdUrl = res.result.link;

    this.copyLink();

    let shareRet = await Share.share({
      // title: 'See cool stuff',
      // text: 'Really awesome thing you need to see right meow',
      url: this.createdUrl,
      dialogTitle: 'Share with'
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

  addCommentToCommets(res) {
    this.resumes.filter((element) => {
      if (element._id === res.profileId) {
        element.canReview.length !== 0 ? element.canReview.unshift(res.data) : element.canReview.push(res.data);
      }
    });
  }

  addLikeToComment(res) {
    this.resumes.filter((element) => {
      if (element._id === res.profileId) {
        element.canReview.filter((comment) => {
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
        element.canReview.filter((comment) => {
          if (comment._id === res.data._id) {
            comment.reply.length !== 0 ? comment.reply.unshift(res.data.replyComment) : comment.reply.push(res.data.replyComment);
          }
        });
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

          this.getAllSharedResumes(obj);
        })
      )
      .subscribe();
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
        isMultiShare : true
      };

      this.postCommentSubscription = this.resumeService
        .postMyComment(payload)
        .subscribe(
          (res) => {
            if (res) {
              this.addCommentToCommets(res.detailedCommentObj);

              if (this.loggedUser.userRole == "recruiter") {
                Materialize.toast("You gained 100 recruiter karma points", 2000, "red");
              }else if (this.loggedUser.userRole == "employer"){
                Materialize.toast("You just helped someone....and changed someones life...good job!", 2000, "red");
              }

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
    let candidateProfile;
    resume?.resumeType ? (candidateProfile = false) : (candidateProfile = true);

    const payload = {
      recruiterId: cmt.recruiterId._id,
      cmtId: cmt._id,
      candidateProfile: candidateProfile,
      resumeId: resume._id,
    };

    this.likeCommetSubscription = this.resumeService
      .likeComment(payload)
      .subscribe(
        (res) => {
          if (res) {
            Materialize.toast(
              "You just gave recruiter a 50 Karma points!",
              5000,
              "red"
            );
            this.addLikeToComment(res);
          }
        },
        (err) => {
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

  editRespectedComment(res) {
    this.resumes.filter((element) => {
      if (element._id === res.profileId) {
        element.canReview.forEach((item, index) => {
          if (item._id === res.data.cmtId) {
            item.review = res.data.review;
          }
        });
      }
    });
  }

  deleteComment(cmt, resume) {
    let candidateProfile;
    resume?.resumeType ? (candidateProfile = false) : (candidateProfile = true);

    const payload = {
      resumeId: resume._id,
      cmtId: cmt._id,
      candidateProfile,
    };
    this.deleteCommentSucription = this.resumeService
      .deleteComment(payload)
      .subscribe(
        (res) => {
          if (res) {
            this.deleteRespectedComment(res);
          }
        },
        (err) => { }
      );
  }

  deleteRespectedComment(res) {
    this.resumes.filter((element) => {
      if (element._id === res.profileId) {
        element.canReview.forEach((item, index) => {
          if (item._id === res.data.cmtId) {
            element.canReview.splice(index, 1);
          }
        });
      }
    });
  }

  replyToThisComment(i, comment, resume, cmtId) {
    let candidateProfile;
    resume?.resumeType ? (candidateProfile = false) : (candidateProfile = true);
    const payload = {
      resumeId: resume._id,
      cmtId: cmtId,
      candidateProfile: candidateProfile,
      replyComment: comment,
      isMultiShare : true
    };

    this.replyTocommentSubscription = this.resumeService
      .replyToComment(payload)
      .subscribe(
        (res) => {
          if (res) {
            this.replyToComment[i] = "";
            this.addReplyToComment(res);
          }
        },
        (err) => { }
      );
  }

  ngAfterViewInit() {
    // server side search
    // this.searchTermByName();

    // instantiate Video.js
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

    // server-side search
    fromEvent(this.searchInputTerm.nativeElement,'keyup')
    .pipe(
      map(event=>event),
      filter(Boolean),
      debounceTime(1000),
      distinctUntilChanged(),
      tap((text) => {
        this.getRecruiterList({
          searchTerm : this.searchTermByNameIs,
          userRole : this.loggedUser.userRole
        });

      })
    ).subscribe();

  }

  getRecruiterList(obj){
    if(obj.searchTerm === '' || obj.searchTerm === undefined){
      this.topRecruiters = this.allTopRecruiters;
      return ;
    }

    this._bidEventService.getRecruiterList(obj).subscribe(res=>{
      jQuery(".searchData").scrollTop(0);
      if(res.length !== 0 ){
        this.topRecruiters = res;
      }else{
        this.topRecruiters = this.allTopRecruiters;
      }
    },err=>{
      console.log(err);
    });
  }

  getAllSharedResumes(payload) {
    this.getAllSharedCandidateProfileSubscription = this.resumeService.getAllSharedCandidateProfile(payload).subscribe((res) => {
        if (res) {
          this.resumes = res;
          console.log(this.resumes);
        }
      },
      (err) => {

      });
  }

  getVideo(payload) {
    this.getVideoURLSubscription = this.videoCallingService.getArchivedVideo(payload).subscribe((url) => {
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
  showShareModal(resume) {
    this.generateLink = true;
    jQuery("#shareEmailModal").modal("open");
    this.shareVideoService.setResume(resume);
  }

  closeShareModal() {
    jQuery("#shareEmailModal").modal("close");
  }

  showShareTouserModal(resume) {
    this.closeShareModal();
    jQuery("#shareToUsers").modal("open");
  }

  closeShareToUserModal() {
    jQuery("#shareToUsers").modal("close");
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

    this.closeShareModal();
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

  async share() {
    var EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!EMAIL_REGEXP.test(this.recipientEmail)) {
      Materialize.toast("Invalid email", 800);
      return;
    }

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
    // got url
  }

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
  openSelectDatesModal() {
    jQuery("#selectDates").modal("open");
  }

  closeSelectDatesModal() {
    jQuery("#selectDates").modal("close");
  }

  openRecruiterModal(recruiterId) {
    jQuery("#showRecruiterModal").modal("open");
    const payload = {
      recruiterId,
    };

    this.getRecruiterPostedProfileSubscription = this.candidateService.getPostedRecruiter(payload).subscribe(
      (res) => {
        this.selectedCoachingRecruiter = res[0];
      },
      (err) => {
        console.log(err);
      });
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
    this.availableTime = [];
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
  onLinkedIn(link: string) {

    if (link.includes("https")) {
      console.log("includes https");

      window.open(link, "_blank");
    } else {
      console.log("includes nothing");

      window.open("https://" + link, "_blank");
    }
  }

  selectionChanged(event) {
    console.log(event);
  }

  myProfile() {
    this.getProfileSubscription = this.candidateService.getCandidateProfile().subscribe((res) => {
      this.myProfileContent = res;
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
              // console.log(res);
              // Materialize.toast("Recruiter has been notified!", 2000);
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

  handleIndustries($event, _id) {
    let selectIndex = 0;
    this.industriesAre.forEach((item, index) => {
      if (item._id === _id) {
        selectIndex = index;
      }
    });

    if ($event.target.checked) {
      this.industries.push(this.industriesAre[selectIndex]._id);
    } else {
      this.industries.forEach((Id, index) => {
        if (Id === _id) {
          this.industries.splice(index, 1);
        }
      });
    }

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

  upDownSkills() {
    this.skillsShow = this.skillsShow ? false : true;
    this.skillsClass = this.skillsShow ? "fas fa-long-arrow-alt-up" : "fas fa-long-arrow-alt-down";
  }

  handleTopSelected($event,type){
    if($event.target.checked){
      this.finalRecruitersAre.push($event.target.name);
    }else{
      this.finalRecruitersAre.map((item, index)=>{
        if(item === $event.target.name){
          this.finalRecruitersAre.splice(index, 1);
        }
      });
    }
  }

  shareToUsers(){
    jQuery("#shareToUsers").modal("close");

    if(this.finalRecruitersAre.length === 0){
      return ;
    }

    let payload = {
      sharedFrom : this.loggedUser._id,
      sharedTo : this.finalRecruitersAre,
      resumeId : this.shareResume._id,
      candidateProfile: this.shareResume.resumeType ? false : true,
      isMultiShare : true
    }

    this.shareWithRecruiterSubscription = this.candidateService.shareWithUsers(payload).subscribe((res) => {
      Materialize.toast("Shared successfully", 1000);
    }, (err) => {
      console.log(err);
      Materialize.toast("Something went wrong!", 1000);
    });
  }

  ngOnDestroy() {
    this._socket.removeListener({ type: this._constants.sharedProfileType });
    this.multiSharedProfileObserver.unsubscribe();
  }
}