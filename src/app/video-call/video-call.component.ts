import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { OpentokService } from '../_services/opentok.service';
import * as OT from '@opentok/client';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { baseUrl } from '../globalPath';
import { VideoCallingService } from '../_services/video-calling.service';
import { DomSanitizer } from '@angular/platform-browser';
import { integer } from 'aws-sdk/clients/cloudfront';
declare var Materialize: any;
declare var jQuery: any;
import * as $ from 'jquery';
@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.css'],
  providers: [OpentokService]

})
export class VideoCallComponent implements OnInit, OnDestroy {
  bookmarkSubscription: Subscription;
  askQuestionSubscription: Subscription;
  startArchiveSubscription: Subscription;
  QuestionsGroup: FormGroup;
  userRole: any;
  userId: any;
  message: any;
  candidate = false;
  registerCandidate: any;
  isRecruiter = true;
  roomId: any;
  allowSubscriber = false;
  session: OT.Session;
  streams: Array<OT.Stream> = [];
  changeDetectorRef: ChangeDetectorRef;
  publishedStreamSubscription: Subscription;
  toCopylinkPublishedStreamId: any;
  publisher: any;
  streamId: any;
  // archiving
  arcId: any;
  archiveID: any;
  startArchiveButton = false;
  stopArchiveButton = false;
  viewArchiveButton = false;
  archiveStored = false;
  meetingStatus = false;
  candidateInvitationLink = true;
  candidateId: any;
  candidateInfo: any;
  responseArchivedId: any;
  commentFromRecruiter: any;
  submitReviewButton: boolean;
  roomName: any;
  hideVideo = false;
  showButtons = false;
  closeStatus: any;
  isEmployer: boolean;
  selfRecord = false;
  selfRecordId: any;
  constructor(
    private ref: ChangeDetectorRef,
    private opentokService: OpentokService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private videoCallingService: VideoCallingService,
    private sanitizer: DomSanitizer,
    private fb: FormBuilder
  ) {

    this.QuestionsGroup = this.fb.group({
      question1: new FormControl(null, [
        Validators.max(100)
      ]),
      timeStamp1: new FormControl(null),

      question2: new FormControl(null, [
        Validators.max(100)
      ]),
      timeStamp2: new FormControl(null),

      question3: new FormControl(null, [
        Validators.max(100)
      ]),
      timeStamp3: new FormControl(null),

      question4: new FormControl(null, [
        Validators.max(100)
      ]),
      timeStamp4: new FormControl(null),

      question5: new FormControl(null, [
        Validators.max(100)
      ]),
      timeStamp5: new FormControl(null),

    });
    this.changeDetectorRef = this.ref;
    // subscription to the published stream
    this.publishedStreamSubscription = this.opentokService._publishedStream.subscribe(publishedStream => {
      this.spinner.show();
      this.publisher = publishedStream;
      if (publishedStream) {
        this.spinner.hide();
      }
    });
    // END subscription to the published stream
    this.opentokService._meetingEnd.subscribe((meetingStatus) => {
      this.meetingStatus = meetingStatus;
    });
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (val.url.includes('/video-call')) {
          // subscribing to a stream
          opentokService._streamToChecked.subscribe((res) => {
            // // console.log('!!!!!!!!!!!!!', res);
            this.streamId = res;
            this.roomId = this.activatedRoute.snapshot.paramMap.get('id');
            if (this.roomId == this.streamId) {

              this.allowSubscriber = true;
            }
          });
          opentokService._getCandidateID.subscribe(id => {
            // console.log(id);
            this.toCopylinkPublishedStreamId = id;
          });
          // end of subscription to a stream
        }
      }
    });
    // subscribing to archivingID
    this.opentokService._archivingID.subscribe((archiveID) => {
      this.archiveID = archiveID;
    });
  }
  ngOnInit() {
    jQuery('.modal').modal();
    this.candidateInvitationLink = true;
    // candidate or interviewer
    this.candidateId = this.activatedRoute.snapshot.paramMap.get('id');
    if(this.candidateId.includes('@')){
          this.candidateId = this.candidateId.split('@')[1];
          this.selfRecord = true;
          this.registerCandidate = false;
          this.isEmployer = false;
          this.isRecruiter = false;
    }
    if (!localStorage.getItem('currentUser')) {
      // this.candidateId = this.activatedRoute.snapshot.paramMap.get('id');

      this.candidate = true;

    } else {
      this.allowSubscriber = true;

      this.userId = JSON.parse(localStorage.getItem('currentUser')).userInfo._id;
      
      this.userRole = JSON.parse(localStorage.getItem('currentUser')).userInfo.userRole;
      console.log('user',this.userRole);
      this.candidate = false;
      if (this.userRole === 'employer') {
        this.isRecruiter = false;
        this.isEmployer = true;
        // this.candidateId = this.activatedRoute.snapshot.paramMap.get('id');
        const payload = {
          candidateId: this.candidateId
        };
        this.getSelectedCandidateInfo(payload);

        // this.videoCallingService.getCandidatesInfoById(payload).subscribe(res => {
        //   this.candidateInfo = res.isCandidate;
        //   this.opentokService.setCandidateId(this.candidateId);
        //   // console.log(this.candidateInfo);

        // });
      } else if (this.userRole === 'recruiter') {

        // this.candidateId = this.activatedRoute.snapshot.paramMap.get('id');
        // console.log('candidateId', this.candidateId);
        this.isEmployer = false;
        this.isRecruiter = true;
        // getting candidates resume by Id
        const payload = {
          candidateId: this.candidateId
        };
        this.getSelectedCandidateInfo(payload);
        // this.videoCallingService.getCandidatesInfoById(payload).subscribe(res => {
        //   this.candidateInfo = res.isCandidate;
        //   this.opentokService.setCandidateId(this.candidateId);
        //   // console.log(this.candidateInfo);

        // }, error => {
        //   console.log('---------------', error);

        // });
        // end resume candidate
      } else if (this.userRole === 'candidate') {
        console.log('registered candidate');
        // this.candidateId = this.activatedRoute.snapshot.paramMap.get('id');
        
        this.registerCandidate = true;
        this.isEmployer = false;
        this.isRecruiter = false;
        if(this.selfRecord){
          const payload = {
            candidateId: this.candidateId
          };
          this.getPersonalInfo(payload);
        } else {
          const payload = {
            candidateId: this.candidateId
          };
          this.getSelectedCandidateInfo(payload); 
        }
      }
    }
    //
    this.opentokService.initSessionAPI(this.candidateId).subscribe((session: OT.Session) => {
      this.spinner.show();
      this.session = session;
      // console.log('session', this.session.sessionId);
      this.startArchiveButton = true;
      this.session.on('streamCreated', (event) => {
        this.spinner.hide();
        // console.log('event.stream', event.stream);
        // this.streamId = event.stream.streamId;
        this.opentokService.setStream(this.candidateId);
        this.streams.push(event.stream);
        this.changeDetectorRef.detectChanges();
      });
      this.session.on('streamDestroyed', (event) => {
        const idx = this.streams.indexOf(event.stream);
        if (idx > -1) {
          // console.log('sessionDisconnected', event);
          this.streams.splice(idx, 1);
          this.changeDetectorRef.detectChanges();
        }
      });
      this.session.on('sessionDisconnected', ((event) => {
        // // console.log('sessionDisconnected', event);

        // alert('The session disconnected. ' + event.reason);
      }));

      this.session.on('archiveStarted', (event) => {
        // console.log('archiving started',event);

        this.archiveID = event.id;
        // console.log('Archive started ' + this.archiveID);
        $('#stop').show();
        $('#start').hide();
        this.opentokService.setArchivingID(event.id);
        this.startArchiveButton = false;
        this.stopArchiveButton = true;
        this.viewArchiveButton = false;
      });

      this.session.on('archiveStopped', (event) => {
        // console.log(event);

        this.archiveID = event.id;
        // console.log('Archive stopped ' + this.archiveID);
        $('#start').hide();
        $('#stop').hide();
        $('#view').show();

        this.startArchiveButton = false;
        this.stopArchiveButton = false;
        this.viewArchiveButton = true;
      });

      if (session) {
        this.opentokService.connect()
          .then(result => {
            if (result) {
              Materialize.toast('Welcome to video calling', 4000);
              this.spinner.hide();
              this.showButtons = true;
            }
          })
          .catch(err => {
            this.spinner.hide();
          });
      }
    }, err => {
      console.log('-------------------------', err);
      this.spinner.hide();
      this.emailConfirmPopup(err + ' please try after some time!', 2000);
      setTimeout(() => {
        if (this.userRole === 'recruiter') {
          this.router.navigate(['/recruiter/video-interview-room'])
        } else if (this.userRole === 'employer') {
          this.router.navigate(['/employer/video-interview-room'])
        }
      }, 3000);
    });
  }
  getPersonalInfo(payload){
    console.log('*******',payload);
    
       this.videoCallingService.getPersonalInfoById(payload).subscribe(res => {
          this.candidateInfo = res.isCandidate;
          // this.opentokService.setCandidateId(this.candidateId);
          // console.log(this.candidateInfo);

        }, error => {
          console.log('---------------', error);

        });
  }

  getSelectedCandidateInfo(payload){
    console.log(',,,,,,,',payload);
    
       this.videoCallingService.getCandidatesInfoById(payload).subscribe(res => {
          this.candidateInfo = res.isCandidate;
          this.opentokService.setCandidateId(this.candidateId);
          // console.log(this.candidateInfo);

        }, error => {
          console.log('---------------', error);

        });
  }
  // modal
  emailConfirmPopup(message, time) {
    // // // console.log("emailConfirmPopup");
    this.message = message;
    jQuery("#emailConfirmPop").modal("open");
    setTimeout(() => {
      this.closeEmailConfirmpopup();
    }, time);
  }
  closeEmailConfirmpopup() {
    // console.log("closing");

    jQuery("#emailConfirmPop").modal("close");
  }
  questionConfirmPopup() {
    // // // console.log("emailConfirmPopup");
    jQuery("#questionsPop").modal("open");

  }
  closeQuestionConfirmpopup() {
    jQuery("#questionsPop").modal("close");
  }

  // end modal
  copyText(val: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    // alert('URL copied to clipboard');
    this.emailConfirmPopup('Link copied to Clipboard', 1500);
  }
  questionsPopUp() {
    this.questionConfirmPopup();
  }

  //  archiving

  startArchive() {
    this.startArchiveSubscription = this.videoCallingService.startArchive({ sessionId: this.session.sessionId }).subscribe(res => {
      if (res) {
        this.opentokService.setArchivingID(res.id);
        this.arcId = res.id;
        $('#start').hide();
        $('#stop').show();

        this.startArchiveButton = false;
        this.stopArchiveButton = true;
      }
    }, error => {
      console.log('error on start archive', error);
      Materialize.toast('Error on start archive', 4000)

    })
  }
  stopArchive() {
    // console.log('archive ID while stoping', this.archiveID);

    // $.post(baseUrl + 'api/archive/' + this.archiveID + '/stop');

    $.ajax({
      url: baseUrl + 'api/archive/' + this.archiveID + '/stop',
      type: 'POST'
    });

    $('#stop').hide();
    this.stopArchiveButton = false;
    this.viewArchiveButton = true;
    $('#view').prop('disabled', false);
    $('#stop').show();
    this.stopArchiveButton = true;
  }
  storeArchive = (): integer => {
    // store archived view
    $('#view').prop('disabled', true);
    this.viewArchiveButton = true;
    
    const payload = {
      archiveId: this.archiveID,
      candidateId: this.candidateId,
      userRole: this.userRole,
      selfRecord:this.selfRecord?true:false
    };
    console.log(this.candidateId);
    // add subscription
    this.videoCallingService.storeArchive(payload).subscribe(res => {
      // console.log(res);
      if (res) {
        this.responseArchivedId = res.archiveId;
        this.emailConfirmPopup("The archived link is added to the candidate's resume", 3000);
        this.viewArchiveButton = false;
        // this.candidateInvitationLink = false;
        this.startArchiveButton = true;
        this.archiveStored = true;
        return true;
      }
    }, err => {
      // console.log('error', err);
      Materialize.toast(err + 'Unable to store the archive', 4000);
      return false;
    });
    return 1;
  }
  // submit recruiters review
  submitReview() {
    const payload = {
      recruiterId: this.userId,
      candidateId: this.candidateId,
      review: this.commentFromRecruiter ? this.commentFromRecruiter : ''
    };
    // console.log(payload);
    this.videoCallingService.submitRecruitersReview(payload).subscribe(res => {
      if (res) {
        // console.log(res);
        this.emailConfirmPopup("Review submitted successfully", 3000);
      }
    }, err => {
      // console.log(err);

    });
  }
  onSubmitQuestions() {
    // console.log(this.QuestionsGroup.value);
    // convert mins into seconds
    this.QuestionsGroup.get('timeStamp1')
      .patchValue(this.minsToSeconds(this.QuestionsGroup.value.timeStamp1));
    this.QuestionsGroup.get('timeStamp2')
      .patchValue(this.minsToSeconds(this.QuestionsGroup.value.timeStamp2));
    this.QuestionsGroup.get('timeStamp3')
      .patchValue(this.minsToSeconds(this.QuestionsGroup.value.timeStamp3));
    this.QuestionsGroup.get('timeStamp4')
      .patchValue(this.minsToSeconds(this.QuestionsGroup.value.timeStamp4));
    this.QuestionsGroup.get('timeStamp5')
      .patchValue(this.minsToSeconds(this.QuestionsGroup.value.timeStamp5));


    const payload = {
      resumeId: this.candidateId,
      questions: this.QuestionsGroup.value
    };
    // console.log(payload);
    this.askQuestionSubscription = this.videoCallingService.RecruiterQuestionsForCandidate(payload)
      .subscribe(res => {
        if (res) {
          // console.log('**********RES after adding quesitons*****************', res);
          this.QuestionsGroup.reset();
          this.closeQuestionConfirmpopup();
        }
      }, err => console.log('error while adding questions', err));

  }
  minsToSeconds(min) {
    // console.log(typeof min);
    if (typeof min === 'string') {
      if (!min.includes(':')) {

        const secOnly = parseInt(min, 10);
        return secOnly;

      } else {
        const intoSeconds = min.split(':');
        const finalSeconds = Number(intoSeconds[0]) * 60 + Number(intoSeconds[1]);
        return finalSeconds;
      }
    } else {
      return min;
    }

  }
  bookmarkCandidate(status) {
    const payload = {
      resumeId: this.candidateId,
      status: status
    };
    this.bookmarkSubscription = this.videoCallingService.bookmarkCandidate(payload).subscribe(res => {
      if (res) {
        // console.log('res from bookmark call', res);
        this.candidateInfo.bookmark = res.status;
      }
    }, err => {
      console.log('error from bookmark call', err);
    });
  }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  // end of archiving


  isVideo(status) {
    this.hideVideo = status;
    if (this.hideVideo) {
      this.publisher.publishVideo(false);
    } else if (!this.hideVideo) {
      this.publisher.publishVideo(true);

    }
  }
  closeRsn(rsn) {
    this.closeendCallConfirmpopup(rsn);
  }
  endCallConfirmPopup() {
    jQuery("#endCallConfirmPop").modal("open");
  }
  async closeendCallConfirmpopup(rsn) {
    this.closeStatus = rsn;
    if (rsn === 'yes') {
      if (this.userRole === 'recruiter') {
        Materialize.toast('Closing without Storing!', 3000);
        setTimeout(() => {
          this.viewArchiveButton = false;

          jQuery("#endCallConfirmPop").modal("close");
          this.endCall('recruiter');
        }, 3000);

      }
      if (this.userRole === 'employer') {
        this.viewArchiveButton = false;

        Materialize.toast('Closing without Storing!', 3000);
        setTimeout(() => {
          jQuery("#endCallConfirmPop").modal("close");
          this.endCall('employer');
        }, 3000);


      }
    } else if (rsn === 'no') {
      Materialize.toast('Storing the recording!', 3000);
      const isArchiveStored = await this.storeArchive();
      if (isArchiveStored) {
        jQuery("#endCallConfirmPop").modal("close");
        if (this.userRole === 'recruiter') {
          this.viewArchiveButton = false;

          this.endCall('recruiter');
        }
        if (this.userRole === 'employer') {
          this.viewArchiveButton = false;

          this.endCall('employer');
        }
      }

    } else {
      jQuery("#endCallConfirmPop").modal("close");

    }

  }
  endCall(id) {
    if (this.stopArchiveButton) {
      console.log('if user does not click the stop archive button');

      this.stopArchive();
    }
    // this.session.disconnect();
    switch (id) {
      case 'candidate':
        this.router.navigate(['/'])
          .then(() => {
            window.location.reload();
          });
        break;
      case 'recruiter':

        if (this.viewArchiveButton) {
          console.log('Hung up without storing?');
          this.endCallConfirmPopup();
        } else {
          this.router.navigate(['/recruiter/video-interview-room'])
            .then(() => {
              window.location.reload();
            });
        }
        break;
      case 'employer':
        if (this.viewArchiveButton) {
          console.log('Hung up without storing?');
          this.endCallConfirmPopup();
        } else {
          this.router.navigate(['/employer/video-interview-room'])
            .then(() => {
              window.location.reload();
            });
        }
        break;
        case 'regCandidate':
        
          this.router.navigate(['/candidate/interview-room'])
            .then(() => {
              window.location.reload();
            });
        
        break;
      default:
        this.router.navigate(['/'])
          .then(() => {
            window.location.reload();
          });
        break;
    }

  }
  ngOnDestroy() {
    console.log('!!!!!!!!!!!!!!', this.publisher);
    console.log('!!!!!!!!!!!!!!', this.session);

    if (this.publisher.length > 0) {
      this.opentokService.setMeetingStatus(true);
      this.session.unpublish(this.publisher);

      // this.opentokService.unpublishSession(this.publisher);
    }
    if (this.stopArchiveButton) {
      this.stopArchive();
    }
    if (this.session) {
      this.session.disconnect();
    }

    this.publisher = null;
    if (this.publishedStreamSubscription) {
      this.publishedStreamSubscription.unsubscribe();
    }

    if (this.bookmarkSubscription) {
      this.bookmarkSubscription.unsubscribe();
    }
    if (this.askQuestionSubscription) {
      this.askQuestionSubscription.unsubscribe();
    }

    $('#start').show();
    $('#view').hide();
    this.startArchiveButton = true;
    this.viewArchiveButton = false;

  }
}
