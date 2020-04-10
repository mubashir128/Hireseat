import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { OpentokService } from '../_services/opentok.service';
import * as OT from '@opentok/client';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { baseUrl } from '../globalPath';

@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.css']
})
export class VideoCallComponent implements OnInit, OnDestroy {
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
  startArchiveButton = true;
  stopArchiveButton = false;
  viewArchiveButton = false;
  meetingStatus = false;
  constructor(
    private ref: ChangeDetectorRef,
    private opentokService: OpentokService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute
  ) {

    this.changeDetectorRef = ref;

    // subscription to the published stream
    this.publishedStreamSubscription = this.opentokService._publishedStream.subscribe(publishedStream => {
      this.spinner.show();
      this.publisher = publishedStream;
      if (publishedStream) {
        this.spinner.hide();
      }
      // console.log('publishedStream', publishedStream['streamId']);
      this.toCopylinkPublishedStreamId = publishedStream['streamId'];
    });
    // END subscription to the published stream
    this.opentokService._meetingEnd.subscribe((meetingStatus) => {
      console.log(meetingStatus);
      this.meetingStatus = meetingStatus;
    });
    // console.log('*****************************', this.activatedRoute.snapshot.paramMap.get('id'),
    // '########################', this.streamId);
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (val.url.includes('/video-call')) {
          // subscribing to a stream
          opentokService._streamToChecked.subscribe((res) => {
            // console.log('!!!!!!!!!!!!!', res);
            this.streamId = res;
            this.roomId = this.activatedRoute.snapshot.paramMap.get('id');
            if (this.roomId == this.streamId) {
              // console.log('room id matched');

              this.allowSubscriber = true;
            }
          });
          // end of subscription to a stream
          // // console.log('there is no user show candidates window');

          // console.log('On video call');
          if (!localStorage.getItem('currentUser')) {

            this.candidate = true;
          } else {
            this.allowSubscriber = true;

            // // console.log('recruiter on video call');
            const userRole = JSON.parse(localStorage.getItem('currentUser')).userInfo.userRole;
            this.candidate = false;
            if (userRole === 'employer') {
              this.isRecruiter = false;
            } else if (userRole === 'recruiter') {
              this.isRecruiter = true;
            }
          }
        }
      }
    });
    // subscribing to archivingID
    this.opentokService._archivingID.subscribe((archiveID) => {
      console.log('***********************', archiveID);
      this.archiveID = archiveID;
    });
    // end subscribing

  }

  ngOnInit() {
    this.spinner.show();
    this.opentokService.initSessionAPI('test').then((session: OT.Session) => {
      this.session = session;
      console.log('session', this.session.sessionId);

      this.session.on('streamCreated', (event) => {
        this.spinner.hide();
        // console.log('event.stream', event.stream);
        this.streamId = event.stream.streamId;
        this.opentokService.setStream(this.streamId);
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
        // console.log('sessionDisconnected', event);

        alert('The session disconnected. ' + event.reason);
      }));

      this.session.on('archiveStarted', (event) => {
        console.log(event);

        this.archiveID = event.id;
        console.log('Archive started ' + this.archiveID);
        $('#stop').show();
        $('#start').hide();
        this.opentokService.setArchivingID(event.id);
        this.startArchiveButton = false;
        this.stopArchiveButton = true;
        this.viewArchiveButton = false;
      });

      this.session.on('archiveStopped', (event) => {
        console.log(event);

        this.archiveID = event.id;
        console.log('Archive stopped ' + this.archiveID);
        $('#start').hide();
        $('#stop').hide();
        $('#view').show();

        this.startArchiveButton = false;
        this.stopArchiveButton = false;
        this.viewArchiveButton = true;
      });

      this.session.on('sessionDisconnected', (event) => {
        console.log('You were disconnected from the session.', event.reason);
      });

    })
      .then(() => {
        this.spinner.show();
        this.opentokService.connect();
      })
      .catch((err) => {
        console.error(err);
        this.spinner.hide();

        alert('Unable to connect. Make sure you have updated the config.ts file with your OpenTok details.');
      });
  }
  emailConfirmPopup() {
    // // console.log("emailConfirmPopup");

    jQuery("#emailConfirmPop").modal("open");
    setTimeout(() => {
      this.closeEmailConfirmpopup();
    }, 1500);
  }
  closeEmailConfirmpopup() {
    // // console.log("closing");

    jQuery("#emailConfirmPop").modal("close");
  }

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
    this.emailConfirmPopup();

  }

  // for publisher
  unpublishCall() {
    this.opentokService.setMeetingStatus(true);
    if (this.publisher) {
      this.opentokService.unpublishSession(this.publisher);
    }
    this.publisher = null;
    this.opentokService.setPublisher([]);
    if (!this.publisher) {
      if (!this.candidate && this.isRecruiter) {
        this.router.navigate(['/recruiter/video-interview-room']);
      } else if (!this.candidate && !this.isRecruiter) {
        // this.session.unpublish(this.publisher);
        this.router.navigate(['/employer/video-interview-room']);
      }
    }

  }
  //  archiving

  startArchive() {
    // eslint-disable-line no-unused-vars
    $.ajax({
      url: baseUrl + 'api/archive/start',
      type: 'POST',
      contentType: 'application/json', // send as JSON
      data: JSON.stringify({ sessionId: this.session.sessionId }),

      complete: function complete() {
        // called when complete
        console.log('startArchive() complete');
      },

      success: function success(event) {
        // called when successful
        console.log('successfully called startArchive()', event);
        this.opentokService.setArchivingID(event.id);
        this.arcId = event.id;
      },

      error: function error() {
        // called when there is an error
        console.log('error calling startArchive()');
      }
    });

    $('#start').hide();
    $('#stop').show();

    this.startArchiveButton = false;
    this.stopArchiveButton = true;
  }

  stopArchive() {
    console.log('archive ID while stoping', this.archiveID);

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
  viewArchive() {
    // eslint-disable-line no-unused-vars
    $('#view').prop('disabled', true);
    this.viewArchiveButton = true;
    console.log(baseUrl);

    // window.location = SAMPLE_SERVER_BASE_URL + /archive/ + archiveID + '/view';
    window.open(baseUrl + 'api/archive/' + this.archiveID + '/view');
  }
  // end of archiving
  ngOnDestroy() {
    if (this.publisher) {
      this.opentokService.setMeetingStatus(true);

      this.opentokService.unpublishSession(this.publisher);
    }
    this.publisher = null;
    if (this.publishedStreamSubscription) {
      this.publishedStreamSubscription.unsubscribe();

    }

    $('#start').show();
    $('#view').hide();
    this.startArchiveButton = true;
    this.viewArchiveButton = false;

  }
}
