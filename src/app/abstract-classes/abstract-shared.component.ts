import { ElementRef, Injectable, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { fromEvent, Subject, Subscription } from "rxjs";
import { DialogEmailPreviewComponent } from "../shared/shared-components/components/dialog-email-preview/dialog-email-preview.component";
import { DialogEmailPreview2Component } from "../shared/shared-components/components/dialog-email-preview2/dialog-email-preview2.component";
import { DialogIntroduceComponent } from "../shared/shared-components/components/dialog-introduce/dialog-introduce.component";
import { DialogThanksLaterComponent } from "../shared/shared-components/components/dialog-thanks-later/dialog-thanks-later.component";
import { DiaplogOfferIntroEmailComponent } from "../shared/shared-components/components/diaplog-offer-intro-email/diaplog-offer-intro-email.component";
import { ShareVideoService } from "../_services/share-video.service";
import { UserService } from "../_services/user.service";
import videojs from "video.js";
import { BiddingEventService } from "../_services/bidding-event.service";
import { DomSanitizer } from "@angular/platform-browser";
import { CandidateService } from "../_services/candidate.service";
import { ReadResumeService } from "../_services/read-resume.service";
import { ResumeService } from "../_services/resume.service";
import { SubscriberslistService } from "../_services/subscriberslist.service";
import { NgxSpinnerService } from "ngx-spinner";
import { VideoCallingService } from "src/app/_services/video-calling.service";
import {
  map,
  filter,
  debounceTime,
  distinctUntilChanged,
  tap,
} from "rxjs/operators";
import { DialogShareToUsersComponent } from "../shared/shared-components/components/dialog-share-to-users/dialog-share-to-users.component";

declare var jQuery;
declare var Materialize;

@Injectable()
export abstract class AbstractSharedComponent{
  
  clients = [];
  linedIn = "";

  generateLink = true;
  createdUrl = "";

  shareResume: any;
  shareableVideoURL: any;

  @ViewChild("playVideo") videojsPlay: ElementRef;
  @ViewChild("searchByName", { static: true }) searchByName: ElementRef;

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
  Search: FormGroup;
  searchSkillsFrm: FormGroup;
  searchJobTitleFrm: FormGroup;
  requestDatesForm: FormGroup;
  QuestionsGroup: FormGroup;

  // pagination
  p = 1;
  itemsPerPage = 10;

  searchTerm = "";

  resumes = [];
  resume: any;
  show: any;
  editTextIndex: any;
  loggedUser: any;

  videoURL: any;
  questionNumber: any;
  options: any;
  questionsByRecruiter: any;
  recruiterReview: any;
  showCmts: any;
  myComment: any;
  myCommentNote: any;
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

  topRecruiters = [];
  allTopRecruiters = [];
  searchTermByNameIs;

  public auctionFrm: FormGroup;
  finalRecruitersAre = [];
  @ViewChild('searchInputTerm') searchInputTerm: ElementRef;

  skillText;

  player: videojs.Player;
  canComment = false;
  public today = new Date();

  recipientName: any;
  recipientEmail: any;
  cc: any;
  bcc: any;

  isMultiShare: boolean = false;

  constructor(protected dialog: MatDialog, 
    protected _shareVideoService: ShareVideoService, 
    protected _userService: UserService, 
    protected _formBuilder: FormBuilder,
    protected _bidEventService: BiddingEventService,
    protected _sanitizer: DomSanitizer,
    protected _candidateService: CandidateService,
    protected _readResume : ReadResumeService,
    protected _resumeService: ResumeService,
    protected _subList: SubscriberslistService,
    private _spinner: NgxSpinnerService,
    protected _videoCallingService: VideoCallingService,
  ) {
    this.resumes = [];

    this.loggedUser = this._userService.getUserData();
    _shareVideoService._sharableResumeRecruiter.subscribe((res) => {
      this.shareResume = res;
    });

    this.Search = this._formBuilder.group({
      tags: ["", Validators.required],
      searchTerm: [""],
    });
    this.searchSkillsFrm = this._formBuilder.group({
      tags: ["", Validators.required],
      searchSkillTerm: [""],
    });

    this.searchJobTitleFrm = this._formBuilder.group({
      tags: ["", Validators.required],
      searchJobTitleTerm: [""],
    });

    this.myComment = [];
    this.replyToComment = [];
    this.myCommentNote = [];

    this.QuestionsGroup = this._formBuilder.group({
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

    this.requestDatesForm = this._formBuilder.group({
      date1: new FormControl(null, Validators.compose([Validators.required])),
      time1: new FormControl(null, Validators.compose([Validators.required])),
      date2: new FormControl(null, Validators.compose([Validators.required])),
      time2: new FormControl(null, Validators.compose([Validators.required])),
      date3: new FormControl(null, Validators.compose([Validators.required])),
      time3: new FormControl(null, Validators.compose([Validators.required])),
    });

    this.auctionFrm = this._formBuilder.group({
      searchTermByNameIs : []
    });

  }

  setModel(){
    jQuery(".modal").modal();
    jQuery("select").material_select();
  }

  getTopRecruiterList(){
    this._bidEventService.getTopRecruiterList({userRole : this.loggedUser.userRole}).subscribe(res=>{
      this.topRecruiters = res;
      this.allTopRecruiters = this.topRecruiters;
    },err=>{
      console.log(err);
    });
  }

  addNoteToNoteSection(res){
    this.resumes.filter((element) => {
      if (element._id === res.profileId) {
        element.canNote = [...element.canNote, res.data];
      }
    });
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

  linkedIn(url) {
    window.open(url, "_blank");
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

  setCurrentTime(seconds, questionNumber) {
    this.questionNumber = questionNumber;
    try {
      this.videojsPlay.nativeElement.currentTime = seconds;
    } catch (e) {
      console.log(e);
    }
  }

  openSelectDatesModal() {
    jQuery("#selectDates").modal("open");
  }

  closeSelectDatesModal() {
    jQuery("#selectDates").modal("close");
  }

  closeRecruiterModal() {
    jQuery("#showRecruiterModal").modal("close");
    this.selectedCoachingRecruiter = [{}];
  }

  confirmSelectDatesEvent() {
    this.reqCoachingFunction();
    this.closeRecruiterModal();
  }

  /**
   *
   * @param link opens a provided url in new window
   */
  onLinkedIn(link: string) {
    if (link.includes("https")) {
      window.open(link, "_blank");
    } else {
      window.open("https://" + link, "_blank");
    }
  }

  selectionChanged(event) {
    console.log(event);
  }

  transform(url) {
    // return this._sanitizer.bypassSecurityTrustResourceUrl(url);
    window.open(url, '_blank');
  }

  sortByIndustries() {
    this._candidateService.getSortByIndustries({ industries: this.industries }).subscribe((data: any) => {
      this.resumes = data;
    });
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

  async handleResumeData(){
    this.resumes.forEach(async (item, index)=>{
      let finalStatementsArr = [];
      finalStatementsArr = await this._readResume.readResume2(item, this.skillText);

      //combine first three statements.
      finalStatementsArr.forEach((val ,index)=>{
        if(val.stm !== item.comments && val.stm !== item.comment2 && val.stm !== item.comment3){ 
          switch(index){
            case 0 : 
              item.commentsResume1 = val.stm + " ...";
              break;
            case 1 : 
              item.commentsResume2 = val.stm + " ...";
              break;
            case 2 : 
              item.commentsResume3 = val.stm + " ...";
              break;
            default : 
              break;
          }
        }
      });
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
    this.deleteCommentSucription = this._resumeService
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

  addCommentToCommets(res) {
    this.resumes.filter((element) => {
      if (element._id === res.profileId) {
        element.canReview = [...element.canReview, res.data];
      }
    });
  }

  addLikeToComment(res) {
    this.resumes.filter((element) => {
      if (element._id === res.profileId) {
        element.canReview.filter((comment) => {
          if (comment._id === res.data._id) {
            comment.like = [...comment.like, res.data];
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
            comment.reply = [...comment.reply, res.data.replyComment];
          }
        });
      }
    });
  }

  getSearchBySkills(payload){
    this._resumeService.getSearchBySkills(payload).subscribe((res) => {
        if (res) {
          this.resumes = res;
          this._subList.loaderListAfterSearch.next({type : "0"});
          this.handleResumeData();
        }
      }, (err) => {
        this._subList.loaderListAfterSearch.next({type : "0"});
    });
  }

  getCandidateSearchBySkills(payload){
    this._resumeService.getCandidateSearchBySkills(payload).subscribe((res) => {
        if (res) {
          this.resumes = res;
          this._subList.loaderListAfterSearch.next({type : "00"});
          this.handleResumeData();
        }
      }, (err) => {
        this._subList.loaderListAfterSearch.next({type : "00"});
    });
  }

  getUsersProfile() {
    this._userService.getUserProfile(this._userService.getUserData().userRole).subscribe((data: any) => {
          if (data != null && data != undefined && data != "") {
            this._userService.setUserProfile(data.res);
          } else {
            Materialize.toast("Something went wrong", 1000);
          }
          this._spinner.hide();
        }, (err) => {
          this._spinner.hide();
        }
      );
  }

  videoSet() {
    // instantiate Video.js
    if (this.videoURL) {
      this.player = videojs(
        this.videojsPlay.nativeElement,
        {
          autoplay: true,
          controlls: true,
        }, () => {
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
    this.getAllSharedCandidateProfileSubscription = this._resumeService.getAllSharedCandidateProfile(payload).subscribe((res) => {
          if (res) {
            this.resumes = res;
          }
        }, (err) => { }
      );
  }

  getVideo(payload) {
    this.getVideoURLSubscription = this._videoCallingService
      .getArchivedVideo(payload)
      .subscribe((url) => {
        if (url) {
          window.open(url.url);
        } else {
          Materialize.toast("unable to load url", 3000);
        }
      });
  }

  viewVideo(archivedId) {
    this.videoURL = "";
    const payload = {
      archivedId: archivedId,
    };
    this._videoCallingService.getArchivedVideo(payload).subscribe((url) => {
      if (url) {
        this.videoURL = url.url;
      } else {
        console.log("unable to load url");
      }
    });
  }

  openRecruiterModal(recruiterId) {
    jQuery("#showRecruiterModal").modal("open");
    const payload = {
      recruiterId,
    };
    this.getRecruiterPostedProfileSubscription = this._candidateService
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

  myProfile() {
    this.getProfileSubscription = this._candidateService
      .getCandidateProfile()
      .subscribe((res) => {
        this.myProfileContent = res;
      });
  }

  onShareWithRecruiter(recruiter) {
    this._spinner.show();
    Materialize.toast("Sharing your profile with the recruiter...", 4000);

    const payload = {
      recruiter_id: recruiter.refUserId._id,
      reqAvailableTime: this.requestDatesForm.value,
    };
    this.shareWithRecruiterSubscription = this._candidateService
      .sharewithRecruiter(payload)
      .subscribe(
        (res) => {
          if (res) {
            Materialize.toast(res.msg, 1000);
            this._spinner.hide();
          }
        },
        (err) => {
          Materialize.toast("Something went wrong!", 1000);
          this._spinner.hide();
        }
      );
  }

  shareToUsers(result) {
    if (result.finalRecruitersAre.length === 0) {
      return;
    }

    let payload = {
      sharedFrom: this.loggedUser._id,
      sharedTo: result.finalRecruitersAre,
      resumeId: this.shareResume._id,
      candidateProfile: this.shareResume.resumeType ? false : true,
      isMultiShare : this.isMultiShare
    }

    this.shareWithRecruiterSubscription = this._candidateService.shareWithUsers(payload).subscribe((res) => {
      Materialize.toast("Shared successfully", 1000);
    }, (err) => {
      Materialize.toast("Something went wrong!", 1000);
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
              searchSkills: this.skillText,
              userRole : this.loggedUser.userRole
            };
          }
          this.resumes = [];
          
          if(this.loggedUser.userRole == 'candidate'){
            //search for candidate
            this._subList.loaderListAfterSearch.next({type : "11"});
            this.getCandidateSearchBySkills(obj);
          }else{
            //search for recrutier and employer
            this._subList.loaderListAfterSearch.next({type : "1"});
            this.getSearchBySkills(obj);
          }
      });
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
        role: this.loggedUser.userRole,
        isMultiShare : this.isMultiShare
      };

      this.postCommentSubscription = this._resumeService
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
              this._userService.candidateProfileObservable.next(candidateObj);

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

  postMycmtNote(i, cmt, resume) {
    if (this.myCommentNote[i] === "" || this.myCommentNote[i] === null || this.myCommentNote[i] === undefined) {
      Materialize.toast("Comment box is empty!");
    } else {
      const payload = {
        resumeId: resume._id,
        review: cmt,
        role: this.loggedUser.userRole,
      };

      this._resumeService.postMyNote(payload).subscribe((res) => {
        if (res) {
          this.addNoteToNoteSection(res.detailedCommentObj);
          this.myCommentNote[i] = "";
        }
      }, (err) => {
        Materialize.toast("Unable to post!", 5000);
      });
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

    this.likeCommetSubscription = this._resumeService
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
      this.editCommentSucription = this._resumeService
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

  replyToThisComment(i, comment, resume, cmtId) {
    let candidateProfile;
    resume?.resumeType ? (candidateProfile = false) : (candidateProfile = true);
    const payload = {
      resumeId: resume._id,
      cmtId: cmtId,
      candidateProfile: candidateProfile,
      replyComment: comment,
      isMultiShare : this.isMultiShare
    };

    this.replyTocommentSubscription = this._resumeService
      .replyToComment(payload)
      .subscribe(
        (res) => {
          if (res) {
            this.replyToComment[i] = "";
            this.addReplyToComment(res);
          }
        }, (err) => { }
      );
  }

  async addCreatedLink(res) {
    this.generateLink = false;
    this.createdUrl = res.result.link;
    this.copyLink();

    this._userService.shareToMedia(this.createdUrl);
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
  
  showShareModalSuper(payload, callback){
    const dialogOfferIntroEmailRef = this.dialog.open(DiaplogOfferIntroEmailComponent,{
      data: {
        dialogType : payload.dialogType,
        dialogTitle : payload.dialogTitle,
        cc : payload.cc,
        bcc : payload.bcc,
        clients : payload.clients,
        loggedUser : payload.loggedUser,
        btns : payload.btns
      }
    });

    dialogOfferIntroEmailRef.afterClosed().subscribe(result => {
      if(result){
        callback(result, this);
      }
    });
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
      this.requestCoachingSubscription = this._candidateService
        .reqCoaching(this.payload)
        .subscribe(
          (res) => {
            if (res) {
              // console.log(res);
              // Materialize.toast("Recruiter has been notified!", 2000);
              Materialize.toast("Recruiter will reach out to you!", 4000);

              this.onShareWithRecruiter(this.selectedCoachingRecruiter);
              this._spinner.hide();
            }
          },
          (err) => {
            Materialize.toast("Something Went Wrong !", 1000);
            this._spinner.hide();
          }
        );
    }
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
    // console.log(recruiter.refUserId.available);
    this.availableDetails = recruiter.refUserId.available;
    // console.log(this.availableDetails);
    this.availableDetails.forEach((item, index) => {
      this.dayToBeAvailable.push(item.day.dayId);
    });
    this.disableDay = this.daysArray.filter(
      (val) => !this.dayToBeAvailable.includes(val)
    );
    
    this.reqCoachingFunction();
    this.closeRecruiterModal();
  }

  showShareTouserModalSuper(payload, callback) {
    const dialogShareToUsersRef = this.dialog.open(DialogShareToUsersComponent ,{
      data: {
        dialogType : payload.dialogType,
        dialogTitle : payload.dialogTitle,
        loggedUser : payload.loggedUser,
        topRecruiters : payload.topRecruiters,
        finalRecruitersAre : payload.finalRecruitersAre
      }
    });

    dialogShareToUsersRef.afterClosed().subscribe(result => {
      if(result){
        callback(result, this);
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
        callback(result, this);
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
        callback(result, this);
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
        callback(payload, result, this);
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
        callback(result, this);
      }
    });
  }

  showShareCandidateModalSuper(payload, callback){
    const dialogOfferIntroEmailRef = this.dialog.open(DiaplogOfferIntroEmailComponent,{
      data: {
        dialogType : payload.dialogType,
        dialogTitle : payload.dialogTitle,
        cc : payload.cc,
        bcc : payload.bcc,
        btns : payload.btns,
        loggedUser : payload.loggedUser
      }
    });

    dialogOfferIntroEmailRef.afterClosed().subscribe(result => {
      if(result){
        callback(result, this);
      }
    });
  }

  getImage(obj){
    obj.showCreatedLogo = true;
  }

  swapIntro(resume){
    this._resumeService.swapIntro(resume).subscribe((data)=>{
      Materialize.toast("Intro swapped", 1000, "green");
    });
  }
}