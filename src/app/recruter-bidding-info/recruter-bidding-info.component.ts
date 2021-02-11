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
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
declare var jQuery;
declare var Materialize;

@Component({
  selector: 'app-recruter-bidding-info',
  templateUrl: './recruter-bidding-info.component.html',
  styleUrls: ['./recruter-bidding-info.component.css']
})
export class RecruterBiddingInfoComponent implements OnChanges {
  @Input() public biddingEvent: IBiddingEvent;
  id: any;
  profileDetails: any;
  suggestedResume: any;
  resumeid: any[];
  bididkey: any;

  @HostListener('document:click', ['$event'])

  // some issue while opening and closing custom dropdown done using hostlistener
  // clickout(event) {
  //   console.log(event.target);
  //   if (jQuery(event.target).attr('id') == 'toggleDropdownId') {
  //     jQuery("#dropdown_jobProfile_resume").addClass("dropdown-toggle");
  //   } else {
  //     jQuery("#dropdown_jobProfile_resume").removeClass("dropdown-toggle");
  //   }

  // }



  biddingStatus: number = 0;// 0:scheduled , -1:expired , 1:active
  bid: IBid;
  public loggedUser: any;
  bids: IBid[];
  public bidFrm: FormGroup;
  public resumePoints: FormGroup;
  myBids: any[];
  user: IUser;
  p: any;
  resumes: IResume[];
  ResumeList: any[] = [];
  errorMsg: boolean = false;
  noRecords: boolean = false;
  selectedResume: IResume;
  isShow: boolean = false;
  totalCandidateBidded: number = 0;
  SelectedBid: number = 0;
  CandidateName: String = "";
  isPrevBid: IBid[] = [];
  public FeedObj: any = {};
  public skillsPt: number;
  public experiencePt: number;
  public personalityPt: number;
  tempResume: any;
  @Output() ResumeCount: EventEmitter<any> = new EventEmitter<any>();
  @Output() InterviewCount: EventEmitter<any> = new EventEmitter<any>();
  currentRecruterId: any;
  showdropDown: boolean = false
  searchvalue: any;
  data: IResume[];
  showdropdown: boolean = false;
  // resumeData = ["5dc163ceb2ca5513b07a8cc6","5dc161a4b2ca5513b07a8cc2","5dc161ffb2ca5513b07a8cc4","5dc3d3b414707b09f405916c","5dc3e9d014707b09f4059176","5dc2c88114e68e1a946e3368"];
  Data = [];
  constructor(
    public userService: UserService,
    private resumeService: ResumeService,
    private formBuilder: FormBuilder,
    private bidService: BidService,
    private router: Router,
    private bidEventService: BiddingEventService,
    public spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private feedbackService: FeedbackService,
    private sanitizer: DomSanitizer,
    private eRef: ElementRef) {


    this.loggedUser = this.userService.getUserData();
    this.bidFrm = this.formBuilder.group({
      selectedResume: ['', Validators.compose([Validators.required])]
    });

    this.resumePoints = this.formBuilder.group({
      resumePoint1: ['', Validators.compose([Validators.required, Validators.maxLength(200)])],
      resumePoint2: ['', Validators.compose([Validators.required, Validators.maxLength(200)])],
      resumePoint3: ['', Validators.compose([Validators.required, Validators.maxLength(200)])],
      recruiterCost: ['', Validators.required]
    });

    this.bid = new Bid();
    this.populateResumes();

    this.ngOnChanges();

  }


  get f() { return this.bidFrm.controls; }

  get frm() { return this.resumePoints.controls }

  ngOnChanges() {

    this.route.params.subscribe(params => { this.getJobprofileDetails(params['key']) });

    var userData = this.userService.getUser();
    this.currentRecruterId = userData.userInfo._id;

    jQuery('select').material_select();
    jQuery('.modal').modal();

    if (this.loggedUser != "no") {
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

    this.route.params.subscribe(params => { this.handleRequest(params['key']); });
  }
  onfocus(e) {
    jQuery("#dropdown_jobProfile_resume").addClass("dropdown-toggle");

  }
  getJobprofileDetails(bidid) {

    this.spinner.show();

    this.feedbackService.getJobprofileDetails(bidid).subscribe((response) => {
      this.profileDetails = response.jobProfileKey;

      this.resumeService.getsuggestedresume(this.profileDetails._id).subscribe((res: any) => {

        this.suggestedResume = res;
      })
      this.spinner.hide();
    }, (error) => {
      console.log(error);
      this.spinner.hide();
    })
  }

  openDropdown() {

    jQuery("#dropdown_jobProfile_resume").addClass("dropdown-toggle");


    this.showdropdown = true;

  }
  toggle(event) {

    if (jQuery(event.target).attr('id') == 'toggleDropdownId') {
      jQuery("#dropdown_jobProfile_resume").addClass("dropdown-toggle");
    } else {
      jQuery("#dropdown_jobProfile_resume").removeClass("dropdown-toggle");
    }

  }
  searchtext(event) {

    this.resumes = this.tempResume;
    this.searchvalue = event.target.value;
    if (this.searchvalue == '') {
      return
    }
    var regexp = new RegExp(this.searchvalue, 'i')
    this.resumes = this.resumes.filter(resume => regexp.test(resume.candidateName));
    return this.resumes

  }

  handleRequest(key) {
    this.feedbackService.getBidsByIdForRecruiter(key).subscribe((data) => {
      if (data != null) {
        this.ResumeList = data
        this.ResumeCount.emit(this.ResumeList.length);
        this.feedbackService.getInterviewdResumeCount(key).subscribe((res) => {
          this.InterviewCount.emit(res);
        });
        if (!(this.ResumeList.length > 0)) {
          this.errorMsg = true;
        }
      } else {
        this.noRecords = true;
      }
    }, (error) => {
      console.log(error);
    })
  }

  selectRating(event) {
    jQuery(event.srcElement).parent().find("label").css({ "color": "#D8D8D8" });
    jQuery(event.srcElement).css({ "color": "#FFC107" });
    jQuery(event.srcElement).nextAll().css({ "color": "#FFC107" });
  }






  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  setupNewBid() {
    this.bid = new Bid();
    this.bid.biddingEventKey = this.biddingEvent.$key;
    this.bid.recruiterKey = this.loggedUser._id;
    if (this.loggedUser.companyName)
      this.bid.recruiterName = this.loggedUser.companyName;
    this.populateBids();
    this.populateMyBids();
  }



  populateBids() {
    this.spinner.show();

    this.bidService.getAllBids(this.biddingEvent.$key).subscribe((data: IBid[]) => {
      this.resumeid = data.map(function (obj) {
        return obj.resumeKey;
      });
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

      this.resumeid = data.resumeKey


    },
      (error) => {
        this.spinner.hide();
        console.log(error);
      });

  }

  populateResumes() {
    this.spinner.show();
    this.route.params.subscribe(params => {
      this.bididkey = params['key'];
    })

    this.resumeService.getAllResume().subscribe((data: IResume[]) => {
      var resumeList = [];
      if (data.length > 0) {
        data.forEach(element => {



          if (element.resumeType == 'resume_bank') {
            element.candidateName = element.resumeBank_id.firstName + " " + element.resumeBank_id.lastName
            resumeList.push(element)
          } else {
            resumeList.push(element);
          }



        });
        this.isShow = true;
        this.resumes = resumeList;
        this.tempResume = this.resumes;

      } else
        this.isShow = false;

      this.spinner.hide();

    }, (error) => {
      this.spinner.hide();
      console.log(error);
    });

  }

  selectedResumeVal(id, name) {
    this.selectedResume = name;
    this.selectedResume = new Resume();
    this.selectedResume._id = id;
    this.CandidateName = name;
    this.selectedResume.candidateName = name;
    jQuery("#dropdown_jobProfile_resume").removeClass("dropdown-toggle");

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
  submitsuggestedBid(id, firstName, lastName) {
    this.selectedResume = new Resume();
    this.selectedResume._id = id;
    this.CandidateName = firstName + lastName;
    this.selectedResume.candidateName = firstName + lastName;
    this.showPointsModal();
    // this.submitBid();
  }
  submitBid() {
    if (this.bidFrm.valid) {
      this.spinner.show();
      this.bid.resumeKey = this.selectedResume._id;
      this.bid.candidateName = this.selectedResume.candidateName;

      if (this.bids.findIndex(obj => obj.resumeKey == this.bid.resumeKey) == -1) {
        this.showPointsModal();

      } else {
        this.spinner.hide();
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
      this.bid.RecruiterCost = this.resumePoints.value.recruiterCost;
      this.createBid();

    }
  }

  createBid() {
    this.spinner.show();
    this.bid.resumeKey = this.selectedResume._id;
    this.bid.candidateName = this.selectedResume.candidateName;
    this.bidService.createBid(this.bid).subscribe((data: any) => {
      if (data.result == "inserted") {

        Materialize.toast('Candidate submitted successfully! !', 4000);

        this.resumeService.getsuggestedresume(this.profileDetails._id).subscribe((res: any) => {
          this.suggestedResume = res;
          this.resumePoints.reset();
        })
        this.populateBids();

        jQuery('#ThreePointsModel').modal('close');
        this.populateBids();
        this.populateMyBids();
        this.populateResumes();
        this.route.params.subscribe(params => { this.handleRequest(params['key']); });
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
