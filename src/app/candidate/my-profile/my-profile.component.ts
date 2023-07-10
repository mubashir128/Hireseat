import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { ResumeService } from "src/app/_services/resume.service";
import { CandidateService } from "src/app/_services/candidate.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { VideoCallingService } from "src/app/_services/video-calling.service";
import { UserService } from "src/app/_services/user.service";
import { NgxSpinnerService } from "ngx-spinner";
import { CandidateCarrerService } from "src/app/_services/candidate-carrer.service";
import { ReadResumeService } from "src/app/_services/read-resume.service";
import { JoyrideService } from "ngx-joyride";
import { DialogProfileExampleComponent } from "src/app/shared/shared-components/components/dialog-profile-example/dialog-profile-example.component";
import { MatDialog } from "@angular/material/dialog";
import { AuthenticationService } from "src/app/_services/authentication.service";
import { DialogDeleteComponent } from "src/app/shared/shared-components/components/dialog-delete/dialog-delete.component";
import { ChatGptService } from "src/app/_services/chat-gpt.service";
import { DialogOnlyTextMessageComponent } from "src/app/shared/shared-components/components/dialog-only-text-message/dialog-only-text-message.component";
import { DialogOnlyMessageComponent } from "src/app/shared/shared-components/components/dialog-only-message/dialog-only-message.component";
import { ConstantsService } from "src/app/_services/constants.service";

declare var Materialize: any;

@Component({
  selector: "app-my-profile",
  templateUrl: "./my-profile.component.html",
  styleUrls: ["./my-profile.component.css"],
})
export class MyProfileComponent implements OnInit, OnDestroy {
  // subscription
  getProfileSubscription: Subscription;
  editCandidateProfileSubscription: Subscription;
  uploadResumeSubscription: Subscription;

  candidateProfile: any;
  public editProfile: FormGroup;
  public updateProfileimg: FormGroup;
  imgURL: any;

  fileUploaded = 0;
  downloadURL = "";
  referral: any;
  errorMsg: boolean;
  fileObj: File;
  fileUrl: any;
  videoURL: any;
  imagePath: any;
  currentUserId: string | Blob;
  message: string;
  filepath: File;

  industriesAre = [];
  industries = [];

  loopSkills;
  loopIndustries;

  resumeChanged: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private resumeService: ResumeService,
    private candidateService: CandidateService,
    private router: Router,
    private videoCallingService: VideoCallingService,
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private _candidateCarrer : CandidateCarrerService,
    private _readResume : ReadResumeService,
    private readonly joyrideService: JoyrideService,
    protected dialog: MatDialog,
    protected _dialog: MatDialog,
    private _chatGptService: ChatGptService,
    private _constantsService: ConstantsService
  ) {}

  ngOnInit() {
    this.currentUserId = JSON.parse(
      localStorage.getItem("currentUser")
    ).userInfo._id;
    this.videoURL = "";
    this.updateProfileimg = this.formBuilder.group({
      file: ["", Validators.compose([Validators.required])],
    });
    this.editProfile = this.formBuilder.group({
      fullName: ["", Validators.compose([Validators.required])],
      email: ["", Validators.compose([Validators.required])],
      phoneNo: ["", Validators.compose([Validators.required])],

      jobTitle: [""],
      location: [""],
      Employers1: [""],
      Employers2: [""],
      summary: [""],
      skills: [""],
      linkedIn: [""],
      desiredRoles: [""],
      desiredCompanies: [""],
      introduceYouToo: [""],
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
      comment2: [""],
      comment3: [""],
      accomplishment1: [""],
      accomplishment2: [""],
      accomplishment3: [""],
      accomplishment4: [""],
      accomplishment5: [""],
      totalWorkExpYrs: [""],
      gender: [""],
      totalWorkExpMonths: [""],
      locationPref: [""],
      // shareProfile: [false],
      fileURL: [""],
      asARecruiterWithLimit : [""]
    });

    this.loopSkills = this._candidateCarrer.getLoopSkills();
    this.loopIndustries = this._candidateCarrer.getLoopIndustries();

    this.getProfile();
    this.openTextDialog();

    // setTimeout(()=>{
    //   this.tourStart();
    // }, 500);
  }

  openTextDialog(){
    let loginCount = JSON.parse(localStorage.getItem("currentUser")).userInfo.loginCount;
    let beforeMyProfileDialog = JSON.parse(this.userService.getBeforeMyProfileDialog());
    
    if(loginCount == 1 && !beforeMyProfileDialog){
      const dialogOnlyTextRef = this.dialog.open(DialogOnlyMessageComponent,{
        data: {
          disableClose: true,
          dialogText1 : ' "Why should I hire you? Give me 3 reasons." ',
          dialogText2 : "Surprisingly most candidates do not know the answer.",
          dialogText3 : "Upload your resume and ChatGPT can help."
        },
      });
  
      dialogOnlyTextRef.afterClosed().subscribe(result => {
        this.userService.setBeforeMyProfileDialog();
      });
    }
  }

  tourStart(){
    let loginCount = JSON.parse(localStorage.getItem("currentUser")).userInfo.loginCount;
    let beforeMyProfileWalkthrough = JSON.parse(this.userService.getBeforeMyProfileWalkthrough());
    if(loginCount !== 1 || beforeMyProfileWalkthrough){
      return ;
    }

    this.joyrideService.startTour({ steps: ['firstStep','secondStep','thirdStep' , 'forthStep', 'fifthStep', 'sixthStep', 'seventhStep', 'eightStep', 'ninthStep', 'tenthStep'], themeColor: '', showPrevButton: false}).subscribe((step) => {
        /*Do something*/
      }, (err) => {
        /*handle error*/
        this.onDone();
      }, () => {
        /*Tour is finished here, do something*/
        this.onDone();
      });
  }

  onDone(){
    this.userService.setBeforeMyProfileWalkthrough();
  }

  getIndustries() {
    this.getProfileSubscription = this.candidateService
      .getCandidateIndustries()
      .subscribe((res) => {
        if (res) {
          res.industries.forEach((item1, index1) => {
            let temp = false;
            this.candidateProfile.industries.forEach((item2, index2) => {
              if (item1._id === item2._id) {
                temp = true;
                this.industries.push(item1);
              }
            });
            item1.valueType = temp;
            this.industriesAre.push(item1);
          });
        }
      });
  }

  updateProfileImg() {
    const fd = new FormData();
    if (!this.imagePath) {
      Materialize.toast(
        "Please click on the plus Icon to upload a Picture !",
        4000
      );
    } else {
      fd.append("file", this.imagePath[0], this.imagePath[0].name);
      fd.append("id", this.currentUserId);

      this.userService.updateProfileImg(fd).subscribe(
        (res) => {
          Materialize.toast(res.message, 1000);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  get f() {
    return this.editProfile.controls;
  }
  preview(files) {
    if (files.length === 0) return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
    this.filepath = <File>files[0];

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
    if (this.filepath) this.updateProfileImg();
  }
  fileChange(event) {
    if (event.target.files) {
      if(event.target.files[0].name.endsWith(".pdf") || event.target.files[0].name.endsWith(".docx")){
        this.fileUploaded = 0;
        let fileList: FileList = event.target.files;
        let file: File = fileList[0];
        var fdata = new FormData();
        fdata.append("image", file);
        this.uploadResumeSubscription = this.resumeService
          .uploadResume(fdata)
          .subscribe(
            (data: any) => {
              this.resumeChanged = true;
              this.getProfile();
              if (data.result) {
                this.downloadURL = data.result;
                // this.resume.fileURL = data.result;
                this.fileUploaded = 2;
                Materialize.toast("Resume Uploaded Successfully !", 1000);
                this.submit();
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
      }else{
        Materialize.toast("Only allow .PDF and .DOCX extension files", 1500, 'red');
      }
    }
  }
  getProfile() {
    this.getProfileSubscription = this.candidateService
      .getCandidateProfile()
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.candidateProfile = res;

          if(this.resumeChanged){
            this.getSummaryFromChatGPT(res.resumeDataIs);
            this.getThreePointsFromChatGPT(res.resumeDataIs);
            this.getAccomplishmentsFromChatGPT(res.resumeDataIs);
          }

          this.getIndustries();
          this.editProfile.patchValue({
            fullName: res.candidate_id.fullName,
            email: res.candidate_id.email,
            phoneNo: res.candidate_id.phoneNo,
            jobTitle: res.jobTitle,
            location: res.location,
            desiredRoles: res.desiredRoles,
            desiredCompanies: res.desiredCompanies,
            introduceYouToo : res.introduceYouToo,
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
            comment2: res.comment2,
            comment3: res.comment3,
            summary: res.summary,
            accomplishment1: res.accomplishment1,
            accomplishment2: res.accomplishment2,
            accomplishment3: res.accomplishment3,
            accomplishment4: res.accomplishment4,
            accomplishment5: res.accomplishment5,
            totalWorkExpYrs: res.totalWorkExpYrs,
            totalWorkExpMonths: res.totalWorkExpMonths,
            locationPref: res.locationPref,
            // shareProfile: res.shareProfile,
            fileURL: res.fileURL,
            asARecruiterWithLimit : res.candidate_id.asARecruiterWithLimit
          });
          // console.log('file ', res.fileURL.length);

          if (res.fileURL.length > 0) {
            this.fileUploaded = 2;
            this.downloadURL = res.fileURL;
          } else {
            this.fileUploaded = 0;
          }
          if (res.candidate_id.profileimage) {
            this.imgURL = res.candidate_id.profileimage;
          }
          if (res.recordedId) {
            this.viewVideo(res.recordedId);
          }

          //here for resume data reading and patching.
          // if(res.resumeDataIs !== undefined && (this.editProfile.controls['comments'].value == "" || this.editProfile.controls['comment2'].value == "" || this.editProfile.controls['comment3'].value == "")){
          if(res.resumeDataIs !== undefined){
            this.handleResumeData(res);
          }

        },
        (err) => {
          // console.log(err);
          Materialize.toast("Something Went Wrong !", 1000);
        }
      );
  }

  getSummaryFromChatGPT(data){
    let prompt = this._constantsService.summaryPrompt;
    this._chatGptService.getChatGPTResponse(data, prompt).subscribe(res=>{
      if(res?.choices[0]?.message?.content){
        this.editProfile.patchValue({
          summary: res?.choices[0]?.message?.content
        });
      }
    });
  }

  getThreePointsFromChatGPT(data){
    let prompt = this._constantsService.hire3PointsPrompt;
    this._chatGptService.getChatGPTResponse(data, prompt).subscribe(res=>{
      if(res?.choices[0]?.message?.content){
        let responseText = res?.choices[0]?.message?.content;
        let result = this._chatGptService.convertChatGPTResponse(responseText);
        this.editProfile.patchValue({
          comments: result[0],
          comment2: result[1],
          comment3: result[2]
        });
      }
    });
  }

  getAccomplishmentsFromChatGPT(data){
    let prompt = this._constantsService.accomplishmentPrompt;
    // this.spinner.show();
    const dialogOnlyTextRef = this.dialog.open(DialogOnlyTextMessageComponent,{
      data: {
        disableClose: true,
        dialogText : "Please wait as we load responses from Chatgpt. This may take up to a minute."
      },
    });

    dialogOnlyTextRef.afterClosed().subscribe(result => {
    });

    this._chatGptService.getChatGPTResponse(data, prompt).subscribe(res=>{
      dialogOnlyTextRef.close();
      if(res?.choices[0]?.message?.content){
        let responseText = res?.choices[0]?.message?.content;
        let result = this._chatGptService.convertChatGPTResponse(responseText);
        this.editProfile.patchValue({
          accomplishment1: result[0],
          accomplishment2: result[1],
          accomplishment3: result[2],
          accomplishment4: result[3],
          accomplishment5: result[4]
        });
        this.submit();
        // Materialize.toast("Please click Save button !", 1500);
      }
    });
  }

  async seeSuggestions(){
    let resumeData = this.candidateProfile;
    let finalStatementsArr = [];
    finalStatementsArr = await this._readResume.readResume(resumeData);
    //combine first three statements into three boxes if they are empty.
    finalStatementsArr.forEach((val ,index)=>{
      switch(index){
        case 0 : 
          if(this.editProfile.controls['comments'].value == ""){
            this.editProfile.patchValue({
              comments : val.stm
            });
          }
          break;
        case 1 : 
          if(this.editProfile.controls['comment2'].value == ""){
            this.editProfile.patchValue({
              comment2 : val.stm
            });
          }
          break;
        case 2 : 
          if(this.editProfile.controls['comment3'].value == ""){
            this.editProfile.patchValue({
              comment3 : val.stm
            });
          }
          break;
        default : 
          break;
      }
    });
  }

  async handleResumeData(resumeData){  
    //update Skills and Industry Experience using skills.
    Object.entries(this.loopSkills).forEach((values, index) => {
      let skillsAre = this.editProfile.value["skills"].toLowerCase();
      if(resumeData.resumeDataIs.toLowerCase().indexOf(values[0].toLowerCase()) !== -1){
        
        if(skillsAre.indexOf(values[0].toLowerCase()) == -1){
          this.editProfile.patchValue({
            skills : skillsAre + ", "+ values[0].toLowerCase()
          });
        }
      }
    });
    
    //update Skills and Industry Experience using industries.
    Object.entries(this.loopIndustries).forEach((values, index) => {
      let skillsAre = this.editProfile.value["skills"].toLowerCase();
      if(resumeData.resumeDataIs.toLowerCase().indexOf(values[0].toLowerCase()) !== -1){
        if(skillsAre.indexOf(values[0].toLowerCase()) == -1){
          this.editProfile.patchValue({
            skills : skillsAre + ", "+ values[0].toLowerCase()
          });
        }
      }
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
    if (this.downloadURL) {
      this.editProfile.patchValue({
        fileURL: this.downloadURL,
      });
    } else {
      Materialize.toast("Resume not selected", 1000);
    }
    this.editProfile.addControl(
      "candidateId",
      new FormControl(this.candidateProfile._id)
    );

    this.editProfile.addControl("industries", new FormControl(this.industries));

    // if (this.editProfile.valid) {
    this.editCandidateProfileSubscription = this.candidateService
      .editProfile(this.editProfile.value)
      .subscribe(
        (res) => {
          if (res) {
            Materialize.toast(res.msg, 1000);
            this.candidateProfile = res.data;
            //here for resume data reading and patching.
            // if(res.data.resumeDataIs !== undefined && (this.editProfile.controls['comments'].value == "" || this.editProfile.controls['comment2'].value == "" || this.editProfile.controls['comment3'].value == "")){
            if(res.data.resumeDataIs !== undefined){
              this.handleResumeData(res.data);
            }
          }
        },
        (err) => {
          Materialize.toast("Something Went Wrong !", 1000);
        }
      );
    // } else {
    //   Materialize.toast("Please complete the form!", 3000);
    // }
  }

  navigateToRoom() {
    this.router.navigate([
      "video-call/" + "self-record@" + this.candidateProfile._id,
    ]);
  }

  onFilePicked(event: Event): void {
    this.errorMsg = false;
    console.log(event);
    const FILE = (event.target as HTMLInputElement).files[0];
    this.fileObj = FILE;
    console.log(this.fileObj);
    if (this.fileObj) {
      this.onFileUpload();
    }
  }

  onFileUpload() {
    console.log("");

    if (!this.fileObj) {
      this.errorMsg = true;
      return;
    }
    const fileForm = new FormData();
    fileForm.append("file", this.fileObj);
    this.candidateService.uploadVideo(fileForm).subscribe((res) => {
      this.fileUrl = res;
      console.log(res);
    });
  }

  seeExampleModal() {

    const dialogProfileExampleRef = this.dialog.open(DialogProfileExampleComponent,{
      data: {
        dialogType : "Example",
        dialogTitle : "Example"
      }
    });

    dialogProfileExampleRef.afterClosed().subscribe(result => {
    });
  }

  ngOnDestroy() {
    if (this.editCandidateProfileSubscription)
      this.editCandidateProfileSubscription.unsubscribe();
    if (this.getProfileSubscription) this.getProfileSubscription.unsubscribe();
    if (this.uploadResumeSubscription)
      this.uploadResumeSubscription.unsubscribe();

    this.onDone();
    this.joyrideService.closeTour();
  }

  handleIndustries($event, _id) {
    let selectIndex = 0;
    this.industriesAre.forEach((item, index) => {
      if (item._id === _id) {
        selectIndex = index;
      }
    });

    if ($event.target.checked) {
      this.industries.push(this.industriesAre[selectIndex]);
    } else {
      this.industries.forEach((item, index) => {
        if (item._id === _id) {
          this.industries.splice(index, 1);
        }
      });
    }
  }

  checkRequiredField(event) {
    if (event.target.checked == true) {
      // const invalid = [];
      const controls = this.editProfile.controls;
      if (
        controls["fullName"].value == "" ||
        controls["jobTitle"].value == "" ||
        controls["email"].value == "" ||
        controls["linkedIn"].value == "" ||
        controls["skills"].value == "" ||
        controls["desiredRoles"].value == ""
      ) {
        event.preventDefault();
        // controls["shareProfile"].setValue(false);
        Materialize.toast("fill required field", 1000);
      }
      // for (const formControl in controls){
      //   console.log(formControl)
      //   if(controls[formControl].value == "" || controls[formControl].invalid){
      //       invalid.push(formControl)
      //   }
      // }
      // console.log(invalid);
      // for (const name in controls) {
      //     if (controls[name].invalid) {
      //         invalid.push(name);
      //     }
      // }
      // return invalid;
      let payLoad = {
        _id: this.candidateProfile._id,
      };
      this.editCandidateProfileSubscription = this.candidateService
        .sharedCandidateProfile(payLoad)
        .subscribe(
          (res) => {
            if (res) {
              Materialize.toast(res.msg, 1000);
            }
          },
          (err) => {
            Materialize.toast("Something Went Wrong !", 1000);
          }
        );
    }
  }

  previewProfile(){
    const payload = {
      recipientEmail: "spapali@hireseat.com",
      cc: this.editProfile.get("email").value,
      bcc: "",
      fullName: this.editProfile.get("fullName").value,
      subject: "subject",
      comment: this.editProfile.get("comments").value,
      comment2: this.editProfile.get("comment2").value,
      comment3: this.editProfile.get("comment3").value,
      senderName : "contact@hireseat",
      fileURL : this.editProfile.get("fileURL").value,
      recipientName : "Sujith",
      linkedIn : this.editProfile.get("linkedIn").value
    };

    this.candidateService.sharePreviewEmail(payload).subscribe((res) => {
      if(res){
        Materialize.toast(res.msg, 1000);
        console.log("res : ",res);
      }
    }, (err) => {
      Materialize.toast("Something Went Wrong !", 1000);
    });

  }

  changedValue(event){
    this.userService.updateAsARecruiter({ asARecruiterWithLimit : event.target.checked }).subscribe((res) => {
    }, (error) => {
      console.log(error);
    });
  }
}
