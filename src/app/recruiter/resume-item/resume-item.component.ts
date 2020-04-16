import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Resume } from "../../models/resume";
import { DomSanitizer } from "@angular/platform-browser";
import { VideoCallingService } from '../../_services/video-calling.service';
import { Subscription } from 'rxjs';

declare var jQuery: any;
@Component({
  selector: "app-resume-item",
  templateUrl: "./resume-item.component.html",
  styleUrls: ["./resume-item.component.css"]
})
export class ResumeItemComponent implements OnInit {
  @Input() resume: Resume;
  @Output() selectedForEdit = new EventEmitter(false);
  @Output() selectedForDelete = new EventEmitter(false);
  videoInterviewSubscription: Subscription;
  resumeVisible: number = 0;
  public data: any;
  constructor(private sanitizer: DomSanitizer,
    private videoCallingService: VideoCallingService) {

  }

  ngOnInit() {
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
      jQuery(".card-reveal")
        .closest(".card")
        .css("overflow", "hidden");
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
            }
          }
        );
    });
  }

  showResume() {

    this.resumeVisible = 1;
  }

  closeResume() {
    this.resumeVisible = 0;
  }

  edit() {
    console.log('editing', this.resume);

    // referralJobTitle1: undefined
    // referralEmail1: undefined
    // referralPhoneNumber1: undefined

    // referralJobTitle2: undefined
    // referralEmail2: undefined
    // referralPhoneNumber2: undefined

    // referralJobTitle3: undefined
    // referralEmail3: undefined
    // referralPhoneNumber3: undefined
    this.resume.Employers1 = this.resume['previousEmployers'][0];
    this.resume.Employers2 = this.resume['previousEmployers'][1];

    this.resume.referralJobTitle1 = this.resume['referral'][0].referralJobTitle;
    this.resume.referralEmail1 = this.resume['referral'][0].referralEmail;
    this.resume.referralPhoneNumber1 = this.resume['referral'][0].referralPhoneNumber;



    this.resume.referralJobTitle2 = this.resume['referral'][1].referralJobTitle;
    this.resume.referralEmail2 = this.resume['referral'][1].referralEmail;
    this.resume.referralPhoneNumber2 = this.resume['referral'][1].referralPhoneNumber;


    this.resume.referralJobTitle3 = this.resume['referral'][2].referralJobTitle;
    this.resume.referralEmail3 = this.resume['referral'][2].referralEmail;
    this.resume.referralPhoneNumber3 = this.resume['referral'][2].referralPhoneNumber;


    this.selectedForEdit.emit(this.resume);
  }

  delete() {
    this.selectedForDelete.emit(this.resume);
  }

  showResumeForResumeBank() {
    this.resumeVisible = 2;
  }
  onAddToInterviewList(resume) {
    const payload = {
      recruitersid: resume.recruiterKey,
      candidatesId: resume._id,
      candidateName: resume.candidateName,
      skills: resume.skills,
      jobTitle: resume.jobTitle
    };
    this.videoInterviewSubscription = this.videoCallingService.addToVideoInterviewRoomRecruiter(payload).subscribe(res => {
      // console.log('****************', res);
      if (res) {
        resume.addedToVideoInterviewRoomByRecruiter = true;
        this.emailConfirmPopup();
      }
    }, err => {
      console.log('error occured', err);

    });
  }
  viewCandidate(resume) {
    // console.log('added resume ', resume);

  }
  viewVideo(url) {
    // console.log(url);
    window.open(url);
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
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
