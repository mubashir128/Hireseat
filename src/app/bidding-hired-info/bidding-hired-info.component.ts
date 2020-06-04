import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IBiddingEvent, BiddingEvent } from '../models/bidding-event';
import { FeedbackService } from 'src/app/_services/feedback.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { VideoCallingService } from '../_services/video-calling.service';
import { UserService } from '../_services/user.service';
@Component({
  selector: 'app-bidding-hired-info',
  templateUrl: './bidding-hired-info.component.html',
  styleUrls: ['./bidding-hired-info.component.css']
})
export class BiddingHiredInfoComponent implements OnInit {
  @Input() public biddingEvent: IBiddingEvent;
  @Output() HiredCount: EventEmitter<any> = new EventEmitter<any>();
  currentResume: any;
  selectedIndex: any;
  videoURL: any;
  hiredList: any[] = [];
  p: any;
  constructor(
    private route: ActivatedRoute,
    private feedbackService: FeedbackService,
    private sanitizer: DomSanitizer,
    public spinner: NgxSpinnerService,
    private videoCallingService: VideoCallingService,
    public userService: UserService
  ) { }

  ngOnInit() {

    this.route.params.subscribe(params => { this.getHiredResume(params['key']) });
  }

  getHiredResume(key) {
    this.spinner.show();
    this.feedbackService.getHiredResume(key).subscribe((response) => {
      this.hiredList = response;
      // console.log('************************', this.hiredList);

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
  seeVideo(i, archiveId, resume) {
    // call video call service
    this.currentResume = resume;

    this.videoURL = '';
    // console.log(i);
    this.selectedIndex = i;
    this.spinner.show();
    const payload = {
      archivedId: archiveId
    };
    this.videoCallingService.getArchivedVideo(payload).subscribe(res => {
      if (res) {
        // console.log(res);
        this.videoURL = res.url;
        // window.open(res.url);
        this.spinner.hide();
      } else { this.spinner.hide(); }
    }, err => {
      this.spinner.hide();
      // console.log('network error');

    });
  }
  transform(url) {
    if (url != null) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
  }

}
