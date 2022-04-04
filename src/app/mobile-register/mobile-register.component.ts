import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { UserService } from '../_services/user.service';
import { CandidateService } from '../_services/candidate.service';
import { NgxSpinnerService } from "ngx-spinner";

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
  
  fileURL: string;

  loading: boolean = false;

  isEditable = true;

  @ViewChild('fileInput') fileInput : ElementRef;

  constructor(private _router: Router, 
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _candidateService: CandidateService,
    private _spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
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

  selectionChange(event, stepper){
    if(event.selectedIndex == 1){
    }
  }

  signUp(stepper: MatStepper){
    let payload = {
      email : this.email
    }
    this.loading = true;
    this._userService.checkEmailMobileCandidate(payload).subscribe((data) => {
      this.loading = false;
      if(data.status){
        this.goForward(stepper);
      }else{
        Materialize.toast("Something went wrong.", 1000, "red");  
      }
    }, (err)=>{
      Materialize.toast("Email already exists.", 1000, "red");
      this.loading = false;
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

    this.loading = true;
    let payload = {
      email: this.email,
      currentUserId: this.currentUserId,
      verifyCode : this.verifyCode
    }
    this._userService.verifyMobileCandidate(payload).subscribe((data) => {
      this.loading = false;
      if(data){
        Materialize.toast("You have been successfully verified", 1000, "green");
        this.goToLogin();
      }
    }, (err) => {
      this.loading = false;
      Materialize.toast("Verification code is wrong.", 1000, "red");
    });
  }

  openFile(){
    this.fileInput.nativeElement.click();
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

  saveData(stepper: MatStepper){
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
      role: this.userRoleData,
      fileURL: this.fileURL
    }

    this._userService.registerMobileCandidate(payload).subscribe((data) => {
      if(data){
        this.currentUserId = data.currentUserId;
        this._spinner.hide();
        this.isEditable = false;
        this.goForward(stepper);
      }
      
    }, (err) => {
      this._spinner.hide();
      Materialize.toast("Email is already exists or Something went wrong.", 1000, "red");
    });
  }

  formSubmit(stepper){
    if (this.localRole == "employer") {
      this.userRoleData = 2;
    } else if (this.localRole == "recruiter") {
      this.userRoleData = 3;
    } else if (this.localRole == "candidate") {
      this.userRoleData = 4;
    }

    this._spinner.show();
    if(this.fileUploaded){
      this._candidateService.uploadCanResume(this.fdata).subscribe((res) => {
        if(res){
          this.fileURL = res.result;
          this.saveData(stepper);
        }
      });
    }else{
      this.saveData(stepper);
    }

    
  }

  goToLogin(){
    this._router.navigate(["/login"]);
  }

}
