import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ResumeService } from 'src/app/_services/resume.service';

declare var jQuery: any;
import * as $ from "jquery";
import videojs from "video.js";
import { CandidateService } from 'src/app/_services/candidate.service';
import { Subscription } from 'rxjs';

declare var Materialize: any;
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  // subscription
  getProfileSubscription: Subscription;
  candidateProfile: any;
  public editProfile: FormGroup;
  fileUploaded = 0;
  downloadURL = '';
  constructor(
    private formBuilder: FormBuilder,
    private resumeService: ResumeService,
    private candidateService: CandidateService
  ) { }

  ngOnInit() {
    this.editProfile = this.formBuilder.group({
      fullName: ["", Validators.compose([Validators.required])],
      email: ["", Validators.compose([Validators.required])],
      phoneNo: ["", Validators.compose([Validators.required])],

      jobTitle: [""],
      location: [""],
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
      comments: [""],
      totalWorkExpYrs: [''],
      totalWorkExpMonths: [''],
      locationPref: [''],
      fileURL: ['']
    });
    this.getProfile();
  }

  get f() {
    return this.editProfile.controls;
  }

  fileChange(event) {
    if (event.target.files) {
      this.fileUploaded = 0;
      let fileList: FileList = event.target.files;
      let file: File = fileList[0];
      var fdata = new FormData();
      fdata.append("image", file);
      this.resumeService.uploadResume(fdata).subscribe(
        (data: any) => {
          if (data.result) {
            this.downloadURL = data.result;
            // this.resume.fileURL = data.result;
            this.fileUploaded = 2;
            Materialize.toast("Resume Uploaded Successfully !", 1000);
          } else {
            Materialize.toast("Something Went Wrong !", 1000);
          }
        },
        (error) => {
          console.log(error);
          if (error) {
            Materialize.toast("Something Went Wrong !", 1000);
          }
        }
      );
    }
  }
  getProfile() {
    this.candidateService.getCandidateProfile().subscribe((res) => {
      // console.log('************************', res);
      this.candidateProfile = res;
      this.editProfile.patchValue({
        fullName: res.candidate_id.fullName,
        email: res.candidate_id.email,
        phoneNo: res.candidate_id.phoneNo,
        jobTitle: res.jobTitle,
        location: res.location,
        Employers1: res.previousEmployers[0],
        Employers2: res.previousEmployers[1],
        skills: res.skills,
        linkedIn: res.linkedIn,
        referralJobTitle1: res.referral[0].referralJobTitle,
        referralEmail1: res.referral[0].referralEmail,
        referralPhoneNumber1: res.referral[0].referralPhoneNumber,
        referralJobTitle2: res.referral[1].referralJobTitle,
        referralEmail2: res.referral[1].referralEmail,
        referralPhoneNumber2: res.referral[1].referralPhoneNumber,
        referralJobTitle3: res.referral[2].referralJobTitle,
        referralEmail3: res.referral[2].referralEmail,
        referralPhoneNumber3: res.referral[2].referralPhoneNumber,
        comments: res.comments,
        totalWorkExpYrs: res.totalWorkExpYrs,
        totalWorkExpMonths: res.totalWorkExpMonths,
        locationPref: res.locationPref,
        fileURL: res.fileURL,
      });
      // console.log('file ', res.fileURL.length);

      if (res.fileURL.length > 0) {
        this.fileUploaded = 2;
        this.downloadURL = res.fileURL;
      } else {
        this.fileUploaded = 0;

      }

    }, err => {
      // console.log(err);
      Materialize.toast("Something Went Wrong !", 1000);

    });
  }
  submit() {
    if (this.downloadURL) {
      this.editProfile.patchValue({
        fileURL: this.downloadURL
      })
    } else {
      Materialize.toast("Resume not selected", 1000);

    }
    this.editProfile.addControl('candidateId', new FormControl(this.candidateProfile._id));
    this.candidateService.editProfile(this.editProfile.value).subscribe(res => {
      if (res) {
        Materialize.toast(res.msg, 1000);
      }
    }, err => {
      Materialize.toast("Something Went Wrong !", 1000);
    })
  }
}
