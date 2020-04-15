import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IBiddingEvent, BiddingEvent } from '../models/bidding-event';
import { FeedbackService } from 'src/app/_services/feedback.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-bidding-hired-info',
  templateUrl: './bidding-hired-info.component.html',
  styleUrls: ['./bidding-hired-info.component.css']
})
export class BiddingHiredInfoComponent implements OnInit {
  @Input() public biddingEvent: IBiddingEvent;
  @Output() HiredCount: EventEmitter<any> = new EventEmitter<any>();


  hiredList: any[] = [];
  p: any;
  constructor(
    private route: ActivatedRoute,
    private feedbackService: FeedbackService,
    private sanitizer: DomSanitizer,
    public spinner: NgxSpinnerService
  ) { }

  ngOnInit() {

    this.route.params.subscribe(params => { this.getHiredResume(params['key']) });
  }

  getHiredResume(key) {
    this.spinner.show();
    this.feedbackService.getHiredResume(key).subscribe((response) => {
      this.hiredList = response;
      console.log('************************', this.hiredList);

      this.HiredCount.emit(this.hiredList.length);
      this.hiredList.forEach(el => {
        if (el.resumeKey) {
          if (el.resumeKey.resumeType == 'resume_bank') {
            el.resumeKey.fileURL = el.resumeKey.resumeBank_id.resumeUrl
          }
        }
      })
      this.spinner.hide();
    }, (error) => {
      console.log(error);
      this.spinner.hide();
    })
  }
  transform(url) {
    if (url != null) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
  }

}
