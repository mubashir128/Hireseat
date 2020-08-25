
import { Component, OnInit, Input } from '@angular/core';
import { FeedbackService } from 'src/app/_services/feedback.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-job-profile-info',
  templateUrl: './job-profile-info.component.html',
  styleUrls: ['./job-profile-info.component.css']
})
export class JobProfileInfoComponent implements OnInit {
  profileDetails: any;
  constructor(
    private route: ActivatedRoute,
    private feedbackService: FeedbackService,
    public spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => { this.getJobprofileDetails(params['key']) });
  }
  getJobprofileDetails(bidid) {
    this.spinner.show();
    this.feedbackService.getJobprofileDetails(bidid).subscribe((response) => {
      this.profileDetails = response.jobProfileKey;
      console.log(this.profileDetails);

      this.spinner.hide();
    }, (error) => {
      console.log(error);
      this.spinner.hide();
    })
  }

}
