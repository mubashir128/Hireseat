import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ResumeService } from 'src/app/_services/resume.service';

declare var jQuery: any;
import * as $ from "jquery";
declare var Materialize: any;
import videojs from "video.js";
import { CandidateService } from 'src/app/_services/candidate.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { VideoCallingService } from 'src/app/_services/video-calling.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit, OnDestroy {
  // subscription
  getProfileSubscription: Subscription;
  editCandidateProfileSubscription: Subscription;
  uploadResumeSubscription: Subscription;

  candidateProfile: any;
  public editProfile: FormGroup;
  fileUploaded = 0;
  downloadURL = '';
  referral: any;
  errorMsg: boolean;
  fileObj: File;
  fileUrl: any;
  videoURL: any;
  constructor(
    private formBuilder: FormBuilder,
    private resumeService: ResumeService,
    private candidateService: CandidateService,
    private router: Router,
    private videoCallingService:VideoCallingService
  ) { }

  ngOnInit() {
    this.videoURL = "";

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
      desiredRoles: [''],
      desiredCompanies: [''],
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
      shareProfile: [false],
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
      this.uploadResumeSubscription = this.resumeService.uploadResume(fdata).subscribe(
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
    this.getProfileSubscription = this.candidateService.getCandidateProfile().subscribe((res) => {
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
        referralJobTitle1: res.referral[0]?.referralJobTitle,
        referralEmail1: res.referral[0]?.referralEmail,
        referralPhoneNumber1: res.referral[0]?.referralPhoneNumber,
        referralJobTitle2: res.referral[1]?.referralJobTitle,
        referralEmail2: res.referral[1]?.referralEmail,
        referralPhoneNumber2: res.referral[1]?.referralPhoneNumber,
        referralJobTitle3: res.referral[2]?.referralJobTitle,
        referralEmail3: res.referral[2]?.referralEmail,
        referralPhoneNumber3: res.referral[2]?.referralPhoneNumber,
        comments: res.comments,
        totalWorkExpYrs: res.totalWorkExpYrs,
        totalWorkExpMonths: res.totalWorkExpMonths,
        locationPref: res.locationPref,
        shareProfile:res.shareProfile,
        fileURL: res.fileURL,
      });
      // console.log('file ', res.fileURL.length);

      if (res.fileURL.length > 0) {
        this.fileUploaded = 2;
        this.downloadURL = res.fileURL;
      } else {
        this.fileUploaded = 0;

      }
      if(res.recordedId){
        this.viewVideo(res.recordedId);
      }

    }, err => {
      // console.log(err);
      Materialize.toast("Something Went Wrong !", 1000);

    });
  }
  viewVideo(archivedId) {
    this.videoURL = "";
    // console.log(archivedId);
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
  submit() {
    console.log('}}}}}}}}}}}}',this.editProfile.value);
    
    if (this.downloadURL) {
      this.editProfile.patchValue({
        fileURL: this.downloadURL
      })
    } else {
      Materialize.toast("Resume not selected", 1000);

    }
    this.editProfile.addControl('candidateId', new FormControl(this.candidateProfile._id));
    console.log(this.editProfile.valid);

    if (this.editProfile.valid) {
      this.editCandidateProfileSubscription = this.candidateService.editProfile(this.editProfile.value).subscribe(res => {
        if (res) {
          Materialize.toast(res.msg, 1000);
        }
      }, err => {
        Materialize.toast("Something Went Wrong !", 1000);
      });
    } else {
      Materialize.toast("Please complete the form!", 3000);

    }
  }

  navigateToRoom(){
    this.router.navigate(['video-call/' +'self-record@'+ this.candidateProfile._id]);

  }
  onFilePicked(event: Event): void {

    this.errorMsg = false
    console.log(event);
    const FILE = (event.target as HTMLInputElement).files[0];
    this.fileObj = FILE;
    console.log(this.fileObj);
    if(this.fileObj){
      this.onFileUpload();
    }
  }
  onFileUpload() {
    console.log('');
    
    if (!this.fileObj) {
      this.errorMsg = true
      return
    }
    const fileForm = new FormData();
    fileForm.append('file', this.fileObj);
    this.candidateService.uploadVideo(fileForm).subscribe(res => {
      this.fileUrl = res;
      console.log(res);
      
    });
  }
  ngOnDestroy() {
    if (this.editCandidateProfileSubscription) this.editCandidateProfileSubscription.unsubscribe();
    if (this.getProfileSubscription) this.getProfileSubscription.unsubscribe();
    if (this.uploadResumeSubscription) this.uploadResumeSubscription.unsubscribe();

  }
}
