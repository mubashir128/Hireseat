import {
  Component, Input, OnChanges, Output, EventEmitter,
  AfterViewInit, ElementRef, ViewChild, ViewEncapsulation, OnDestroy, OnInit
} from '@angular/core';
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
import { IProfile, Profile } from 'src/app/profile/model/user-profile';
import { VideoCallingService } from '../_services/video-calling.service';
import videojs from 'video.js';

declare var jQuery;
declare var $: any;
declare var Materialize;
@Component({
  selector: 'app-bidding-info',
  templateUrl: './bidding-info.component.html',
  styleUrls: ['./bidding-info.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class BiddingInfoComponent implements AfterViewInit, OnChanges, OnDestroy, OnInit {
  @ViewChild('target') target: ElementRef;
  options: {
    fluid: boolean,
    aspectRatio: string,
    autoplay: boolean,
    controlls: boolean,
    sources: {
      src: string,
      type: string,
    }[],
  };
  player: videojs.Player;


  @Input() public biddingEvent: IBiddingEvent;
  @Output() ResumeCount: EventEmitter<any> = new EventEmitter<any>();
  @Output() InterviewCount: EventEmitter<any> = new EventEmitter<any>();
  public userProfile: IProfile;
  biddingStatus: number = 0; // 0:scheduled , -1:expired , 1:active
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
  selectedIndex: any;

  isPrevBid: IBid[] = [];
  public FeedObj: any = {};
  public skillsPt: number;
  public experiencePt: number;
  public personalityPt: number;
  ratingPoints: any = { skillMatch: 0, experienceMatch: 0, educationMatch: 0, rejectOrInterview: 0, commentPoints: 0, total: 0 }
  count: any;
  id: string;
  videoURL: any;
  vid: HTMLElement;

  constructor(
    private userService: UserService, private resumeService: ResumeService, private formBuilder: FormBuilder,
    private bidService: BidService, private router: Router, private bidEventService: BiddingEventService,
    public spinner: NgxSpinnerService, private route: ActivatedRoute, private feedbackService: FeedbackService,
    private sanitizer: DomSanitizer, private videoCallingService: VideoCallingService, private elementRef: ElementRef,

  ) {

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
    // this.vid = document.getElementById('myVideo');
  }
  ngOnInit() {
  }

  get f() { return this.bidFrm.controls; }

  get frm() { return this.resumePoints.controls }
  ngAfterViewInit() {
    // instantiate Video.js
    if (this.videoURL) {
      this.player = videojs(this.target.nativeElement, {
        autoplay: true,
        controlls: true
      }, () => {
        console.log('onPlayerReady', this);
      });
    }

  }
  ngOnChanges() {
    jQuery('.modal').modal();
    jQuery('select').material_select();
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

    jQuery('.dropdown-button').dropdown({
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

  getUsersProfile() {
    this.userService.getUserProfile(this.userService.getUserData().userRole).subscribe((data: any) => {
      if (data != null && data != undefined && data != "") {
        this.userProfile = data.res;
      } else {
        Materialize.toast('Something went wrong', 1000)
      }
      this.spinner.hide();
    }, (error) => {
      // console.log(error);
      this.spinner.hide();
    });
  }
  animate(index) {
    // $('#approveBtn').on('click', function () {
    var cart = $('.interview');
    var imgtodrag = $('#img' + index).eq(0);
    ;
    if (imgtodrag) {
      var imgclone = imgtodrag.clone()

        .offset({

          top: imgtodrag.offset().top,
          left: imgtodrag.offset().left
        })
        .css({
          'opacity': '0.5',
          'position': 'absolute',
          'height': '150px',
          'width': '150px',
          'z-index': '100'
        })
        .appendTo($('body'))
        .animate({
          'top': cart.offset().top + 10,
          'left': cart.offset().left + 10,
          'width': 75,
          'height': 75
        }, 1000, 'easeInOutExpo');
      // setTimeout(function () {
      //     cart.effect("shake", {
      //         times: 2
      //     }, 200);
      // }, 1500);

      imgclone.animate({
        'width': 100,
        'height': 100
      }, function () {
        $(this).detach()
      });
    }
    // });
  }
  handleRequest(key) {
    this.feedbackService.getBidsById(key).subscribe((data) => {
      if (data != null) {
        this.ResumeList = data;
        this.ResumeCount.emit(this.ResumeList.length);
        // console.log('ResumeList****************', this.ResumeList);
        this.feedbackService.getInterviewdResumeCount(key).subscribe((res) => {

          this.InterviewCount.emit(res);
        });
        if (!(this.ResumeList.length > 0)) {
          this.errorMsg = true;
        } else {
          this.ResumeList.forEach(el => {
            if (el.resumeKey) {
              if (el.resumeKey.resumeType == 'resume_bank') {
                el.resumeKey.fileURL = el.resumeKey.resumeBank_id.resumeUrl
              }
            }

          })
        }
      } else {
        this.noRecords = true;
      }
    }, (error) => {
      // console.log(error);
    })
  }

  selectRating(event) {
    jQuery(event.srcElement).parent().find("label").css({ "color": "#D8D8D8" });
    jQuery(event.srcElement).css({ "color": "#FFC107" });
    jQuery(event.srcElement).nextAll().css({ "color": "#FFC107" });
  }

  feedBack(resumeBidId, interviewOrReject, commentId, index) {
    var cart = $('.interview');
    var imgtodrag = $('#img' + index).eq(0);
    let element = document.getElementById('animateinterview' + index);
    // element.className = 'singleListClick singleList resumeSingleList';



    this.skillsPt = (jQuery("input[name='" + 'rating1' + resumeBidId + "']:checked").val());
    this.experiencePt = (jQuery("input[name='" + 'rating2' + resumeBidId + "']:checked").val());
    this.personalityPt = (jQuery("input[name='" + 'rating3' + resumeBidId + "']:checked").val());
    if (this.skillsPt == 33 && this.experiencePt == 33 && this.personalityPt == 33 && interviewOrReject == 'no') {
      Materialize.toast("Can't reject with the highest rating !", 3000)
      return
    }

    if (this.skillsPt != undefined && this.experiencePt != undefined && this.personalityPt != undefined) {
      if (imgtodrag && interviewOrReject == 'yes') {
        var imgclone = imgtodrag.clone()

          .offset({

            top: imgtodrag.offset().top,
            left: imgtodrag.offset().left
          })
          .css({
            'opacity': '0.5',
            'position': 'absolute',
            'height': '150px',
            'width': '150px',
            'z-index': '100'
          })
          .appendTo($('body'))
          .animate({
            'top': cart.offset().top + 10,
            'left': cart.offset().left + 10,
            'width': 75,
            'height': 75
          }, 1000, 'easeInOutExpo');


        imgclone.animate({
          'width': 100,
          'height': 100
        }, function () {
          $(this).detach()
        });
      }
      this.ratingPoints.skillMatch = 50; this.ratingPoints.experienceMatch = 50;
      this.ratingPoints.educationMatch = 50; this.ratingPoints.rejectOrInterview = 100;
      this.ratingPoints.total = this.ratingPoints.skillMatch + this.ratingPoints.experienceMatch + this.ratingPoints.educationMatch + this.ratingPoints.rejectOrInterview;
      /* let skillMatch = 50 ; let experienceMatch = 50 ; let educationMatch = 50 ; let rejectOrInterview = 100 ;
      var ratingPoints = skillMatch + experienceMatch + educationMatch + rejectOrInterview; */
      var comment = jQuery("#" + commentId).val();
      if (comment.length > 0 && comment.length < 11) {
        this.ratingPoints.commentPoints = 200;
        this.ratingPoints.total += this.ratingPoints.commentPoints;
      } else if (comment.length > 10 && comment.length < 141) {
        this.ratingPoints.commentPoints = 600;
        this.ratingPoints.total += this.ratingPoints.commentPoints;
      } else if (comment.length > 140) {
        this.ratingPoints.commentPoints = 1000;
        this.ratingPoints.total += this.ratingPoints.commentPoints;
      } else {
        this.ratingPoints.commentPoints = 0;
        this.ratingPoints.total += this.ratingPoints.commentPoints;
      }
      this.FeedObj.ratingPoints = this.ratingPoints.total;
      this.FeedObj.skillsPt = this.skillsPt;
      this.FeedObj.experiencePt = this.experiencePt;
      this.FeedObj.personalityPt = this.personalityPt;
      this.FeedObj.interviewOrReject = (interviewOrReject == "yes" ? true : false);
      this.FeedObj.employerKey = this.loggedUser._id;
      this.FeedObj.BidId = resumeBidId;
      this.FeedObj.Comment = jQuery("#" + commentId).val() == "" && jQuery("#" + commentId).val() == undefined ? "" : jQuery("#" + commentId).val();
      element.className = 'singleListClick singleList resumeSingleList';
      setTimeout(() => {
        this.feedbackService.saveFeedBack(this.FeedObj).subscribe((data: any) => {
          if (data.res == "success") {


            this.getUsersProfile();
            /*  jQuery('#ratingPoints').modal('open'); */
            this.route.params.subscribe(params => { this.handleRequest(params['key']); });
          } else {
            Materialize.toast('Something Went Wrong', 1000)
          }
        }, (error) => {
          // console.log(error)
        })
      }, 800);


    } else {
      Materialize.toast('Please give the rating first', 1000)
    }
  }


  transform(url) {
    if (url != null) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

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
      this.bids = data;
      if (this.bids.length) {
        this.getBiddingDetails();
      }
      this.spinner.hide();
    },
      (error) => {
        this.spinner.hide();
        // console.log(error);
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
        // console.log(error);
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
        // console.log(error);
      });
  }

  populateResumes() {
    this.spinner.show();
    this.resumeService.getAllResume().subscribe((data: IResume[]) => {
      this.resumes = data;
      if (this.resumes.length > 0)
        this.isShow = true;
      else
        this.isShow = false;

      this.spinner.hide();
    }, (error) => {
      this.spinner.hide();
      // console.log(error);
    });
  }

  selectedResumeVal(id, name) {
    this.selectedResume = new Resume();
    this.selectedResume._id = id;
    this.CandidateName = name;
    this.selectedResume.candidateName = name;;
  }

  getBiddingEventById(_id) {
    this.spinner.show();
    this.bidEventService.getBiddingEventById(_id).subscribe((data: BiddingEvent) => {
      this.biddingEvent = data;
      this.spinner.hide();
    }, (error) => {
      // console.log(error);
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
      this.bid.StrongPoint1 = this.resumePoints.value.resumePoint1
      this.bid.StrongPoint2 = this.resumePoints.value.resumePoint2
      this.bid.StrongPoint3 = this.resumePoints.value.resumePoint3
      this.createBid();
    }
  }

  createBid() {
    this.spinner.show();
    this.bid.resumeKey = this.selectedResume._id;
    this.bid.candidateName = this.selectedResume.candidateName;
    this.bidService.createBid(this.bid).subscribe((data: any) => {
      if (data.result == "inserted") {
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
        // console.log(error);
        this.spinner.hide();
        Materialize.toast('Something Went Wrong!', 4000);
      });
  }


  createNewResume() {
    this.router.navigate(['/recruiter/resume-list']);
  }
  seeVideo(i, archiveId) {
    // call video call service
    this.videoURL = '';
    console.log(i);
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
  closeVide() {
    this.videoURL = '';
  }
  seekVideo(time) {
    this.player.currentTime(time);

  }
  setCurrentTime(seconds) {
    // const video = document.getElementsByTagName('video')[0];
    // try {
    //   video.currentTime = seconds;
    // } catch (e) {
    //   // _V_.log(e);
    //   console.log(e);

    //   // this.warning(VideoJS.warnings.videoNotReady);
    // }
    try {
      this.target.nativeElement.currentTime = seconds;
    } catch (e) {
      console.log(e);

    }
  }
  ngOnDestroy(): void {
    // destroy player
    if (this.player) {
      this.player.dispose();
    }
  }
}
