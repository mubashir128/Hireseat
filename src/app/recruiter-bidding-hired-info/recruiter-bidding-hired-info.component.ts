import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { IBiddingEvent, BiddingEvent } from '../models/bidding-event';
import { FeedbackService } from 'src/app/_services/feedback.service';
import { Router,ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../_services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-recruiter-bidding-hired-info',
  templateUrl: './recruiter-bidding-hired-info.component.html',
  styleUrls: ['./recruiter-bidding-hired-info.component.css']
})
export class RecruiterBiddingHiredInfoComponent implements OnInit {
  @Input() public biddingEvent: IBiddingEvent;
  @Output() HiredCount: EventEmitter<any> = new EventEmitter<any>();

  
  hiredList:any[] = []
  currentRecruterId:any;
  p:any;
  constructor(
    private route: ActivatedRoute, 
    private feedbackService: FeedbackService,
    private sanitizer: DomSanitizer,
    private userService: UserService,
    public spinner: NgxSpinnerService
  ) { }

  ngOnInit() {

    this.route.params.subscribe(params => { this.getHiredResume(params['key']) });
  }

  getHiredResume(key){
    this.spinner.show();
    var userData = this.userService.getUser();
    this.currentRecruterId = userData.userInfo._id;
    this.feedbackService.getHiredResume(key).subscribe((response)=>{
      this.hiredList = response;
      this.HiredCount.emit(this.hiredList.length);
      this.spinner.hide();
    },(error)=>{
      console.log(error);
      this.spinner.hide();
    })
  }
  transform(url) {
  
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
     
    }
}
