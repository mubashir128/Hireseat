import { Component, Input, OnChanges, HostListener, ElementRef, Output, EventEmitter } from '@angular/core';
import 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Bid, IBid } from '../models/bid';
import { IBiddingEvent, BiddingEvent } from '../models/bidding-event';
import { BidService } from '../_services/bid.service';
import { IUser } from '../models/user';
import { UserService } from '../_services/user.service';
import { ResumeService } from '../_services/resume.service';
import { IResume, Resume } from '../models/resume';
import { BiddingEventService } from '../_services/bidding-event.service';
import { FeedbackService } from 'src/app/_services/feedback.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
declare var jQuery;
declare var Materialize;
@Component({
  selector: 'app-recruiter-bidding-interview-info',
  templateUrl: './recruiter-bidding-interview-info.component.html',
  styleUrls: ['./recruiter-bidding-interview-info.component.css']
})
export class RecruiterBiddingInterviewInfoComponent implements OnChanges {

  @Input() public biddingEvent: IBiddingEvent;
  @HostListener('document:click', ['$event'])
  @Output() InterviewCount: EventEmitter<any> = new EventEmitter<any>();
  @Output() HiredCount: EventEmitter<any> = new EventEmitter<any>();
  // some issue while opening and closing custom dropdown done using hostlistener


  biddingStatus = 0; // 0:scheduled , -1:expired , 1:active
  bid: IBid;
  public loggedUser: any;
  bids: IBid[];
  p: any;
  public bidFrm: FormGroup;
  public resumePoints: FormGroup;
  myBids: any[];
  user: IUser;
  resumes: IResume[];
  ResumeList: any[] = [];
  errorMsg = false;
  noRecords = false;
  selectedResume: IResume;
  isShow = false;
  totalCandidateBidded = 0;
  SelectedBid = 0;
  CandidateName: String = '';
  isPrevBid: IBid[] = [];
  public FeedObj: any = {};
  public skillsPt: number;
  public experiencePt: number;
  public personalityPt: number;

  currentRecruterId: any;
  clickout(event) {
    if (jQuery(event.target).attr('id') == 'toggleDropdownId') {
      jQuery('#dropdown_jobProfile_resume').addClass('dropdown-toggle');
    } else {
      jQuery('#dropdown_jobProfile_resume').removeClass('dropdown-toggle');
    }

  }
  constructor(public userService: UserService, private resumeService: ResumeService, private formBuilder: FormBuilder,
    private bidService: BidService, private router: Router, private bidEventService: BiddingEventService,
    public spinner: NgxSpinnerService, private route: ActivatedRoute, private feedbackService: FeedbackService,
    private sanitizer: DomSanitizer, private eRef: ElementRef) {

    this.loggedUser = this.userService.getUserData();
    this.bidFrm = this.formBuilder.group({
      selectedResume: ['', Validators.compose([Validators.required])]
    });

    this.resumePoints = this.formBuilder.group({
      resumePoint1: ['', Validators.compose([Validators.required])],
      resumePoint2: ['', Validators.compose([Validators.required])],
      resumePoint3: ['', Validators.compose([Validators.required])]
    });

    this.bid = new Bid();
    this.populateResumes();

    this.ngOnChanges();

  }


  get f() { return this.bidFrm.controls; }

  get frm() { return this.resumePoints.controls; }

  ngOnChanges() {

    let userData = this.userService.getUser();
    this.currentRecruterId = userData.userInfo._id;
    jQuery('select').material_select();
    jQuery('.modal').modal();

    if (this.loggedUser != 'no') {
      if (this.biddingEvent) {
        if (this.biddingEvent.status === BiddingEvent.STATUS_ACTIVE) {
          this.biddingStatus = 1;
          this.setupNewBid();
          this.populateBids();
        } else if (this.biddingEvent.status === BiddingEvent.STATUS_EXPIRED) {
          this.biddingStatus = -1;
          this.populateMyBids();
          this.populateBids();
        } else {
          this.biddingStatus = 0;
        }
      }
    }

    jQuery('.dropdown-button_resume').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: false, // Does not change width of dropdown to that of the activator
      hover: false, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: false, // Displays dropdown below the button
      alignment: 'left', // Displays dropdown with edge aligned to the left of button
      stopPropagation: false // Stops event propagation activationDate
    });

    this.route.params.subscribe(params => { this.getInterviewdResume(params['key']); });

  }

  toggleDropdown() {
    jQuery('#dropdown_jobProfile_resume').addClass('dropdown-toggle');
  }


  getInterviewdResume(key) {
    this.feedbackService.getInterviewdResumeForRecruiter(key).subscribe((data) => {
      if (data != null) {
        this.ResumeList = data;
        this.InterviewCount.emit(this.ResumeList.length);
        this.feedbackService.getHiredResumeCount(key).subscribe((res) => {
          this.HiredCount.emit(res);
        });
        if (!(this.ResumeList.length > 0)) {
          this.errorMsg = true;
        }
      } else {
        this.noRecords = true;
      }
    }, (error) => {
      console.log(error);
    });
  }

  setupNewBid() {
    this.bid = new Bid();
    this.bid.biddingEventKey = this.biddingEvent.$key;
    this.bid.recruiterKey = this.loggedUser._id;
    if (this.loggedUser.companyName) {
      this.bid.recruiterName = this.loggedUser.companyName;
    }
    this.populateBids();
    this.populateMyBids();
  }

  populateBids() {
    this.spinner.show();
    this.bidService.getAllBids(this.biddingEvent.$key).subscribe((data: IBid[]) => {
      this.bids = data;
      if (this.bids.length) {
        this.getBiddingDetails();
      }
      this.spinner.hide();
    },
      (error) => {
        this.spinner.hide();
        console.log(error);
      });
  }

  getBiddingDetails() {
    this.spinner.show();
    this.bidService.getBiddingDetails(this.biddingEvent.$key).subscribe((data: any) => {
      this.totalCandidateBidded = data.max;
      this.SelectedBid = data.min;
      this.spinner.hide();
    },
      (error) => {
        this.spinner.hide();
        console.log(error);
      });
  }

  populateMyBids() {
    this.spinner.show();
    this.bidService.getRecruiterBids(this.loggedUser._id, this.biddingEvent.$key).subscribe((data: any) => {
      this.spinner.hide();
      this.myBids = data;
    },
      (error) => {
        this.spinner.hide();
        console.log(error);
      });
  }

  populateResumes() {
    this.spinner.show();
    this.resumeService.getAllResume().subscribe((data: IResume[]) => {
      this.resumes = data;
      if (this.resumes.length > 0) {
        this.isShow = true;
      }
      else {
        this.isShow = false;
      }

      this.spinner.hide();
    }, (error) => {
      this.spinner.hide();
      console.log(error);
    });
  }

  selectedResumeVal(id, name) {
    this.selectedResume = new Resume();
    this.selectedResume._id = id;
    this.CandidateName = name;
    this.selectedResume.candidateName = name;
    jQuery('#dropdown_jobProfile_resume').removeClass('dropdown-toggle');

  }

  getBiddingEventById(_id) {
    this.spinner.show();
    this.bidEventService.getBiddingEventById(_id).subscribe((data: BiddingEvent) => {
      this.biddingEvent = data;
      this.spinner.hide();
    }, (error) => {
      console.log(error);
      this.spinner.hide();
    });
  }

  submitBid() {
    if (this.bidFrm.valid) {
      this.spinner.show();
      this.bid.resumeKey = this.selectedResume._id;
      this.bid.candidateName = this.selectedResume.candidateName;
      if (this.myBids.findIndex(obj => obj.resumeKey._id == this.bid.resumeKey) == -1) {
        this.showPointsModal();
      } else {
        Materialize.toast('Your candidate is already bidding.', 4000);
      }
      this.spinner.hide();
    } else {
      Materialize.toast('Select Resume.', 4000);
    }
  }

  showPointsModal() {
    jQuery('#ThreePointsModel').modal('open');
  }

  submitresumePoints() {
    if (this.resumePoints.valid) {
      this.bid.StrongPoint1 = this.resumePoints.value.resumePoint1;
      this.bid.StrongPoint2 = this.resumePoints.value.resumePoint2;
      this.bid.StrongPoint3 = this.resumePoints.value.resumePoint3;
      this.createBid();
    }
  }

  createBid() {
    this.spinner.show();
    this.bid.resumeKey = this.selectedResume._id;
    this.bid.candidateName = this.selectedResume.candidateName;
    this.bidService.createBid(this.bid).subscribe((data: any) => {
      if (data.result == 'inserted') {
        Materialize.toast('Bid submitted successfully! !', 4000);
        jQuery('#ThreePointsModel').modal('close');
        this.populateBids();
        this.populateMyBids();
        this.populateResumes();
      } else {
        Materialize.toast('Something Went Wrong!', 4000);
      }
      this.spinner.hide();
    },
      (error) => {
        console.log(error);
        this.spinner.hide();
        Materialize.toast('Something Went Wrong!', 4000);
      });
  }

  createNewResume() {
    this.router.navigate(['/recruiter/resume-list']);
  }
}
