import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VideoCallingService } from '../_services/video-calling.service';

@Component({
  selector: 'app-video-interview-room',
  templateUrl: './video-interview-room.component.html',
  styleUrls: ['./video-interview-room.component.css']
})
export class VideoInterviewRoomComponent implements OnInit {
  employerInterviewList: any;
  recruiterInterviewList: any;
  userRole: any;
  userId: any;
  interviewList: any;
  constructor(
    private router: Router,
    private videoCallingService: VideoCallingService
  ) {
    this.userRole = JSON.parse(localStorage.getItem("currentUser")).userInfo
      .userRole;
    this.userId = JSON.parse(localStorage.getItem("currentUser")).userInfo
      ._id;
    this.employerInterviewList = [
      {
        id: 1,
        name: 'Tom',
        role: 'Backend developer',
        skills: [
          'nodejs',
          'mongodb',
          'javascript'
        ]
      },
      {
        id: 2,
        name: 'Shina',
        role: 'UI/UX developer',
        skills: [
          'Figma Software',
          'angular',
          'javascript'
        ]
      },
      {
        id: 3,
        name: 'Eric',
        role: 'Frontend developer',
        skills: [
          'PHP',
          'angular',
          'javascript'
        ]
      },
      {
        id: 4,
        name: 'Max',
        role: 'Cloud architect',
        skills: [
          'AWS',
          'Asure',
          'Goolge cloude'
        ]
      }
    ];
  }

  ngOnInit() {
    // console.log(window.location.hostname);
    if (this.userRole === 'recruiter') {
      console.log(this.userId, this.userRole);
      const payload = {
        recruiterId: this.userId
      };
      // get all candidates for interview
      this.videoCallingService.getAllRecruitersCandidates(payload).subscribe(res => {
        if (res) {
          this.interviewList = res;
          console.log('*******************************', this.interviewList);
        }
      }, err => {
        console.log(err);
      });
    } else if (this.userRole === 'employer') {
      //  get all candidates for interview
    }

  }
  onInterview(candidateId) {
    // window.open('http://' + window.location.hostname + '/video-call');
    this.router.navigate(['video-call/' + candidateId]);
  }
}
