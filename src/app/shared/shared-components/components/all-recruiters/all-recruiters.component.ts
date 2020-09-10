import { Component, OnInit, OnDestroy } from '@angular/core';
import { CandidateService } from 'src/app/_services/candidate.service';
import { Subscription } from 'rxjs';

declare var jQuery: any;
import * as $ from "jquery";
import { NgxSpinnerService } from 'ngx-spinner';
declare var Materialize: any;
@Component({
  selector: 'app-all-recruiters',
  templateUrl: './all-recruiters.component.html',
  styleUrls: ['./all-recruiters.component.css']
})
export class AllRecruitersComponent implements OnInit, OnDestroy {
  getAllPostRecruiterSubscription: Subscription;
  shareWithRecruiterSubscription: Subscription;
  requestCoachingSubscription: Subscription;
  recruiters: any;
  user: any;
  constructor(
    private candidateService: CandidateService,
    private spinner: NgxSpinnerService,

  ) { }

  ngOnInit() {
    this.spinner.show();

    this.candidateService.getAllPostRecruiters().subscribe(res => {
      if (res) {
        this.recruiters = res;
        this.spinner.hide();

      }
    }, error => {
      Materialize.toast("Something Went Wrong !", 1000);

      this.spinner.hide();

    });
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    // console.log(this.user);

  }
  onLinkedIn(link: string) {
    if (link.includes('https')) {
      window.open(link, "_blank");
    } else {
      window.open('https://' + link, "_blank");
    }
  }

  onReqCoaching(recruiter) {
    // console.log('requesting for coaching', recruiter, this.user.userInfo.fullName);

    const payload = {
      recipientEmail: 'contact@hireseat.com',
      candidateFullName: this.user.userInfo.fullName,
      candidatePhoneNo: this.user.userInfo.phoneNo,
      recruiterFullName: recruiter.fullName,
      subject: this.user.userInfo.fullName + ' ' + 'Candidate request for coaching'
    }
    this.spinner.show();

    this.requestCoachingSubscription = this.candidateService.reqCoaching(payload).subscribe(res => {
      if (res) {
        // console.log(res);
        // Materialize.toast("Recruiter has been notified!", 2000);
        Materialize.toast("Recruiter will reach out to you!", 4000);

        this.onShareWithRecruiter(recruiter);
        this.spinner.hide();

      }
    }, err => {
      Materialize.toast("Something Went Wrong !", 1000);
      this.spinner.hide();

    });
  }
  onShareWithRecruiter(recruiter) {
    this.spinner.show();
    Materialize.toast("Sharing your profile with the recruiter...", 4000);

    const payload = {
      recruiter_id: recruiter.refUserId._id
    }
    this.shareWithRecruiterSubscription = this.candidateService.sharewithRecruiter(payload).subscribe(res => {
      if (res) {
        Materialize.toast(res.msg, 1000);
        this.spinner.hide();

      }
    }, err => {
      console.log(err);
      Materialize.toast('Something went wrong!', 1000);
      this.spinner.hide();

    })
  }
  // keep it at the end of the file
  ngOnDestroy() {
    if (this.getAllPostRecruiterSubscription) {
      this.getAllPostRecruiterSubscription.unsubscribe();
    }
    if (this.requestCoachingSubscription) {
      this.requestCoachingSubscription.unsubscribe();
    }
    if (this.shareWithRecruiterSubscription) {
      this.shareWithRecruiterSubscription.unsubscribe();
    }
  }
}
