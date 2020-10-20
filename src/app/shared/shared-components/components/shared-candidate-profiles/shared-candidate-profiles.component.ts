import { Component, OnInit, OnChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { ResumeService } from 'src/app/_services/resume.service';
import { ShareVideoService } from 'src/app/_services/share-video.service';
import { UserService } from 'src/app/_services/user.service';
import { VideoCallingService } from 'src/app/_services/video-calling.service';

declare var jQuery;
declare var $: any;
declare var Materialize;
@Component({
  selector: 'app-shared-candidate-profiles',
  templateUrl: './shared-candidate-profiles.component.html',
  styleUrls: ['./shared-candidate-profiles.component.css']
})
export class SharedCandidateProfilesComponent implements OnInit, OnChanges {
  resumes: any;
  resume: any;
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
  constructor(
    private resumeService: ResumeService,
    private sanitizer: DomSanitizer,
    private videoCallingService: VideoCallingService,
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private shareVideoService: ShareVideoService
  ) {
    this.loggedUser = this.userService.getUserData();
    shareVideoService._sharableResumeRecruiter.subscribe((res) => {
      // console.log('subscribeed', res);
      this.shareResume = res;
    });
  }
  ngOnChanges() {
    jQuery(".modal").modal();
    jQuery("select").material_select();
  }
  ngOnInit() {
    this.getAllSharedResumes();
  }
  getAllSharedResumes() {
    this.getAllSharedCandidateProfileSubscription = this.resumeService.getAllSharedCandidateProfile().subscribe(res => {
      if (res) {
        // console.log(res);

        this.resumes = res;
      }
    }, err => {

    })
  }
  getVideo(payload) {
    this.getVideoURLSubscription = this.videoCallingService.getArchivedVideo(payload).subscribe((url) => {
      if (url) {
        window.open(url.url);
        // console.log(url);
      } else {
        // console.log('unable to load url');
        Materialize.toast('unable to load url', 3000);
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
  toggleAccordian(event) {
    var element = event.target;
    element.classList.toggle("active");

    var panel = element.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
