import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
declare var jQuery: any;

@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.css']
})
export class VideoCallComponent implements OnInit {
  candidate = false;
  isRecruiter = true;
  constructor(private router: Router) {
    const userRole = JSON.parse(localStorage.getItem('currentUser')).userInfo.userRole;

    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (val.url === '/video-call') {
          console.log('On video call');
          if (!localStorage.getItem('currentUser')) {
            console.log(userRole);
            // console.log('there is no user show candidates window');

            this.candidate = true;
            if (userRole === 'employer') {
              this.isRecruiter = false;
            } else if (userRole === 'recruiter') {
              this.isRecruiter = true;
            }
          } else {
            // console.log('recruiter on video call');
            this.candidate = false;
          }
        }
      }
    });
  }

  ngOnInit() {
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
