import {
  Component,
  OnInit,
  OnChanges,
  ViewChild,
  ElementRef,
} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { NgxSpinnerService } from "ngx-spinner";
import { Subscription } from "rxjs";
import { ResumeService } from "src/app/_services/resume.service";
import { ShareVideoService } from "src/app/_services/share-video.service";
import { UserService } from "src/app/_services/user.service";
import { VideoCallingService } from "src/app/_services/video-calling.service";
import { WebsocketService } from "src/app/_services/websocket.service";
import videojs from "video.js";

declare var jQuery;
declare var $: any;
declare var Materialize;
@Component({
  selector: "app-shared-candidate-profiles",
  templateUrl: "./shared-candidate-profiles.component.html",
  styleUrls: ["./shared-candidate-profiles.component.css"],
})
export class SharedCandidateProfilesComponent implements OnInit, OnChanges {
  @ViewChild("playVideo", { static: false }) videojsPlay: ElementRef;
  player: videojs.Player;

  resumes: any;
  resume: any;
  show: any;
  getVideoURLSubscription: Subscription;
  getAllSharedCandidateProfileSubscription: Subscription;
  getArchivedVideoSubscription: Subscription;
  shareVideoSubscription: Subscription;
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
  QuestionsGroup: FormGroup;

  constructor(
    private resumeService: ResumeService,
    private sanitizer: DomSanitizer,
    private videoCallingService: VideoCallingService,
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private shareVideoService: ShareVideoService,
    private formBuilder: FormBuilder,
    private _socket: WebsocketService
  ) {
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
  }
  ngOnChanges() {
    jQuery(".modal").modal();
    jQuery("select").material_select();
  }
  async ngOnInit() {
    this.getAllSharedResumes();
    // let obj = JSON.parse(localStorage.getItem("currentUser"));
    // if (obj !== null) {
    //   await this.initSocket(obj.token, obj.userInfo.userRole);
    // }
    // this._socket.getProfiles().subscribe((res) => {
    //   this.resumes = res;
    //   console.log("______", this.resumes);
    // });
  }

  async initSocket(token, userRole) {
    await this._socket.getInstance(token, userRole);
  }
  ngAfterViewInit() {
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
  getAllSharedResumes() {
    this.getAllSharedCandidateProfileSubscription = this.resumeService
      .getAllSharedCandidateProfile()
      .subscribe(
        (res) => {
          if (res) {
            // console.log(res);

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
    jQuery("#shareEmailPopUp").modal("open");
    this.shareVideoService.setResume(resume);
  }
  // ArcivedVideoUrl(archiveId) {
  //   this.getArchivedVideoSubscription = this.videoCallingService
  //     .getArchivedVideo(archiveId)
  //     .subscribe(
  //       (res) => {
  //         if (res) {
  //           this.shareableVideoURL = res.url;
  //           this.videoURL = res.url;
  //           console.log('----------', this.shareableVideoURL);
  //           this.spinner.hide();

  //           //

  //           //
  //           return true;
  //         } else {
  //           this.spinner.hide();
  //           return false;

  //         }
  //       },
  //       (err) => {

  //         this.spinner.hide();
  //         return false;

  //       }
  //     );
  // }
  closeShareModal() {
    jQuery("#shareEmailPopUp").modal("close");
  }
  sendVideo() {
    // this.share(this.shareResume);
    // jQuery("#shareEmailPopUp").modal("close");
  }
  async share(resume) {
    // console.log('sharing the resume', this.recipientEmail, this.cc, this.bcc);
    jQuery("#shareEmailPopUp").modal("close");
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
                      jQuery("#shareEmailPopUp").modal("close");
                      this.spinner.hide();
                    }
                  },
                  (err) => {
                    // console.log(err);
                    Materialize.toast("unable to send an email!", 3000);
                    jQuery("#shareEmailPopUp").modal("close");
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
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
