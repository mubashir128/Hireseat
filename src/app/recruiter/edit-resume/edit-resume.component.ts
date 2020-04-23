import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Resume } from '../../models/resume';
import { Router } from '@angular/router';
import { ResumeService } from '../../_services/resume.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VideoCallingService } from '../../_services/video-calling.service';

declare var jQuery: any;
declare var Materialize: any;

@Component({
  selector: 'app-edit-resume',
  templateUrl: './edit-resume.component.html',
  styleUrls: ['./edit-resume.component.css']
})
export class EditResumeComponent implements OnInit {
  @Input() resume: Resume;
  @Output() back = new EventEmitter();
  @Output() getAllResume = new EventEmitter();
  public editResumeFrm: FormGroup;
  downloadURL: string;
  fileUploaded: number = 0;
  videoURl: any;
  constructor(
    private formBuilder: FormBuilder,
    private resumeService: ResumeService,
    private router: Router,
    private videoCallingService: VideoCallingService
  ) { }

  ngOnInit() {
    console.log(this.resume);

    if (this.resume && this.resume.fileURL) {
      this.fileUploaded = 2;
      this.downloadURL = this.resume.fileURL;
      this.editResumeFrm = this.formBuilder.group({
        candidateName: ['', Validators.compose([Validators.required])],
        socialSecurityNum: ['', Validators.compose([Validators.required, Validators.maxLength(4)])],
        jobTitle: [""],
        location: [""],
        phoneNumber: [""],
        email: [""],
        Employers1: [""],
        Employers2: [""],
        skills: [""],
        linkedIn: [""],
        // 1st
        referralJobTitle1: [""],
        referralEmail1: [""],
        referralPhoneNumber1: [""],
        // 2nd
        referralJobTitle2: [""],
        referralEmail2: [""],
        referralPhoneNumber2: [""],
        // 3rd
        referralJobTitle3: [""],
        referralEmail3: [""],
        referralPhoneNumber3: [""],
        comments: [""]
      });
    }
    if (this.resume['interviewLinkedByRecruiter']) {
      this.viewVideo(this.resume['interviewLinkedByRecruiter']);
    }
    jQuery('#resume-preview').height(jQuery('#resume-info').height());
  }

  get f() { return this.editResumeFrm.controls; }
  viewVideo(archivedId) {
    // console.log(archivedId);
    const payload = {
      archivedId: archivedId
    };
    this.videoCallingService.getArchivedVideo(payload).subscribe(url => {
      if (url) {
        this.videoURl = url.url;
        console.log(this.videoURl);


      } else {
        console.log('unable to load url');

      }
    });
  }
  fileChange(event) {

    if (event.target.files) {
      this.fileUploaded = 0;
      let fileList: FileList = event.target.files;
      let file: File = fileList[0];
      var fdata = new FormData();
      fdata.append('image', file);
      this.resumeService.uploadResume(fdata).subscribe((data: any) => {
        if (data.result) {
          this.downloadURL = data.result;
          this.resume.fileURL = data.result;
          this.fileUploaded = 2;
          Materialize.toast('Resume Uploaded Successfully !', 1000);

        } else {
          Materialize.toast('Something Went Wrong !', 1000)
        }
      },
        (error) => {
          console.log(error);
          if (error) {
            Materialize.toast('Something Went Wrong !', 1000)
          }
        });
    }
  }

  submit() {

    if (this.editResumeFrm.valid && this.resume.fileURL != "") {
      this.resumeService.updateResume(this.resume).subscribe((data: any) => {
        if (data.res === "updated") {

          // Materialize.toast('Resume Updated Successfully !',2000);
          this.router.navigate(['recruiter/resume-list']).then(() => window.location.reload());

        } else {
          Materialize.toast('Something Went Wrong !', 1000);
        }
      },
        (error) => {
          console.log(error);
          if (error == "Conflict") {
            Materialize.toast('Social Security Number Should be unique !', 1000);
          } else if (error) {
            Materialize.toast('Something Went Wrong !', 1000);
          }
        });
    } else {
      Materialize.toast('Please Fill the form fields !', 1000);
    }
  }

  goBack() {
    this.getAllResume.next();
    this.back.emit();

  }





}
