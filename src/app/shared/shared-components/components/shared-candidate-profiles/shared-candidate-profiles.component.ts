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
declare var jQuery;
declare var $: any;
declare var Materialize;
@Component({
  selector: "app-shared-candidate-profiles",
  templateUrl: "./shared-candidate-profiles.component.html",
  styleUrls: ["./shared-candidate-profiles.component.css"],
})
export class SharedCandidateProfilesComponent
  implements OnInit, OnChanges, OnDestroy {
  @ViewChild("playVideo", { static: false }) videojsPlay: ElementRef;
  @ViewChild("searchByName", { static: true }) searchByName: ElementRef;

  player: videojs.Player;
  canComment = false;
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
  editTo: any;
  editCommentSucription: any;
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
  constructor(
    private resumeService: ResumeService,
    private sanitizer: DomSanitizer,
    private videoCallingService: VideoCallingService,
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private shareVideoService: ShareVideoService,
    private formBuilder: FormBuilder,
    private _socket: WebsocketService,
    private candidateService: CandidateService
  ) {
    this.Search = this.formBuilder.group({
      tags: ["", Validators.required],
      searchTerm: [""],
    });
    this.Search.get("searchTerm")
      .valueChanges.pipe(debounceTime(800))
      .subscribe((res) => {
        if (res) {
          let obj = {
            searchType: "name",
            searchTerm: res,
          };
          //  this.resumes = this.resumes.filter((resume) => {
          //     if (
          //       resume.candidateName.toLowerCase().includes(res.toLowerCase()) ||
          //       resume.candidate_id.fullName
          //         .toLowerCase()
          //         .includes(res.toLowerCase())
          //     ){
          //       console.log(resume);
          //       return resume;

          //     }
          //   });
          //   console.log(this.resumes);

          this.getAllSharedResumes(obj);
        }
      });
    this.myComment = [];
    this.loggedUser = this.userService.getUserData();
    shareVideoService._sharableResumeRecruiter.subscribe((res) => {
      // console.log('subscribeed', res);
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
  ngOnInit() {
    jQuery(".modal").modal();
    jQuery("select").material_select();
    this.getProfiles();
  }
  getProfiles() {
    if (this.loggedUser.userRole === "candidate") {
      this.getMyPostedProfiles();
      this.myProfile();
    } else {
      this.getAllSharedResumes({});
    }
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
          // console.log(text.target.value);

          let obj = {
            searchType: "name",
            searchTerm: this.searchTerm,
          };
          console.log(obj);

          this.getAllSharedResumes(obj);
          // this.redirectToUser(obj);
        })
      )
      .subscribe();
  }
  getUsersProfile() {
    // console.log("setting up user profile");

    this.userService
      .getUserProfile(this.userService.getUserData().userRole)
      .subscribe(
        (data: any) => {
          // console.log("========", data);

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
              if (this.loggedUser.userRole === "candidate") {
                this.getMyPostedProfiles();
              } else {
                this.getAllSharedResumes({});
                this.getUsersProfile();
                Materialize.toast(
                  "You Gained 100 Recruiter Points",
                  6000,
                  "red"
                );
              }
              this.myComment[i] = "";
            }
          },
          (err) => {
            Materialize.toast("Unable to post!");
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

    // console.log("payload", payload);
    this.likeCommetSubscription = this.resumeService
      .likeComment(payload)
      .subscribe(
        (res) => {
          if (res) {
            Materialize.toast(
              "You just gave recruiter a 50 points!",
              5000,
              "red"
            );
            this.getProfiles();
            this.getUsersProfile();
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
              if (this.loggedUser.userRole === "candidate") {
                this.getMyPostedProfiles();
              } else {
                this.getAllSharedResumes({});
              }
              this.cancelEdit(cmt);
            }
          },
          (err) => {
            Materialize.toast("Something went wrong!");
          }
        );
    }
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
            if (this.loggedUser.userRole === "candidate") {
              this.getMyPostedProfiles();
            } else {
              this.getAllSharedResumes({});
            }
          }
        },
        (err) => {}
      );
  }
  async initSocket(token, userRole) {
    await this._socket.getInstance(token, userRole);
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
  }
  getMyPostedProfiles() {
    this.getMyPostedProfilesSubscription = this.candidateService
      .myPostedProfiles()
      .subscribe((res) => {
        if (res) {
          this.resumes = res;
        }
      });
  }

  getAllSharedResumes(payload) {
    this.getAllSharedCandidateProfileSubscription = this.resumeService
      .getAllSharedCandidateProfile(payload)
      .subscribe(
        (res) => {
          if (res) {
            this.resumes = res;
          }
        },
        (err) => {}
      );
  }
  getVideo(payload) {
    this.getVideoURLSubscription = this.videoCallingService
      .getArchivedVideo(payload)
      .subscribe((url) => {
        if (url) {
          window.open(url.url);
          // console.log(url);
        } else {
          // console.log('unable to load url');
          Materialize.toast("unable to load url", 3000);
        }
      });
  }
  linkedIn(url) {
    window.open(url, "_blank");
  }

  // share process
  showShareModal(resume) {
    // console.log(resume, "**********************");
    jQuery("#shareEmailModal").modal("open");
    this.shareVideoService.setResume(resume);
  }

  closeShareModal() {
    jQuery("#shareEmailModal").modal("close");
  }

  async share(resume) {
    // console.log('sharing the resume', this.recipientEmail, this.cc, this.bcc);
    jQuery("#shareEmailModal").modal("close");
    this.spinner.show();
    const subject =
      "Hireseat" +
      " - " +
      this.loggedUser.companyName +
      " - " +
      this.shareResume.jobTitle +
      " - " +
      this.shareResume.candidateName +
      " Profile.";
    // console.log(subject, '&&&&&&&&&&&&&&&&&&&************', this.shareResume);
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
            // console.log(this.shareableVideoURL);
            this.spinner.hide();
            if (this.shareableVideoURL) {
              const payload = {
                recruiterId: this.loggedUser._id,
                resumeId: this.shareResume._id,
                recipientEmail: this.recipientEmail,
                cc: this.cc,
                bcc: this.bcc,
                videoUrl: this.shareableVideoURL,
                fullName: this.shareResume.candidateName,
                subject: subject,
                comment: this.shareResume.comments,
              };
              this.shareVideoSubscription = this.shareVideoService
                .shareVideoViaRecruiterEmail(payload)
                .subscribe(
                  (res) => {
                    if (res) {
                      // console.log(res);
                      Materialize.toast(res.msg, 3000);
                      jQuery("#shareEmailModal").modal("close");
                      this.spinner.hide();
                    }
                  },
                  (err) => {
                    // console.log(err);
                    Materialize.toast("unable to send an email!", 3000);
                    jQuery("#shareEmailModal").modal("close");
                    this.spinner.hide();
                  }
                );
            } else {
              // console.log('no sharable video available');
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
    // console.log(this.questionNumber);

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
    // console.log(recruiterId);
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
    // console.log(recruiter.refUserId.available);
    this.availableDetails = recruiter.refUserId.available;
    // console.log(this.availableDetails);
    this.availableDetails.forEach((item, index) => {
      this.dayToBeAvailable.push(item.day.dayId);
    });
    this.disableDay = this.daysArray.filter(
      (val) => !this.dayToBeAvailable.includes(val)
    );

    // console.log(this.disableDay);
    // this.spinner.show();
    // this.openSelectDatesModal();
    // this.confirmSelectDatesEvent();
    this.reqCoachingFunction();
    this.closeRecruiterModal();
  }
  /**
   *
   * @param link opens a provided url in new window
   */
  onLinkedIn(link: string) {
    console.log("----------------", link);

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
    this.getProfileSubscription = this.candidateService
      .getCandidateProfile()
      .subscribe((res) => {
        this.myProfileContent = res;
      });
  }
  confirmSelectDatesEvent() {
    // console.log(this.requestDatesForm.valid);
    // console.log(this.requestDatesForm.value);

    // if (this.requestDatesForm.valid) {
    this.reqCoachingFunction();
    this.closeRecruiterModal();
    // this.closeSelectDatesModal();
    // } else {
    //   Materialize.toast("Please provide your available time!", 4000);
    // }
  }

  reqCoachingFunction() {
    // console.log("requesting********** coaching", this.myProfileContent);
    this.payload = {
      recipientEmail: "contact@hireseat.com",
      candidateFullName: this.loggedUser.fullName,
      candidatePhoneNo: this.loggedUser.phoneNo,
      recruiterFullName: this.selectedCoachingRecruiter["refUserId"].fullName,
      subject:
        this.loggedUser.fullName + " " + "Candidate request for coaching",
    };
    if (this.myProfileContent) {
      // console.log("approaching coach");

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
  // request recruiter process end

  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  ngOnDestroy() {}
}
