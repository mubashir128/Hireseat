import {
  Component,
  OnInit,
  OnChanges,
  OnDestroy,
  Input,
} from "@angular/core";
import {
  FormBuilder
} from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { NgxSpinnerService } from "ngx-spinner";
import { Subject } from "rxjs";
import { ResumeService } from "src/app/_services/resume.service";
import { ShareVideoService } from "src/app/_services/share-video.service";
import { Candidate, UserService } from "src/app/_services/user.service";
import { VideoCallingService } from "src/app/_services/video-calling.service";
import { WebsocketService } from "src/app/_services/websocket.service";
import { CandidateService } from "src/app/_services/candidate.service";
import { SubscriberslistService } from "src/app/_services/subscriberslist.service";
import { ConstantsService } from "src/app/_services/constants.service"
import { BiddingEventService } from "src/app/_services/bidding-event.service";
import { ReadResumeService } from "src/app/_services/read-resume.service";
import { AbstractSharedComponent } from "src/app/abstract-classes/abstract-shared.component";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { JoyrideService } from "ngx-joyride";
import { ConferenceRoomService } from "src/app/_services/conference-room.service";
import { shareConstants } from "../app-list/app-list.component";
import { DialogSelectUserComponent } from "../dialog-select-user/dialog-select-user.component";
import { ChatGptService } from "src/app/_services/chat-gpt.service";
import { DialogOnlyTextMessageComponent } from "../dialog-only-text-message/dialog-only-text-message.component";
import { DialogInputBigMessageComponent } from "../dialog-input-big-message/dialog-input-big-message.component";
import { eTypes } from "src/app/_services/post-job.service";

declare var jQuery;
declare var Materialize;
@Component({
  selector: "app-shared-candidate-profiles",
  templateUrl: "./shared-candidate-profiles.component.html",
  styleUrls: ["./shared-candidate-profiles.component.css"],
})
export class SharedCandidateProfilesComponent extends AbstractSharedComponent implements OnInit, OnChanges, OnDestroy {

  // observer
  sharedProfileObserver = new Subject();
  sharedProfileObserver$ = this.sharedProfileObserver.asObservable();

  comment1 = "";
  comment2 = "";
  comment3 = "";
  candidateNameIs = "";

  showLoader: boolean = true;

  @Input() companyName = "";
  throughRoute: boolean = false;
  throughProfileId;

  downloadURL: string = "";
  resumeChanged: boolean = false;

  candidate: Candidate = new Candidate();

  constructor(
    protected resumeService: ResumeService,
    protected _sanitizer: DomSanitizer,
    protected videoCallingService: VideoCallingService,
    protected userService: UserService,
    protected spinner: NgxSpinnerService,
    protected shareVideoService: ShareVideoService,
    protected formBuilder: FormBuilder,
    private _socket: WebsocketService,
    protected candidateService: CandidateService,
    protected _subList: SubscriberslistService,
    private _constants: ConstantsService,
    private _router: Router,
    protected _bidEventService: BiddingEventService,
    protected _readResume : ReadResumeService,
    public dialog: MatDialog,
    private readonly _joyrideService: JoyrideService,
    private _conferenceRoom : ConferenceRoomService,
    private _route: ActivatedRoute,
    private _chatGptService: ChatGptService
  ) {
    super(dialog, shareVideoService, userService, formBuilder, _bidEventService, _sanitizer, candidateService, _readResume, resumeService, _subList, spinner, videoCallingService);

    shareVideoService._sharableResumeRecruiter.subscribe((res) => {
      this.shareResume = res;
    });

    this._route.queryParams.subscribe(params => {
      this.throughProfileId = params['profileId'];
      this.searchTerm = params['fullName'] ? params['fullName'] : "";
      this.throughRoute = true;
    });
    this.searchTerm = (this.searchTerm !== "") ? this.searchTerm : (this.companyName !== "") ? this.companyName : "";
  }

  ngOnChanges() {
    this.setModel();
  }

  async ngOnInit() {
    this.setModel();

    await this._socket.removeListener({ type: this._constants.sharedProfileType });
    this._socket.addListener({
      type: this._constants.sharedProfileType,
      callback: this.sharedProfileObserver,
    });

    this.getTopRecruiterList();
    this.getIndustries();
    this.getProfiles();

    this.debounceSearchForSkills();

    this.sharedProfileObserver$.subscribe((res: any) => {
      this.handleProfileData(res);
    });

    setTimeout(()=>{
      this.tourStart();
    }, 500);
  }

  tourStart(){
    let loginCount = JSON.parse(localStorage.getItem("currentUser")).userInfo.loginCount;
    let beforeSharedWalkthrough = JSON.parse(this.userService.getBeforeSharedWalkthrough());
    
    if(loginCount == 1){
      if(!beforeSharedWalkthrough){
        this.joyRide();
      }
    }else if(!beforeSharedWalkthrough){
      this.joyRide();
    }
  }

  joyRide(){
    this._joyrideService.startTour({ steps: ['firstStep'], themeColor: '', showPrevButton: false}).subscribe((step) => {
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
    this.userService.setBeforeSharedWalkthrough();
  }

  handleProfileData(res: any) {
    switch (res.subType) {
      case this._constants.getAllSharedProfiles:
        this.showLoader = false;
        this.resumes = res.data;
        this.scrollAndBorder();
        this._subList.loaderList.next({type : "0"});
        if(this.loggedUser.userRole == 'candidate' && this.resumes.length == 0){
          this.editUserProfile();
        }
        break;
      case this._constants.addComment:
        this.addCommentToCommets(res);
        break;
      case this._constants.addNote:
        this.addNoteToNoteSection(res);
        break;
      case this._constants.likeComment:
        this.addLikeToComment(res);
        break;
      case this._constants.replyComment:
        this.addReplyToComment(res);
        break;
      case this._constants.shareVideoViaRecruiterEmail:
        this.handleResponse(res.result);
        break;
      case this._constants.editComment:
        this.editRespectedComment(res);
        break;
      case this._constants.deleteComment:
        this.deleteRespectedComment(res);
        break;
      case this._constants.generateLink:
        this.addCreatedLink(res);
        break;
      case this._constants.getAllSharedProfilesClients:
        res.data.forEach((profile, index) => {
          if(profile.candidate_id){
            this.clients.push(profile.candidate_id);
          }
        });
        break;
      default:
        break;
    }
  }

  scrollAndBorder(){
    if(this.throughRoute){
      setTimeout(()=>{
        this.handleToggleSign({searchTab :  true});
        var scrollPos =  jQuery("#profile_"+this.throughProfileId).offset().top - 20;
        jQuery(window).scrollTop(scrollPos);
        jQuery("#profile_"+this.throughProfileId).css("border","1px solid red");
      }, 1000);
    }
  }

  handleResponse(res) {
    if (res.message) {
      Materialize.toast(res.message, 3000, "green");
      Materialize.toast("You gained 200 recruiter karma points", 4000, "blue");

      let eventObj = {
        pointer: "ratingPoints",
        subType: "increse",
        increseCount: this._constants.sharedPoints,
      };
      this._subList.recruiterPoints.next(eventObj);

      eventObj.pointer = "sharePoints";
      this._subList.recruiterPoints.next(eventObj);
    } else {
      Materialize.toast(res.error, 3000, "red");
    }

    jQuery("#shareEmailModal").modal("close");
    this.spinner.hide();
  }

  getIndustries() {
    this.getProfileSubscription = this.candidateService.getCandidateIndustries().subscribe((res) => {
      if (res) {
        this.industriesAre = res.industries;
      }
    });
  }

  getProfiles() {
    this._subList.loaderList.next({type : "1"});
    this._socket.sendMessage({
      type: this._constants.sharedProfileType,
      data: {
        subType: this._constants.getAllSharedProfiles,
      },
    });

    this._socket.sendMessage({
      type: this._constants.sharedProfileType,
      data: {
        subType: this._constants.getAllSharedProfilesClients,
      },
    });

    if (this.loggedUser.userRole === "candidate") {
      this.myProfile();
    }
  }

  disabledDay(date) { }

  ngAfterViewInit() {
    this.videoSet();
  }

  showShareTouserModal(){
    this.finalRecruitersAre = [];
    let payload = {
      dialogType : "shareToUsers",
      dialogTitle : "Share to Users",
      topRecruiters : this.topRecruiters,
      loggedUser : this.loggedUser,
      finalRecruitersAre : this.finalRecruitersAre
    };
    this.showShareTouserModalSuper(payload, this.showShareTouserModalSuperCallback);
  }

  showShareTouserModalSuperCallback(result, THIS){
    THIS.shareToUsers(result);
  }

  // share process
  showShareModal(resume) {
    let cc = resume.candidateKey ? resume.candidateKey.email : resume.candidate_id ? resume.candidate_id.email : "";
    let bcc = this.loggedUser.email ? this.loggedUser.email : "";
    this.generateLink = true;
    this.shareVideoService.setResume(resume);
    
    let payload = {
      dialogType : "Share",
      dialogTitle : "Share",
      cc : cc,
      bcc : bcc,
      clients : this.clients,
      loggedUser : this.loggedUser,
      btns : ["Share on HireSeat", "Career Referral", "Copy Profile Link", shareConstants.shareConferenceRoom]
    }
    this.showShareCandidateModalSuper(payload, this.showShareCandidateModalSuperCallback);
  }

  showShareCandidateModalSuperCallback(result, THIS){
    switch(result.type){
      case "copyProfileLink" : 
        if(result.process){
          THIS.generateLinkForVideo();
        }
        break;
      case "careerReferral" : 
        if(result.process){
          THIS.inputBigMessageDialogOpen22222(result);
        }
        break;
      case "shareOnHireseat" : 
        if(result.process){
          THIS.showShareTouserModal();
        }
        break;
      case shareConstants.shareConferenceRoom : 
        if(result.process){
          THIS.createConferenceRoom(result);
        }
        break
    }
  }

  createConferenceRoom(result){
    this._conferenceRoom.save(result.systemUserId, this.shareResume._id).subscribe(res=>{
      if(res.completeStatus){
        console.log("request completed : ");
        Materialize.toast("Message share was done", 1000, "green");
      }
    }, error =>{
      Materialize.toast("Conference room already shared !", 1000, "red");
    }, ()=>{
      console.log("+++ request completed : ");
    });
  }

  async generateLinkForVideo() {
    let payload = {};
    const candidateName = this.shareResume.resumeType ? this.shareResume.candidateName : this.shareResume.candidate_id.fullName;
    let userInfo = JSON.parse(localStorage.getItem("currentUser")).userInfo;

    if (this.shareResume.interviewLinkedByRecruiter || this.shareResume.recordedId) {
      const archiveIdPayload = {
        archivedId: this.shareResume.interviewLinkedByRecruiter ? this.shareResume.interviewLinkedByRecruiter : this.shareResume.recordedId,
      };
      // getting url
      this.getArchivedVideoSubscription = this.videoCallingService.getArchivedVideo(archiveIdPayload).subscribe((res) => {
        if (res) {

          this.shareableVideoURL = res.url;

          if (this.shareableVideoURL) {
            payload = {
              recruiterId: this.loggedUser._id,
              resumeId: this.shareResume._id,
              videoUrl: this.shareableVideoURL,
              fullName: candidateName,
              comment: this.shareResume.comments,
              candidateProfile: this.shareResume.resumeType ? false : true,
            };
            this._socket.sendMessage({
              type: this._constants.sharedProfileType,
              data: {
                payload: payload,
                subType: this._constants.generateLink
              },
            });
          }

        }
      });
    } else {
      payload = {
        recruiterId: this.loggedUser._id,
        resumeId: this.shareResume._id,
        fullName: candidateName,
        videoUrl: '',
        comment: this.shareResume.comments,
        candidateProfile: this.shareResume.resumeType ? false : true,
      };
      this._socket.sendMessage({
        type: this._constants.sharedProfileType,
        data: {
          payload: payload,
          subType: this._constants.generateLink
        },
      });
    }
  }

  async share(result) {

    var EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!EMAIL_REGEXP.test(result.recipientEmail)) {
      Materialize.toast("Invalid email", 800);
      return;
    }

    jQuery("#emaiPreviewModal").modal("close");
    this.spinner.show();

    const candidateName = this.shareResume.resumeType
      ? this.shareResume.candidateName
      : this.shareResume.candidate_id.fullName;
    const subject =
      "Hireseat" +
      " - " +
      this.loggedUser.companyName +
      " - " +
      this.shareResume.jobTitle +
      " - " +
      candidateName +
      " Profile.";

    const archiveIdPayload = {
      archivedId: this.shareResume.interviewLinkedByRecruiter,
    };

    // getting url
    this.getArchivedVideoSubscription = this.videoCallingService
      .getArchivedVideo(archiveIdPayload)
      .subscribe(
        async(res) => {
          if (res) {
            this.shareableVideoURL = res.url;

            this.spinner.hide();
            if (this.shareableVideoURL) {
              const payload = {
                recruiterId: this.loggedUser._id,
                resumeId: this.shareResume._id,
                recipientEmail: result.recipientEmail,
                cc: result.cc,
                bcc: result.bcc,
                videoUrl: this.shareableVideoURL,
                fullName: candidateName,
                subject: subject,
                comment: result.comment1,
                comment2: result.comment2,
                comment3: result.comment3,
                candidateProfile: this.shareResume.resumeType ? false : true,
                intruduce : false, //only when hitting a introduce
                senderName : result.fullName,
                fileURL : this.shareResume.fileURL,
                recipientName : result.recipientName
              };

              // let finalStatementsArr = await this._readResume.readResume(this.shareResume);
              // console.log("finalStatementsArr : ",finalStatementsArr);

              let userInfo = JSON.parse(localStorage.getItem("currentUser")).userInfo;
              this._socket.sendMessage({
                type: this._constants.sharedProfileType,
                data: {
                  type: userInfo.userRole,
                  payload: payload,
                  subType: this._constants.shareVideoViaRecruiterEmail
                },
              });

              // this.shareVideoSubscription = this.shareVideoService
              //   .shareVideoViaRecruiterEmail(payload)
              //   .subscribe(
              //     (res) => {
              //       if (res) {
              //         // console.log(res);
              //         Materialize.toast(res.msg, 3000);
              //         Materialize.toast(
              //           "You gained 200 recruiter karma points",
              //           4000,
              //           "red"
              //         );
              //         jQuery("#shareEmailModal").modal("close");

              //         let eventObj = {
              //           pointer: "ratingPoints",
              //           subType: "increse",
              //           increseCount: this._constants.sharedPoints,
              //         };
              //         this._subList.recruiterPoints.next(eventObj);

              //         eventObj.pointer = "sharePoints";
              //         this._subList.recruiterPoints.next(eventObj);

              //         this.spinner.hide();
              //       }
              //     },
              //     (err) => {
              //       // console.log(err);
              //       Materialize.toast("unable to send an email!", 3000);
              //       jQuery("#shareEmailModal").modal("close");
              //       this.spinner.hide();
              //     }
              //   );

            } else {
              Materialize.toast("no sharable video available", 3000);
              this.spinner.hide();
            }
          } else {
            this.spinner.hide();
          }
        },
        (err) => {
          this.spinner.hide();
          return false;
        }
      );
    // got url
  }
  // request recruiter process end

  handleToggleSign(obj) {
    if (obj.searchTab) {
      jQuery(".hideAndSHoTab").css("display", "block");
    } else {
      jQuery(".hideAndSHoTab").css("display", "none");
    }
  }

  setCurrentTimeEvent(obj){
    this.setCurrentTime(obj.seconds , obj.questionNumber);
  }

  inputBigMessageDialogOpen22222(payload){
    const dialogIntroduceRef = this.dialog.open(DialogInputBigMessageComponent, {
      data: {
        dialogType : "enterMessage",
        dialogTitle : "Message",
        dialogText : "Please provide 3 highlights of your referral.",
        btns  : ["apply"],
        type : eTypes.apply,
        userId : this.loggedUser._id
      }
    });

    dialogIntroduceRef.afterClosed().subscribe(result => {
      if(result.status){
        payload.comment1 = result.message1,
        payload.comment2 = result.message2,
        payload.comment3 = result.message3
        this.introduceUser22(payload);
      }
    });
  }

  introduceUser22(result){
    let candidateNameIs = this.shareResume.resumeType ? this.shareResume.candidateName : this.shareResume.candidate_id.fullName;
    let comment1 = result.comment1 ? result.comment1 : this.shareResume.comments;
    let comment2 = result.comment2 ? result.comment2 : this.shareResume.comment2;
    let comment3 = result.comment3 ? result.comment3 : this.shareResume.comment3;
    let senderName = this.loggedUser.fullName;

    let payload = {
      dialogType : "EmailPreview...",
      dialogTitle : "Email Preview...",
      cc : result.cc,
      bcc : result.bcc,
      recipientName : result.recipientName,
      recipientEmail : result.recipientEmail,
      senderName : senderName,
      candidateNameIs : candidateNameIs,
      comment1 : comment1,
      comment2 : comment2,
      comment3 : comment3
    }
    
    this.introduceUserSuper(payload, this.introduceUserSuperCallback);
  }

  introduceUserSuperCallback(result, THIS){
    THIS.share(result);
  }

  editUserProfile(){
    this._router.navigate(["/"+this.loggedUser.userRole+"/my-profile"]);
  }

  editHightlights(){
    this._router.navigate(["/"+this.loggedUser.userRole+"/edit-highlights"]);
  }

  previewProfile(resume){
    const payload = {
      recipientEmail: "spapali@hireseat.com",
      cc: resume.candidate_id.email,
      bcc: "",
      fullName: resume.candidate_id.fullName,
      subject: "subject",
      comment: resume.comments,
      comment2: resume.comment2,
      comment3: resume.comment3,
      senderName : "contact@hireseat",
      fileURL : resume.fileURL,
      recipientName : "Sujith",
      linkedIn : resume.linkedIn
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

  reviewMyResume(resume){
    console.log("resume : ",resume);

    const dialogSelectUsersRef = this.dialog.open(DialogSelectUserComponent ,{
      data: {
        dialogType : "select-users",
        dialogTitle : "Select Users",
        btns : ["review"]
      }
    });

    dialogSelectUsersRef.afterClosed().subscribe(result => {
      if(result){
        this._conferenceRoom.saveMultiple(result, resume._id).subscribe(res=>{
          if(res.completeStatus){
            Materialize.toast("Message share was done", 1000, "green");
          }
        }, error =>{
          Materialize.toast("Conference room already shared !", 1000, "red");
        }, ()=>{
          console.log("+++ request completed : ");
        });
      }
    });

  }

  postMyConferencecmt(event) {
    if (event.review === "" || event.review === null || event.review === undefined) {
      Materialize.toast("Comment box is empty!");
    } else {
      const payload = {
        profileId: event.profileId,
        review: event.review
      };

      this._conferenceRoom.postMyComment(payload).subscribe((res) => {
        if(res){
          this.addReviewToConference(event.profileId, res);
        }
      }, (err) => {
        Materialize.toast("Unable to post!", 5000);
      });
    }
  }

  addReviewToConference(profileId, res){
    this.resumes.forEach(resume => {
      if(resume?._id == profileId){
        resume.canconferenceRoom = [...resume?.canconferenceRoom, res];
      }
    });
  }

  changedValue(event){
    this.userService.updateAsARecruiter({ asARecruiterWithLimit : event.target.checked }).subscribe((res) => {
    }, (error) => {
      console.log(error);
    });
  }

  fileChange(event, resume) {
    this.shareResume = resume;
    if (event.target.files) {
      if(event.target.files[0].name.endsWith(".pdf") || event.target.files[0].name.endsWith(".docx")){
        let fileList: FileList = event.target.files;
        let file: File = fileList[0];
        var fdata = new FormData();
        fdata.append("image", file);
        this.spinner.show();
        this.resumeService
          .uploadResume(fdata)
          .subscribe((data: any) => {
              if (data.result) {
                Materialize.toast("Resume Uploaded Successfully !", 1000);
                this.candidate.fileURL = data.result;
                this.resumeChanged = true;
                this.saveFileUrl();
                this.getProfile();
              } else {
                Materialize.toast("Something Went Wrong !", 1000);
                this.spinner.hide();
              }
            }, (error) => {
              this.spinner.hide();
              if (error) {
                Materialize.toast("Something Went Wrong !", 1000);
              }
            });
      }else{
        Materialize.toast("Only allow .PDF and .DOCX extension files", 1500, 'red');
      }
    }
  }

  saveFileUrl(){
    this.candidateService.saveFileUrl( { fileURL : this.candidate.fileURL } ).subscribe((res) => {
    });
  }

  getProfile() {
    this.candidateService.getCandidateProfile().subscribe((res) => {
      this.spinner.hide();
      if(this.resumeChanged){
        this.getSummaryFromChatGPT(res.resumeDataIs);
        this.getThreePointsFromChatGPT(res.resumeDataIs);
        this.getAccomplishmentsFromChatGPT(res.resumeDataIs);
      }
    });
  }

  getSummaryFromChatGPT(data){
    let prompt = this._constants.summaryPrompt;
    this._chatGptService.getChatGPTResponse(data, prompt).subscribe(res=>{
      if(res?.choices[0]?.message?.content){
        this.candidate.summary = res?.choices[0]?.message?.content
      }
    });
  }

  getThreePointsFromChatGPT(data){
    let prompt = this._constants.hire3PointsPrompt;
    this._chatGptService.getChatGPTResponse(data, prompt).subscribe(res=>{
      if(res?.choices[0]?.message?.content){
        let responseText = res?.choices[0]?.message?.content;
        let result = this._chatGptService.convertChatGPTResponse(responseText);
        this.candidate.comments = result[0];
        this.candidate.comment2 = result[1];
        this.candidate.comment3 = result[2];
      }
    });
  }

  getAccomplishmentsFromChatGPT(data){
    let prompt = this._constants.accomplishmentPrompt;
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
        this.candidate.accomplishment1 = result[0];
        this.candidate.accomplishment2 = result[1];
        this.candidate.accomplishment3 = result[2];
        this.candidate.accomplishment4 = result[3];
        this.candidate.accomplishment5 = result[4];
        this.saveUserOnlyProfile();
      }
    });
  }

  saveUserOnlyProfile() {
    this.candidateService.saveUserOnlyProfile(this.candidate).subscribe((res) => {
      this.shareResume.summary = this.candidate?.summary;
      this.shareResume.comments = this.candidate?.comments;
      this.shareResume.comment2 = this.candidate?.comment2;
      this.shareResume.comment3 = this.candidate?.comment3;
      this.shareResume.accomplishment1 = this.candidate?.accomplishment1;
      this.shareResume.accomplishment2 = this.candidate?.accomplishment2;
      this.shareResume.accomplishment3 = this.candidate?.accomplishment3;
      this.shareResume.accomplishment4 = this.candidate?.accomplishment4;
      this.shareResume.accomplishment5 = this.candidate?.accomplishment5;
    });
  }

  ngOnDestroy() {
    this._socket.removeListener({ type: this._constants.sharedProfileType });
    this.sharedProfileObserver.unsubscribe();
  }
}
