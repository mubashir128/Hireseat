import { Component, OnInit, Input } from '@angular/core';
import { Resume } from '../../models/resume';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResumeService } from '../../_services/resume.service';
import { UserService } from '../../_services/user.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
declare var jQuery: any;
declare var Materialize: any;

@Component({
  selector: 'app-new-resume',
  templateUrl: './new-resume.component.html',
  styleUrls: ['./new-resume.component.css']
})
export class NewResumeComponent implements OnInit {
  public chkLoggedInUser: any;
  resume: Resume;
  downloadURL: string = '';
  fileUploaded: number = 0;
  uploadProgress: number = 0;
  public newResumeFrm: FormGroup;
  userRole: any;

  constructor(
    private formBuilder: FormBuilder,
    private resumeService: ResumeService,
    private userService: UserService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.resume = Resume.getBlankObject();
    this.chkLoggedInUser = this.userService.getUserData();
    // console.log(this.chkLoggedInUser);

    if (this.chkLoggedInUser != 'no') {
      if (this.chkLoggedInUser.userRole === 'recruiter') {
        this.resume.recruiterKey = this.chkLoggedInUser._id;
      } else if (this.chkLoggedInUser.userRole === 'employer') {
        this.resume.employerKey = this.chkLoggedInUser._id;

      }
    } else {
    }
    this.userRole = this.chkLoggedInUser.userRole;
  }

  ngOnInit() {
    jQuery('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: false, // Does not change width of dropdown to that of the activator
      hover: false, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: false, // Displays dropdown below the button
      alignment: 'left', // Displays dropdown with edge aligned to the left of button
      stopPropagation: false // Stops event propagation
    });
    jQuery('#resume-preview').height(jQuery('#resume-info').height());

    this.newResumeFrm = this.formBuilder.group({
      candidateName: ['', Validators.compose([Validators.required])],
      socialSecurityNum: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('[0-9]+'),
          Validators.maxLength(4)
        ])
      ],
      jobTitle: [''],
      location: [''],
      phoneNumber: [''],
      email: ['', [
        Validators.email
      ]],
      Employers1: [''],
      Employers2: [''],
      skills: [''],
      linkedIn: [''],
      // 1st
      referralJobTitle1: [''],
      referralEmail1: [''],
      referralPhoneNumber1: ['',
        Validators.compose([
          Validators.pattern('[0-9]+'),
          Validators.maxLength(10)
        ])],
      // 2nd
      referralJobTitle2: [''],
      referralEmail2: [''],
      referralPhoneNumber2: ['',
        Validators.compose([
          Validators.pattern('[0-9]+'),
          Validators.maxLength(10)
        ])],
      // 3rd
      referralJobTitle3: [''],
      referralEmail3: [''],
      referralPhoneNumber3: ['',
        Validators.compose([
          Validators.pattern('[0-9]+'),
          Validators.maxLength(10)
        ])],
      comments: ['']
    });
  }

  get f() {
    return this.newResumeFrm.controls;
  }

  fileChange(event) {
    this.spinner.show();
    if (event.target.files) {
      let fileList: FileList = event.target.files;
      let file: File = fileList[0];
      var fdata = new FormData();
      fdata.append('image', file);
      this.resumeService.uploadResume(fdata).subscribe(
        (data: any) => {
          if (data.result) {
            this.downloadURL = data.result;
            this.resume.fileURL = data.result;
            this.fileUploaded = 2;
            this.spinner.hide();
            Materialize.toast('Resume Uploaded Successfully !', 1000);
          } else {
            this.spinner.hide();
            Materialize.toast('Something Went Wrong !', 1000);
          }
        },
        (error) => {
          this.spinner.hide();
          // console.log(error);
          if (error) {
            Materialize.toast('Something Went Wrong !', 1000);
          }
        }
      );
    }
  }

  submit() {
    // console.log(this.newResumeFrm.value);

    this.spinner.show();
    if (this.userRole === 'employer') {

      if (this.newResumeFrm.valid) {
        this.createResume();
      } else {
        Materialize.toast('Please Fill the form fields !', 1000);
        this.spinner.hide();
      }

    } else if (this.userRole === 'recruiter') {
      if (this.newResumeFrm.valid && this.resume.fileURL !== '') {
        this.createResume();
      } else {
        Materialize.toast('Please Fill the form fields !', 1000);
        this.spinner.hide();
      }
    }
  }
  createResume() {
    this.resumeService.createResume(this.resume).subscribe(
      (data: any) => {
        if (data.result === 'inserted') {
          this.spinner.hide();
          Materialize.toast('Resume Created Successfully !', 2000);
          if (this.userRole === 'employer') {
            this.router.navigate(['employer/mycandidates']);
          } else if (this.userRole === 'recruiter') {
            this.router.navigate(['recruiter/resume-list']);
          }
        } else {
          this.spinner.hide();
          Materialize.toast('Something Went Wrong !', 1000);
        }
      },
      (error) => {
        // console.log(error);
        if (error === 'Conflict') {
          Materialize.toast(
            'Network error...!',
            1000
          );
        } else if (error) {
          Materialize.toast('Something Went Wrong !', 1000);
        }
        this.spinner.hide();
      }
    );
  }
  cancle() {
    // this.ngOnInit();
    this.newResumeFrm.reset();
  }
}
