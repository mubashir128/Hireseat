import { Component, OnInit, Input, ElementRef, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ResumeService } from "src/app/_services/resume.service";
import { NgxSpinnerService } from "ngx-spinner";
import { ResumeBank, ResumeVideo } from "src/app/models/resumebank";
import * as lib from "../../lib-functions";
import { map, filter, debounceTime, distinctUntilChanged, tap } from "rxjs/operators";
import { fromEvent, Subscription } from "rxjs";
import { VideoCallingService } from '../../_services/video-calling.service';
declare var jQuery: any;
declare var Materialize: any;
@Component({
  selector: "app-upload-resume",
  templateUrl: "./upload-resume.component.html",
  styleUrls: ["./upload-resume.component.css"]
})
export class UploadResumeComponent implements OnInit {
  getArchiveVideoForCandidateSubscription: Subscription;
  sendEmailSubscription: Subscription;
  public newResumeFrm: FormGroup;
  public newResumeFrm2: FormGroup;
  downloadURL: string = "";
  fileUploaded: number = 0;
  resume: ResumeBank;
  resumeVideo: ResumeVideo;
  tags: any;
  public skillSets = [];
  @ViewChild('searchByEmail') searchByEmail: ElementRef;
  submitVideoCandidate = true;
  emailFound = true;
  requestedResume: any;
  seconds = 3600;
  ms = 3600000;
  videoURL: any;

  constructor(
    private formBuilder: FormBuilder,
    private resumeService: ResumeService,
    private spinner: NgxSpinnerService,
    private videoCallingService: VideoCallingService
  ) {
    this.resume = new ResumeBank();
    this.resumeVideo = new ResumeVideo();
  }

  ngOnInit() {
    this.getSkillset();
    this.newResumeFrm = this.formBuilder.group({
      firstName: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[a-zA-Z ]*$/)
        ])
      ],
      lastName: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[a-zA-Z ]*$/)
        ])
      ],
      tags: ["", Validators.required],
      experience: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("[0-9]+"),
          Validators.maxLength(2)
        ])
      ]
    });

    this.newResumeFrm2 = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      time: ['', Validators.required]
    });

  }

  ngAfterViewInit() {
    // server-side search
    this.searchTermByEmail();
  }

  searchTermByEmail() {
    fromEvent(this.searchByEmail.nativeElement, 'keyup')
      .pipe(
        map(event => event),
        filter(Boolean),
        debounceTime(2000),
        distinctUntilChanged(),
        tap((text) => {
          console.log(text);

          this.getResumeCandidates({
            email: this.resumeVideo.email
          });
        })
      )
      .subscribe();
  }

  getResumeCandidates(obj) {
    this.resumeService.getResumeCandidates(obj).subscribe(res => {
      if (res.result.length !== 0) {
        this.requestedResume = res.result[0];
        this.emailFound = true;
        this.submitVideoCandidate = false;
      } else {
        this.emailFound = false;
        this.submitVideoCandidate = true;
      }

    });
  }

  getSkillset() {
    this.resumeService.getSkillSets().subscribe(
      (data: any) => {
        if (data.length > 0) {
          this.skillSets = data;
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  get f() {
    return this.newResumeFrm.controls;
  }

  fileChange(event) {
    this.spinner.show();
    if (event.target.files[0]) {
      var fdata = new FormData();
      fdata.append("file", event.target.files[0]);
      // fdata.append('jobPostProfieId','All');
      this.resumeService.uploadResumeInBank(fdata).subscribe(
        (data: any) => {
          if (data.result) {
            this.downloadURL = data.result;
            this.resume.fileURL = data.result;
            this.fileUploaded = 2;
            this.spinner.hide();
            Materialize.toast("Resume Uploaded Successfully !", 1000);
          } else {
            this.spinner.hide();
            Materialize.toast("Something Went Wrong !", 1000);
          }
        },
        error => {
          this.spinner.hide();
          console.log(error);
          if (error) {
            Materialize.toast("Something Went Wrong !", 1000);
          }
        }
      );
    }
  }

  submit() {
    this.spinner.show();
    if (this.newResumeFrm.valid && this.resume.fileURL != "") {
      this.resumeService.addToResumeBank(this.resume).subscribe(
        (data: any) => {
          if (data.res == "success") {
            this.spinner.hide();
            Materialize.toast("Resume added to bank successfully !", 5000);
            this.newResumeFrm.reset();
            this.resume.fileURL = "";
            this.fileUploaded = 0;
          } else {
            this.spinner.hide();
            Materialize.toast("Something Went Wrong !", 1000);
          }
        },
        error => {
          console.log(error);
          Materialize.toast("Something Went Wrong !", 1000);
          this.spinner.hide();
        }
      );
    } else {
      Materialize.toast("Please Fill the form fields !", 1000);
      this.spinner.hide();
      return;
    }
  }

  scrollToResumeForm() {
    let scrollTo: any = jQuery("#ResuemFrm");
    jQuery("html,body").animate({ scrollTop: scrollTo.offset().top });
  }

  addTag(tag) {
    tag.display = lib.trimSpaces(tag.display);
    tag.display = lib.titleCase(tag.display);
    if (lib.searchObjectArray(tag.value, this.skillSets)) {
      return;
    }
    this.resumeService.addNewTag(tag).subscribe(
      response => {
        if (response.result == "success") {
          Materialize.toast("New tag added successfully !", 1000);
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  removeTag(tag) {
    if (lib.searchObjectArray(tag.value, this.skillSets)) {
      return;
    }
    this.resumeService.removeNewTag(tag).subscribe(
      response => {
        if (response.result == "success") {
          Materialize.toast("New tag removed successfully !", 1000);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  async submitVideo() {
    if (this.newResumeFrm2.valid) {
      console.log("valid --- : ", this.resumeVideo);
      if (this.requestedResume.interviewLinkedByRecruiter) {
        const payload = {
          archivedId: this.requestedResume.interviewLinkedByRecruiter,
          expires: this.seconds
        };
        this.getArchiveVideoForCandidateSubscription = this.videoCallingService.getArchivedVideo(payload).subscribe(res => {
          console.log(res);
          if (res) {
            this.spinner.hide();
            this.videoURL = res.url;
            // return res.url;
            // if (this.videoURL) {
            const subject = 'Hireseat ' + this.requestedResume.candidateName;
            const emailPayload = {
              resumeId: this.requestedResume._id,
              recipientEmail: this.resumeVideo.email,
              fullName: this.requestedResume.candidateName,
              videoUrl: this.videoURL,
              subject: subject,
              comment: this.requestedResume.comments,
              expireTime: this.ms
            };
            this.sendEmailSubscription = this.videoCallingService.CandidateShareVideoViaEmail(emailPayload).subscribe(res => {
              console.log(res);
              Materialize.toast('Email sent', 3000);

            }, err => {
              console.log(err);
            });
            // }
          } else {
            this.spinner.hide();

            console.log('unable to load the video');
            // return false;
          }
        });
        console.log(this.videoURL);
      } else {
        console.log('this candidate does not have any videos');
        this.videoURL = '';
        const subject = 'Hireseat' + this.requestedResume.jobTitle + this.requestedResume.candidateName;
        const emailPayload = {
          resumeId: this.requestedResume._id,
          recipientEmail: this.resumeVideo.email,
          fullName: this.requestedResume.candidateName,
          videoUrl: this.videoURL,
          subject: subject,
          comment: this.requestedResume.comments,
          expireTime: this.ms
        };
        this.sendEmailSubscription = this.videoCallingService.CandidateShareVideoViaEmail(emailPayload).subscribe(res => {
          console.log(res);
        }, err => {
          console.log(err);
        });
      }
    } else {
      Materialize.toast('Please Fill the form fields !', 1000);
    }
  }
  getArchivedVideo(payload) {
    this.spinner.show();
    this.getArchiveVideoForCandidateSubscription = this.videoCallingService.getArchivedVideo(payload).subscribe(res => {
      console.log(res);
      if (res) {
        this.spinner.hide();
        this.videoURL = res.url;
        // return res.url;
      } else {
        this.spinner.hide();

        console.log('unable to load the video');
        // return false;
      }
    });
  }
  handleHoursChange($event, s, ms) {
    this.resumeVideo.time = $event.target.value;
    this.seconds = s;
    this.ms = ms;
  }

  get f2() {
    return this.newResumeFrm2.controls;
  }

}
