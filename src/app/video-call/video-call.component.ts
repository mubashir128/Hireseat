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
declare var jQuery: any;
import * as $ from 'jquery';
import { VideoCallingService } from '../_services/video-calling.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.css'],
  providers: [OpentokService]

})
export class VideoCallComponent implements OnInit, OnDestroy {
  bookmarkSubscription: Subscription;
  askQuestionSubscription: Subscription;
  QuestionsGroup: FormGroup;
  userRole: any;
  userId: any;
  message: any;
  candidate = false;
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
  meetingStatus = false;
  candidateInvitationLink = true;
  candidateId: any;
  candidateInfo: any;
  responseArchivedId: any;
  commentFromRecruiter: any;
  submitReviewButton: boolean;
  roomName: any;
  hideVideo = false;
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
    this.changeDetectorRef = ref;
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
    // end subscribing
    // this.createOpenTokSession();

  }

  ngOnInit() {
    // console.log('hgvgv');

    jQuery('.modal').modal();
    this.candidateInvitationLink = true;
    // candidate or interviewer
    if (!localStorage.getItem('currentUser')) {
      this.candidateId = this.activatedRoute.snapshot.paramMap.get('id');

      this.candidate = true;

    } else {
      this.allowSubscriber = true;

      // // // console.log('recruiter on video call');
      this.userId = JSON.parse(localStorage.getItem('currentUser')).userInfo._id;

      this.userRole = JSON.parse(localStorage.getItem('currentUser')).userInfo.userRole;
      this.candidate = false;
      if (this.userRole === 'employer') {
        this.isRecruiter = false;
        this.candidateId = this.activatedRoute.snapshot.paramMap.get('id');
        const payload = {
          candidateId: this.candidateId
        };
        this.videoCallingService.getCandidatesInfoById(payload).subscribe(res => {
          this.candidateInfo = res.isCandidate;
          this.opentokService.setCandidateId(this.candidateId);

        });
      } else if (this.userRole === 'recruiter') {

        this.candidateId = this.activatedRoute.snapshot.paramMap.get('id');
        this.isRecruiter = true;
        // getting candidates resume by Id
        const payload = {
          candidateId: this.candidateId
        };
        this.videoCallingService.getCandidatesInfoById(payload).subscribe(res => {
          this.candidateInfo = res.isCandidate;
          this.opentokService.setCandidateId(this.candidateId);
        });
        // end resume candidate
      }
    }
    //
    this.createOpenTokSession();
  }
  createOpenTokSession() {
    console.trace();
    if (this.candidateId) {
      console.log(this.candidateId, 'createOpenTokSession');
      console.log('type of', typeof (this.candidateId));

      this.opentokService.initSessionAPI(this.candidateId).then((session: OT.Session) => {
        this.spinner.show();
        this.session = session;
        this.startArchiveButton = true;

        this.session.on('streamCreated', (event) => {
          this.spinner.hide();
          this.opentokService.setStream(this.candidateId);
          this.streams.push(event.stream);
          this.changeDetectorRef.detectChanges();
        });
        this.session.on('streamDestroyed', (event) => {
          const idx = this.streams.indexOf(event.stream);
          if (idx > -1) {
            this.streams.splice(idx, 1);
            this.changeDetectorRef.detectChanges();
          }
        });
        this.session.on('sessionDisconnected', ((event) => {

          alert('The session disconnected. ' + event.reason);
        }));

        this.session.on('archiveStarted', (event) => {

          this.archiveID = event.id;
          // $('#stop').show();
          // $('#start').hide();
          this.opentokService.setArchivingID(event.id);
          this.startArchiveButton = false;
          this.stopArchiveButton = true;
          this.viewArchiveButton = false;
        });

        this.session.on('archiveStopped', (event) => {

          this.archiveID = event.id;
          // $('#start').hide();
          // $('#stop').hide();
          // $('#view').show();

          this.startArchiveButton = false;
          this.stopArchiveButton = false;
          this.viewArchiveButton = true;
        });



      })
        .then(() => {
          this.spinner.show();
          this.opentokService.connect();
        })
        .catch((err) => {
          console.error('******', err);
          this.spinner.hide();

          alert('Unable to connect.');
        });
      console.log('After opentok service');

    }

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
    $.ajax({
      url: baseUrl + 'api/archive/start',
      type: 'POST',
      contentType: 'application/json', // send as JSON
      data: JSON.stringify({ sessionId: this.session.sessionId }),

      complete: function complete() {
        // called when complete
        // console.log('startArchive() complete');
      },

      success: function success(event) {
        // called when successful
        // console.log('successfully called startArchive()', event);
        this.opentokService.setArchivingID(event.id);
        this.arcId = event.id;
      },

      error: function error() {
        // called when there is an error
        // console.log('error calling startArchive()');
      }
    });

    $('#start').hide();
    $('#stop').show();

    this.startArchiveButton = false;
    this.stopArchiveButton = true;
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
  storeArchive() {
    // store archived view
    $('#view').prop('disabled', true);
    this.viewArchiveButton = true;
    const payload = {
      archiveId: this.archiveID,
      candidateId: this.candidateId,
      userRole: this.userRole
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
      }
    }, err => {
      // console.log('error', err);

    });
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

  ngOnDestroy() {
    if (this.publisher) {
      this.opentokService.setMeetingStatus(true);

      this.opentokService.unpublishSession(this.publisher);
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
