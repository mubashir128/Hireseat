import {
  Component,
  Input,
  OnChanges,
  Output,
  EventEmitter,
  AfterViewInit,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { Resume } from "../../models/resume";
import { DomSanitizer } from "@angular/platform-browser";
import { VideoCallingService } from "../../_services/video-calling.service";
import { Subscription } from "rxjs";
import { UserService } from "src/app/_services/user.service";
import { NgxSpinnerService } from "ngx-spinner";
import { ShareVideoService } from "src/app/_services/share-video.service";
import { materialize } from "rxjs/operators";

declare var jQuery;
declare var $: any;
declare var Materialize;
@Component({
  selector: "app-resume-item",
  templateUrl: "./resume-item.component.html",
  styleUrls: ["./resume-item.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class ResumeItemComponent implements OnInit, OnChanges {
  getArchivedVideoSubscription: Subscription;
  shareVideoSubscription: Subscription;
  @Input() resume: Resume;
  @Output() selectedForEdit = new EventEmitter(false);
  @Output() selectedForDelete = new EventEmitter(false);
  videoInterviewSubscription: Subscription;
  resumeVisible = 0;
  public data: any;
  skillSet: any;
  loadVideo: any;
  shareResume: any;
  shareBiddingEvent: any;
  shareableVideoURL: any;
  loggedUser: any;
  recipientEmail: any;
  cc: any;
  bcc: any;
  constructor(
    private sanitizer: DomSanitizer,
    private videoCallingService: VideoCallingService,
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private shareVideoService: ShareVideoService
  ) {
    this.loggedUser = this.userService.getUserData();
    // console.log(this.loggedUser);
    shareVideoService._sharableResumeRecruiter.subscribe((res) => {
      // console.log('subscribeed', res);
      this.shareResume = res;
    });
  }

  ngOnInit() {

    this.skillSet = this.resume.skills.split(",");
    jQuery(".card").mouseenter(function (e) {
      if (jQuery(this).find("> .card-reveal").length) {
        if (
          jQuery(e.target).is(jQuery(".card .activator")) ||
          jQuery(e.target).is(jQuery(".card .activator i"))
        ) {
          // Make Reveal animate up
          jQuery(this)
            .find(".card-reveal")
            .css({ display: "block" })
            .velocity("stop", false)
            .velocity(
              { translateY: "-100%" },
              { duration: 300, queue: false, easing: "easeInOutQuad" }
            );
        }
      }
      jQuery(".card-reveal").closest(".card").css("overflow", "hidden");
    });
    jQuery(".card").mouseleave(function () {
      // Make Reveal animate down and display none
      jQuery(this)
        .find(".card-reveal")
        .velocity(
          { translateY: 0 },
          {
            duration: 225,
            queue: false,
            easing: "easeInOutQuad",
            complete: function () {
              jQuery(this).css({ display: "none" });
            },
          }
        );
    });
  }
  ngOnChanges() {
    jQuery(".modal").modal();
    jQuery("select").material_select();
  }
  showResume() {
    this.resumeVisible = 1;
  }

  closeResume() {
    this.resumeVisible = 0;
  }

  edit() {
    // console.log('editing', this.resume);

    // referralJobTitle1: undefined
    // referralEmail1: undefined
    // referralPhoneNumber1: undefined

    // referralJobTitle2: undefined
    // referralEmail2: undefined
    // referralPhoneNumber2: undefined

    // referralJobTitle3: undefined
    // referralEmail3: undefined
    // referralPhoneNumber3: undefined
    this.resume.Employers1 = this.resume["previousEmployers"][0];
    this.resume.Employers2 = this.resume["previousEmployers"][1];

    this.resume.referralJobTitle1 = this.resume["referral"][0].referralJobTitle;
    this.resume.referralEmail1 = this.resume["referral"][0].referralEmail;
    this.resume.referralPhoneNumber1 = this.resume[
      "referral"
    ][0].referralPhoneNumber;

    this.resume.referralJobTitle2 = this.resume["referral"][1].referralJobTitle;
    this.resume.referralEmail2 = this.resume["referral"][1].referralEmail;
    this.resume.referralPhoneNumber2 = this.resume[
      "referral"
    ][1].referralPhoneNumber;

    this.resume.referralJobTitle3 = this.resume["referral"][2].referralJobTitle;
    this.resume.referralEmail3 = this.resume["referral"][2].referralEmail;
    this.resume.referralPhoneNumber3 = this.resume[
      "referral"
    ][2].referralPhoneNumber;

    this.selectedForEdit.emit(this.resume);
  }

  delete() {
    this.selectedForDelete.emit(this.resume);
  }

  showResumeForResumeBank() {
    this.resumeVisible = 2;
  }
  onAddToInterviewList(resume) {
    if (this.loggedUser.userRole === 'employer') {
      const payload = {
        employersId: this.loggedUser._id,
        candidatesId: resume._id,
        candidateName: resume.candidateName,
        skills: resume.skills,
        jobTitle: resume.jobTitle
      };
      this.videoInterviewSubscription = this.videoCallingService.addToVideoInterviewRoomHM(payload).subscribe(res => {
        // console.log('****************', res);
        if (res) {
          // console.log('****************', res);

          resume.resumeKey.addedToVideoInterviewRoomByEmployer = true;
          Materialize.toast('The Candidate is added to the interview room successfully!', 1000);
        }
      }, err => {
        console.log('error occured', err);
        Materialize.toast('Something went wrong!', 1000);

      });
    } else if (this.loggedUser.userRole === 'recruiter') {
      const payload = {
        recruitersid: resume.recruiterKey,
        candidatesId: resume._id,
        candidateName: resume.candidateName,
        skills: resume.skills,
        jobTitle: resume.jobTitle,
      };
      this.videoInterviewSubscription = this.videoCallingService
        .addToVideoInterviewRoomRecruiter(payload)
        .subscribe(
          (res) => {
            // console.log('****************', res);
            if (res) {
              resume.addedToVideoInterviewRoomByRecruiter = true;
              // this.emailConfirmPopup();
              Materialize.toast('The Candidate is added to the interview room successfully!', 1000);

            }
          },
          (err) => {
            console.log("error occured", err);
            Materialize.toast('Something went wrong!', 1000);

          }
        );
    }
  }
  viewCandidate(resume) {
    // console.log('added resume ', resume);
  }
  viewVideo(resume) {
    console.log(resume);
    if (this.loggedUser.userRole === 'employer') {
      if (resume.interviewLinkedByEmployer) {
        const payload = {
          archivedId: resume.interviewLinkedByEmployer,
        };
        this.getVideo(payload);
      } else {
        Materialize.toast('Interview is not done yet!,  Hiring manager', 3000);
      }
    } else if (this.loggedUser.userRole === 'recruiter') {
      if (resume.interviewLinkedByRecruiter) {
        const payload = {
          archivedId: resume.interviewLinkedByRecruiter,
        };
        this.getVideo(payload);
      } else {
        Materialize.toast('Interview is not done yet!,  Recruiter', 3000);

      }
    }

  }
  getVideo(payload) {
    this.videoCallingService.getArchivedVideo(payload).subscribe((url) => {
      if (url) {
        window.open(url.url);
        // console.log(url);
      } else {
        // console.log('unable to load url');
        Materialize.toast('unable to load url', 3000);

      }
    });
  }

  // modal
  emailConfirmPopup() {
    // // console.log("emailConfirmPopup");

    jQuery("#emailConfirmPop").modal("open");
    setTimeout(() => {
      this.closeEmailConfirmpopup();
    }, 1500);
  }
  closeEmailConfirmpopup() {
    // // console.log("closing");

    jQuery("#emailConfirmPop").modal("close");
  }

  // end modal

  // share process
  showShareModal(resume) {
    // console.log(resume, "**********************");
    jQuery("#shareEmailPopUp").modal("open");
    this.shareVideoService.setResume(resume);
  }
  ArcivedVideoUrl(archiveId) {
    this.getArchivedVideoSubscription = this.videoCallingService
      .getArchivedVideo(archiveId)
      .subscribe(
        (res) => {
          if (res) {
            this.shareableVideoURL = res.url;
            console.log(this.shareableVideoURL);
            this.spinner.hide();
            return true;
          } else {
            this.spinner.hide();
            return false;

          }
        },
        (err) => {

          this.spinner.hide();
          return false;

        }
      );
  }
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
                comment: this.shareResume.comments
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

  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
