
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../_services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { InteractCompService } from 'src/app/_services/interact-comp.service';

declare var jQuery: any;

@Component({
  selector: 'app-askbutton',
  templateUrl: './askbutton.component.html',
  styleUrls: ['./askbutton.component.css']
})
export class AskbuttonComponent implements OnInit {
  verifyEmail: FormGroup;
  verifyOtp: FormGroup;
  askQues: FormGroup;
  verifyEmailData: any;
  verifyOtpData; any;
  askQuesData: any;
  verfStatus: boolean = false;
  msgForPopup = '';
  askusersData: any;
  submitted = false;
  emailSubmitted = false;
  otpSubmitted = false;

  loggedInUser: any;
  isLoggedIn: boolean = false;
  isEmployer: boolean = false;
  isRecruiter: boolean = false;
  isAdmin: boolean = false;
  isSuperAdmin: boolean = false;
  isEnterprise: boolean = false;
  isCandidate: boolean = false;

  textFeildDivQNone;
  textFeildDivQ;

  constructor(private formBuilder: FormBuilder, private router: Router, private _Userservice: UserService, private route: ActivatedRoute, private _interactComp: InteractCompService) {
    this.loggedInUser = this._Userservice.getUserData();
    if (this.loggedInUser != "no") {
      this.isLoggedIn = true;
      if (this.loggedInUser.userRole == "employer") {
        this.isEmployer = true;
      } else if (this.loggedInUser.userRole == "recruiter") {
        this.isRecruiter = true;
      } else if (this.loggedInUser.userRole == "admin") {
        this.isAdmin = true;
      } else if (this.loggedInUser.userRole == "super-admin") {
        this.isSuperAdmin = true;
      } else if (this.loggedInUser.userRole == "enterprise") {
        this.isEnterprise = true;
      } else if (this.loggedInUser.userRole == "candidate") {
        this.isCandidate = true;
      }
    }
  }
  ngOnInit() {
    this.verifyEmail = this.formBuilder.group({
      emailVerify: ['', [Validators.required, Validators.email]]

    });
    this.verifyOtp = this.formBuilder.group({
      otpVerify: ['', [Validators.required]]
    });
    this.askQues = this.formBuilder.group({
      addQuestions: ['', [Validators.required]]
    });
    this.askusersData = this._Userservice.getaskQuesUserId();
    jQuery('.modal').modal();

  }

  showforumPopup1() {
    jQuery('#forumsPop1').modal('open');
  }
  emailConfirmPopup() {
    jQuery('#emailConfirmPop').modal('open');

  }
  closeEmailConfirmpopup() {
    jQuery('#emailConfirmPop').modal('close');
  }
  closeForumModel() {
    jQuery('#forumsPop1').modal('close');
  }
  get f() { return this.verifyEmail.controls; }
  get otpVali() { return this.verifyOtp.controls; }
  // get quesValid(){return this.askQues.controls;}

  verifyUser() {
    this.submitted = true;
    if (this.verifyEmail.invalid) {
      return;
    }
    this.verifyEmailData = (this.verifyEmail.value);
    const email = this.verifyEmailData;

    this._Userservice.userverification(email).subscribe(
      res => {
        // console.log(res)
      },
      err => { console.log(err) }
    );
  }
  onSubmit() {
    this.emailSubmitted = true;
    if (this.verifyEmail.invalid) {
      return;
    }
    this.verifyEmailData = (this.verifyEmail.value);
    //console.log(this.verifyEmailData.emailVerify)
    const email = this.verifyEmailData;

    this._Userservice.sendEmail(email).subscribe(
      res => {
        if (res.status = 'success') {
          this.msgForPopup = res.message;
          //console.log(res)
          if (res.data) {
            this.verfStatus = res.data.isVerified;
            localStorage.setItem('askQuestionUser', JSON.stringify(res.data))
          }
          this.emailConfirmPopup();
          setTimeout(()=>{
            this.closeEmailConfirmpopup();
          },2000);
        }
      },
      err => console.log(err))

  }
  //verify otp functionality
  checkOtp() {
    this.otpSubmitted = true;
    if (this.verifyOtp.invalid) {
      return;
    }
    this.verifyEmailData = (this.verifyEmail.value);
    this.verifyOtp.value['email'] = this.verifyEmailData.emailVerify;

    this.verifyOtpData = (this.verifyOtp.value);
    //console.log(this.verifyOtpData);
    const data = this.verifyOtpData;
    this._Userservice.checkOtpEm(data).subscribe(
      res => {
        //console.log(res);
        this.verfStatus = res.data.isVerified;
        //console.log(res.data)
        localStorage.setItem('askQuestionUser', JSON.stringify(res.data))
        if (res.status = 'success') {

          this.msgForPopup = res.message;
          this.emailConfirmPopup();
        } else if (res.status = 'failed') {
          this.msgForPopup = res.message;
          this.emailConfirmPopup();
        }
        setTimeout(()=>{
          this.closeEmailConfirmpopup();
        },2000);
      },
      err => {
        //console.log(err)
        this.msgForPopup = err;
        this.emailConfirmPopup();

      }


    )

  }
  //add question functionality
  addQuest() {
    this.askusersData = this._Userservice.getaskQuesUserId();
    let userD = JSON.parse(this.askusersData);

    if(this.isCandidate){
      this.askQuesData = (this.askQues.value);
      const data = this.askQuesData;
      data.email = this.loggedInUser.email;
      this._Userservice.addCandidateQuestion(data).subscribe(
        res => {
          if (res.status = 'success') {
            this.loadData(res);
          }
        }, err => {
          console.log(err);
        }
      );
    }else if (userD == null) {
      this.msgForPopup = 'Please Verfiy with Email  then ask Questions';
      this.emailConfirmPopup();
    } else if (userD.isVerified == true || this.verfStatus == true) {
      this.submitted = true;
      this.askQuesData = (this.askQues.value);
      const data = this.askQuesData;
      data.otp = userD.Otp;
      data.email = userD.email;

      this._Userservice.addQuestion(data).subscribe(
        res => {
          if (res.status = 'success') {
            this.loadData(res);
          }
        }, err => {
          console.log(err);
        }
      );

    }
    else {
      this.askQuesData = (this.askQues.value);

      const data = this.askQuesData;
      data.otp = userD.Otp;
      data.email = userD.email;
      //console.log(data)
      this._Userservice.addQuestion(data).subscribe(res => {
        if (res.status = 'success') {
          this.loadData(res);
        }
      }, err => {
        console.log(err)
      });
    }
  }

  loadData(res) {
    this.closeForumModel();
    this.msgForPopup = res.message;
    this.emailConfirmPopup();
    setTimeout(() => {
      this.closeEmailConfirmpopup();
    }, 2000);
    if(this._Userservice.getUser() === "no"){
      this._interactComp.loadData(res.data);
    }
  }

}
