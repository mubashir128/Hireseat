import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { OpentokService } from '../_services/opentok.service';
import * as OT from '@opentok/client';

declare var jQuery: any;

@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.css']
})
export class VideoCallComponent implements OnInit {
  candidate = false;
  isRecruiter = true;
  roomId: any;
  session: OT.Session;
  streams: Array<OT.Stream> = [];
  changeDetectorRef: ChangeDetectorRef;

  constructor(private ref: ChangeDetectorRef, private opentokService: OpentokService, private router: Router) {
    this.changeDetectorRef = ref;
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (val.url.includes('/video-call')) {
          console.log('On video call');
          if (!localStorage.getItem('currentUser')) {

            // console.log('there is no user show candidates window');

            this.candidate = true;


          } else {
            // console.log('recruiter on video call');
            const userRole = JSON.parse(localStorage.getItem('currentUser')).userInfo.userRole;
            this.candidate = false;
            if (userRole === 'employer') {
              this.isRecruiter = false;
            } else if (userRole === 'recruiter') {
              this.isRecruiter = true;
            }
            this.roomId = JSON.parse(localStorage.getItem('currentUser')).userInfo._id;
          }
        }
      }
    });
  }

  ngOnInit() {
    this.opentokService.initSession().then((session: OT.Session) => {
      this.session = session;
      this.session.on('streamCreated', (event) => {
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
    })
      .then(() => this.opentokService.connect())
      .catch((err) => {
        console.error(err);
        alert('Unable to connect. Make sure you have updated the config.ts file with your OpenTok details.');
      });
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
    this.emailConfirmPopup();
  }
  emailConfirmPopup() {
    // console.log("emailConfirmPopup");

    jQuery("#emailConfirmPop").modal("open");
    setTimeout(() => {
      this.closeEmailConfirmpopup();
    }, 1500);
  }
  closeEmailConfirmpopup() {
    // console.log("closing");

    jQuery("#emailConfirmPop").modal("close");
  }
}
