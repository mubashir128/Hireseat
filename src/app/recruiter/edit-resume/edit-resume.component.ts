import {
  Component,
  Input,
  OnChanges,
  Output,
  EventEmitter,
  AfterViewInit,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { Resume } from "../../models/resume";
import { Router } from "@angular/router";
import { ResumeService } from "../../_services/resume.service";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { VideoCallingService } from "../../_services/video-calling.service";
import { Subscription } from "rxjs";

declare var jQuery: any;
import * as $ from "jquery";
import videojs from "video.js";

declare var Materialize: any;

@Component({
  selector: "app-edit-resume",
  templateUrl: "./edit-resume.component.html",
  styleUrls: ["./edit-resume.component.css"],
})
export class EditResumeComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @ViewChild("playVideo") videojsPlay: ElementRef;
  player: videojs.Player;

  bookmarkSubscription: Subscription;
  askQuestionSubscription: Subscription;
  @Input() resume: Resume;
  @Output() back = new EventEmitter();
  @Output() getAllResume = new EventEmitter();
  QuestionsGroup: FormGroup;
  editResumeFrm: FormGroup;
  downloadURL: string;
  fileUploaded = 0;
  questionNumber: any;
  questionsByRecruiter: any;
  videoURL: any;
  candidateId: any;
  recruiterReview: any;
  constructor(
    private formBuilder: FormBuilder,
    private resumeService: ResumeService,
    private router: Router,
    private videoCallingService: VideoCallingService
  ) {
    // accept questions form
    this.QuestionsGroup = this.formBuilder.group({
      question1: new FormControl(null, [Validators.max(100)]),
      timeStamp1: new FormControl(null),

      question2: new FormControl(null, [Validators.max(100)]),
      timeStamp2: new FormControl(null),

      question3: new FormControl(null, [Validators.max(100)]),
      timeStamp3: new FormControl(null),

      question4: new FormControl(null, [Validators.max(100)]),
      timeStamp4: new FormControl(null),

      question5: new FormControl(null, [Validators.max(100)]),
      timeStamp5: new FormControl(null),
    });
    // end of accept questions
  }
  ngOnChanges() {
    jQuery(".modal").modal();
    jQuery("select").material_select();
  }
  ngOnInit() {
    console.log(this.resume);
    this.candidateId = this.resume._id;
    // console.log(this.candidateId);
    if (this.resume) {
      this.fileUploaded = 2;
      this.downloadURL = this.resume.fileURL;
      this.editResumeFrm = this.formBuilder.group({
        candidateName: ["", Validators.compose([Validators.required])],
        socialSecurityNum: [""],
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
        comments: [""],
      });
    }
    if (this.resume["interviewLinkedByRecruiter"]) {
      this.viewVideo(this.resume["interviewLinkedByRecruiter"]);
    }
    this.recruiterReview = this.resume["recruiterReview"];
    this.questionsByRecruiter = this.resume["questionsByRecruiter"][0];
    if (this.resume) {
      this.editResumeFrm.setValue({
        candidateName: this.resume.candidateName,
      });
    }
    // setting up values for QuestionsGroup
    if (this.questionsByRecruiter) {
      this.QuestionsGroup.setValue({
        question1: this.questionsByRecruiter.question1,
        question2: this.questionsByRecruiter.question2,
        question3: this.questionsByRecruiter.question3,
        question4: this.questionsByRecruiter.question4,
        question5: this.questionsByRecruiter.question5,
        timeStamp1: this.questionsByRecruiter.timeStamp1,
        timeStamp2: this.questionsByRecruiter.timeStamp2,
        timeStamp3: this.questionsByRecruiter.timeStamp3,
        timeStamp4: this.questionsByRecruiter.timeStamp4,
        timeStamp5: this.questionsByRecruiter.timeStamp5,
      });
    }

    jQuery("#resume-preview").height(jQuery("#resume-info").height());
  }
  ngAfterViewInit() {
    // instantiate Video.js
    if (this.videoURL) {
      this.player = videojs(
        this.videojsPlay.nativeElement,
        {
          autoplay: true,
          controlls: true,
        },
        () => {
          // console.log('onPlayerReady', this);
        }
      );
    }
  }

  questionConfirmPopup() {
    jQuery("#quesPop").modal("open");
  }
  closeQuestionConfirmpopup() {
    jQuery("#quesPop").modal("close");
  }
  get f() {
    return this.editResumeFrm.controls;
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
            this.resume.fileURL = data.result;
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

  submit() {
    if (this.editResumeFrm.valid && this.resume.fileURL != "") {
      this.resumeService.updateResume(this.resume).subscribe(
        (data: any) => {
          if (data.res === "updated") {
            Materialize.toast("Resume Updated Successfully !", 2000);
            // this.router.navigate(['recruiter/resume-list']).then(() => window.location.reload());
            // this.router.navigate(['recruiter/resume-list']);
            this.goBack();
          } else {
            Materialize.toast("Something Went Wrong !", 1000);
          }
        },
        (error) => {
          console.log(error);
          if (error === "Conflict") {
            Materialize.toast(
              "Social Security Number Should be unique !",
              1000
            );
          } else if (error) {
            Materialize.toast("Something Went Wrong !", 1000);
          }
        }
      );
    } else {
      Materialize.toast("Please Fill the form fields !", 1000);
    }
  }

  goBack() {
    this.getAllResume.next();
    this.back.emit();
  }

  onSubmitQuestions() {
    // console.log(this.QuestionsGroup.value);
    // convert mins into seconds
    this.QuestionsGroup.get("timeStamp1").patchValue(
      this.minsToSeconds(this.QuestionsGroup.value.timeStamp1)
    );
    this.QuestionsGroup.get("timeStamp2").patchValue(
      this.minsToSeconds(this.QuestionsGroup.value.timeStamp2)
    );
    this.QuestionsGroup.get("timeStamp3").patchValue(
      this.minsToSeconds(this.QuestionsGroup.value.timeStamp3)
    );
    this.QuestionsGroup.get("timeStamp4").patchValue(
      this.minsToSeconds(this.QuestionsGroup.value.timeStamp4)
    );
    this.QuestionsGroup.get("timeStamp5").patchValue(
      this.minsToSeconds(this.QuestionsGroup.value.timeStamp5)
    );

    const payload = {
      resumeId: this.candidateId,
      questions: this.QuestionsGroup.value,
    };
    // console.log(payload);
    this.askQuestionSubscription = this.videoCallingService
      .RecruiterQuestionsForCandidate(payload)
      .subscribe(
        (res) => {
          if (res) {
            // console.log('**********RES after adding quesitons*****************', res);
            this.QuestionsGroup.reset();
            this.closeQuestionConfirmpopup();
          }
        },
        (err) => console.log("error while adding questions", err)
      );
  }
  minsToSeconds(min) {
    if (typeof min === "string") {
      if (!min.includes(":")) {
        const secOnly = parseInt(min, 10);
        return secOnly;
      } else {
        const intoSeconds = min.split(":");
        const finalSeconds =
          Number(intoSeconds[0]) * 60 + Number(intoSeconds[1]);
        return finalSeconds;
      }
    } else {
      return min;
    }
  }

  bookmarkCandidate(status) {
    const payload = {
      resumeId: this.candidateId,
      status: status,
    };
    this.bookmarkSubscription = this.videoCallingService
      .bookmarkCandidate(payload)
      .subscribe(
        (res) => {
          if (res) {
            this.resume["bookmark"] = res.status;
            res.status
              ? Materialize.toast("Bookmarked", 1000)
              : Materialize.toast("Removed from bookmarks", 1000);
          }
        },
        (err) => {
          console.log("error from bookmark call", err);
        }
      );
  }

  setCurrentTimeEvent(obj){
    this.setCurrentTime(obj.seconds , obj.questionNumber);
  }

  setCurrentTime(seconds, questionNumber) {
    this.questionNumber = questionNumber;
    try {
      this.videojsPlay.nativeElement.currentTime = seconds;
    } catch (e) {
      console.log(e);
    }
  }
  
  questionsPopUp() {
    this.questionConfirmPopup();
  }

  ngOnDestroy(): void {
    if (this.askQuestionSubscription) {
      this.askQuestionSubscription.unsubscribe();
    }
    if (this.bookmarkSubscription) {
      this.bookmarkSubscription.unsubscribe();
    }
  }
}
