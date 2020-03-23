import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-candidate-video-call',
  templateUrl: './candidate-video-call.component.html',
  styleUrls: ['./candidate-video-call.component.css']
})
export class CandidateVideoCallComponent implements OnInit {
  isUser: boolean;
  constructor(private router: Router) {
    router.events.subscribe((val) => {
      console.log(val);

      if (localStorage.getItem('currentUser')) {
        this.isUser = false;
      } else {
        this.isUser = true;

      }
    });
  }

  ngOnInit() {

    var userRole = JSON.parse(localStorage.getItem('currentUser')).userInfo.userRole;
    console.log(userRole);
    if (localStorage.getItem('currentUser')) {

      if (userRole == 'recruiter') {
        this.router.navigate(['recruiter/video-interview-room/video-call']);
      }
      if (userRole == 'employer') {
        this.router.navigate(['employer/bidding-event-list']);
      } else if (userRole == 'admin') {
        this.router.navigate(['user-list']);
      }
      else if (userRole == 'super-admin') {

      }
    }
    if (userRole) {
      this.isUser = false;
    } else {
      this.isUser = true;

    }
  }

}
