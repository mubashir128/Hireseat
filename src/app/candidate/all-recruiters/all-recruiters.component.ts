import { Component, OnInit, OnDestroy } from '@angular/core';
import { CandidateService } from 'src/app/_services/candidate.service';
import { Subscription } from 'rxjs';

declare var jQuery: any;
import * as $ from "jquery";
declare var Materialize: any;
@Component({
  selector: 'app-all-recruiters',
  templateUrl: './all-recruiters.component.html',
  styleUrls: ['./all-recruiters.component.css']
})
export class AllRecruitersComponent implements OnInit, OnDestroy {
  getAllPostRecruiterSubscription: Subscription;
  recruiters: any;
  user: any;
  constructor(
    private candidateService: CandidateService
  ) { }

  ngOnInit() {
    this.candidateService.getAllPostRecruiters().subscribe(res => {
      if (res) {
        // console.log(res);
        this.recruiters = res;
      }
    });
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.user);

  }
  ngOnDestroy() {
    if (this.getAllPostRecruiterSubscription) {
      this.getAllPostRecruiterSubscription.unsubscribe();
    }
  }
  onReqCoaching(recruiter) {
    console.log('requesting for coaching', recruiter, this.user.userInfo.fullName);

    const payload = {
      recipientEmail: recruiter.email,
      candidateFullName: this.user.userInfo.fullName,
      candidatePhoneNo: this.user.userInfo.phoneNo,
      recruiterFullName: recruiter.fullName,
      subject: this.user.userInfo.fullName + ' ' + 'Candidate request for coaching'
    }
    this.candidateService.reqCoaching(payload).subscribe(res => {
      if (res) {
        console.log(res);
        Materialize.toast("Recruiter has been notifiled!", 1000);
        Materialize.toast("Recruiter will reachout to you.", 1000);
      }
    }, err => {
      Materialize.toast("Something Went Wrong !", 1000);

    });
  }
}
