import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ResumeService } from '../_services/resume.service';
import { UserService } from '../_services/user.service';
import { CandidateService } from '../_services/candidate.service';

declare var Materialize: any;

@Component({
  selector: 'app-mobile-register',
  templateUrl: './mobile-register.component.html',
  styleUrls: ['./mobile-register.component.css']
})
export class MobileRegisterComponent implements OnInit {

  isLinear = true;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourFormGroup: FormGroup;

  imagePath: any;
  filepath: File;
  imgURL: any;
  fdata = new FormData();
  fileUploaded: boolean = false;
  
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  linkedIn: string;
  desiredRoles: string;
  desiredCompanies: string;
  verifyCode : string;
  desiredConnector: string;

  localRole = "candidate";
  userRoleData = 0;
  currentUserId;

  constructor(private _router: Router, 
    private _formBuilder: FormBuilder,
    private _resumeService: ResumeService,
    private _userService: UserService,
    private _candidateService: CandidateService
  ) { }

  ngOnInit(): void {
    console.log("he it's mi mobile register : ");
    this.firstFormGroup = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      linkedIn : [''],
      desiredRoles: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      desiredCompanies: ['', Validators.required],
      desiredConnector: ['', Validators.required]
    });
    this.fourFormGroup = this._formBuilder.group({
      verifyCode: ['', Validators.required]
    });
  }

  goBack(stepper: MatStepper){
    stepper.previous();
  }

  goForward(stepper: MatStepper){
    stepper.next();
  }

  sendVerifyCode(stepper: MatStepper){
    this.formSubmit(stepper);
  }

  verifyCodeSubmit(){
    //verify code here
    if(this.verifyCode == ""){
      Materialize.toast("Verification code should not be empty.", 1000, "red");
      return ;
    }

    let payload = {
      email: this.email,
      currentUserId: this.currentUserId,
      verifyCode : this.verifyCode
    }
    this._userService.verifyMobileCandidate(payload).subscribe((data) => {
      if(data){
        Materialize.toast("You have been successfully verified", 1000, "green");
        this.goToLogin();
      }
    }, (err) => {
      Materialize.toast("Verification code is wrong.", 1000, "red");
    });
  }

  fileChange(event) {
    this.imagePath = event.target.files[0].name;
    if (event.target.files) {
      if(event.target.files[0].name.endsWith(".pdf") || event.target.files[0].name.endsWith(".docx")){
        let fileList: FileList = event.target.files;
        let file: File = fileList[0];
        this.fdata.append("file", file);
        this.fileUploaded = true;
      }
    }else{
      this.fileUploaded = false;
    }
  }

  formSubmit(stepper){
    if (this.localRole == "employer") {
      this.userRoleData = 2;
    } else if (this.localRole == "recruiter") {
      this.userRoleData = 3;
    } else if (this.localRole == "candidate") {
      this.userRoleData = 4;
    }

    let payload = {
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      linkedIn: this.linkedIn,
      desiredRoles: this.desiredRoles,
      desiredCompanies: this.desiredCompanies,
      desiredConnector: this.desiredConnector,
      userRole: this.localRole,
      role: this.userRoleData
    }
    this._userService.registerMobileCandidate(payload).subscribe((data) => {
      if(data){
        this.currentUserId = data.currentUserId;
        if(this.fileUploaded){
          this._candidateService.uploadCanResume(this.fdata).subscribe((res) => {
            console.log(res);
          });
        }
        this.goForward(stepper);
      }
      
    }, (err) => {
      Materialize.toast("Email is already exists or Something went wrong.", 1000, "red");
    });
  }

  goToLogin(){
    this._router.navigate(["/login"]);
  }

}
