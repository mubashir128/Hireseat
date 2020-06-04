import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VideoCallingService } from '../_services/video-calling.service';
import { NgxSpinnerService } from 'ngx-spinner';

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
    private videoCallingService: VideoCallingService,
    private spinner: NgxSpinnerService,
  ) {
    this.userRole = JSON.parse(localStorage.getItem("currentUser")).userInfo
      .userRole;
    this.userId = JSON.parse(localStorage.getItem("currentUser")).userInfo
      ._id;

  }

  ngOnInit() {
    this.spinner.show();
    // console.log(window.location.hostname);
    if (this.userRole === 'recruiter') {
      // console.log(this.userId, this.userRole);
      const payload = {
        recruiterId: this.userId
      };
      // get all candidates for interview
      this.videoCallingService.getAllRecruitersCandidates(payload).subscribe(res => {
        if (res) {
          this.spinner.hide();
          this.interviewList = res;
          // console.log('*******************************', this.interviewList);
        }
      }, err => {
        this.spinner.hide();
        console.log(err);
      });
    } else if (this.userRole === 'employer') {
      this.spinner.hide();
      const payload = {
        employersId: this.userId
      };
      // get all candidates for interview
      this.videoCallingService.getAllEmployersCandidates(payload).subscribe(res => {
        if (res) {
          this.spinner.hide();
          this.interviewList = res;
          // console.log('*******************************', this.interviewList);
        }
      }, err => {
        this.spinner.hide();
        console.log(err);
      });
      //  get all candidates for interview
    }

  }
  onInterview(candidateId) {
    // window.open('http://' + window.location.hostname + '/video-call');
    this.router.navigate(['video-call/' + candidateId]);
  }
  trashCandidate(candidate) {
    this.spinner.show();
    // console.log(candidate);
    const payload = {
      candidateId: candidate.candidateId
    };
    if (this.userRole === 'recruiter') {
      this.videoCallingService.traashCandidateFromInterviewList(payload).subscribe((res) => {
        if (res) {

          this.interviewList.map((can: any) => {
            if (can.candidateId === payload.candidateId) {
              const removeCandidate = this.interviewList.indexOf(can);
              if (removeCandidate > -1) {
                this.interviewList.splice(removeCandidate, 1);
                this.spinner.hide();

              }
            }
          });
        } else {
          this.spinner.hide();

        }
      }, err => {
        this.spinner.hide();

      });
    } else if (this.userRole === 'employer') {
      this.videoCallingService.traashCandidateFromInterviewListEmployer(payload).subscribe((res) => {
        if (res) {

          this.interviewList.map((can: any) => {
            if (can.candidateId === payload.candidateId) {
              const removeCandidate = this.interviewList.indexOf(can);
              if (removeCandidate > -1) {
                this.interviewList.splice(removeCandidate, 1);
                this.spinner.hide();

              }
            }
          });
        } else {
          this.spinner.hide();

        }
      }, err => {
        this.spinner.hide();

      });
    } else {
      console.log('error user role not specified');

    }

  }
}
