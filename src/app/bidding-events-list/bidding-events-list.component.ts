
import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../_services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BiddingEvent, IBiddingEvent } from '../models/bidding-event';
import { RemainingTime } from '../models/remaining-time';
import { BiddingEventService } from '../_services/bidding-event.service';
import { ChangeDetectorRef } from '@angular/core';
import { BidService } from '../_services/bid.service';
import { map, filter, debounceTime, distinctUntilChanged, tap } from "rxjs/operators";
import { fromEvent } from 'rxjs';
declare var Materialize;
declare var jQuery: any;
@Component({
  selector: 'app-bidding-events-list',
  templateUrl: './bidding-events-list.component.html',
  styleUrls: ['./bidding-events-list.component.css']
})
export class BiddingEventsListComponent implements OnInit {
  p = 1;
  createdAt;
  searchTerm;
  search = false;
  itemsList = [1];
  itemsPerPage = 10;
  public chkLoggedInUser: any;
  public hideAddBtn: boolean;
  public biddingEvents: BiddingEvent[] = [];
  public biddingEventsArr: any = [];
  public biddingStatus: number = 0; // 0:scheduled , -1:expired , 1:active
  public remainingTime: RemainingTime = new RemainingTime();
  selectedBiddingEvent: IBiddingEvent;
  public noBiddingEvents: boolean = true;
  // @ViewChild('searchByName', { static: true }) searchByName: ElementRef;
  @ViewChild('searchByName', { static: true }) searchByName: ElementRef;

  jobProfileType: any = "public";
  selectedJobType: any;
  jp = [];

  startDate: any;
  endDate: any;
  userRole:string;
  constructor(private router: Router, private cdr: ChangeDetectorRef, private spinner: NgxSpinnerService, private userService: UserService, private biddingService: BidService, private route: ActivatedRoute, private bidEventService: BiddingEventService) {
    this.chkLoggedInUser = this.userService.getUserData();
    if (this.chkLoggedInUser != "no") {
      if (this.chkLoggedInUser.userRole == "employer") {
        this.userRole = this.chkLoggedInUser.userRole;
        let obj = {
          onLoad: true,
          type: this.jobProfileType === "public" ? false : true,
          itemsPerPage: this.itemsPerPage
        }
        this.getJobProfileBidding(obj);
        this.hideAddBtn = false;
      } else if (this.chkLoggedInUser.userRole == "recruiter") {
        this.userRole = this.chkLoggedInUser.userRole;
        this.route.params.subscribe(params => { this.handleRequest(params['type']); });
        this.hideAddBtn = false;
      }else if(this.chkLoggedInUser.userRole == "candidate"){
        this.userRole = this.chkLoggedInUser.userRole;
        // this.route.params.subscribe(params => { this.handleRequest(params['type']); });
        this.getCandidateBiding();
        this.hideAddBtn = true;
      }
    } else {
      //Do something
    }
  }

  ngOnInit() {

    this.jp = [{
      _id: 1,
      type: "public"
    }, {
      _id: 2,
      type: "private"
    }];

    jQuery('.datepicker').on('mousedown', function (event) {
      event.preventDefault();
    })

    jQuery('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15 // Creates a dropdown of 15 years to control year
    });

    var a = this;
    var activationDate_input = jQuery('#activationDate').pickadate();
    var activationDate_picker = activationDate_input.pickadate('picker');

    var expiryDate_input = jQuery('#expiryDate').pickadate();
    var expiryDate_picker = expiryDate_input.pickadate('picker');

    activationDate_picker.on({

      set: function () {
        let temp: Date = new Date(activationDate_picker.get('select').pick);
        a.startDate = temp.getTime();
        if (a.endDate === undefined) {
          this.searchTerm = true;
          let obj = {
            dateSearch: true,
            startDate: (a.startDate / 1000),
            itemsPerPage: a.itemsPerPage,
            type: a.jobProfileType === "public" ? false : true
          }
          a.getJobProfileBidding(obj);
          a.resetValues();
        } else if (!(temp.getTime() <= a.endDate)) {
          Materialize.toast('Activation date should not be greater than Expiry date.', 4000);
          activationDate_picker.set('select', new Date());
        } else {
          this.searchTerm = true;
          let obj = {
            dateSearch: true,
            startDate: (a.startDate / 1000),
            endDate: (a.endDate / 1000) + (12 * 60 * 60),
            itemsPerPage: a.itemsPerPage,
            type: a.jobProfileType === "public" ? false : true
          }
          a.getJobProfileBidding(obj);
          a.resetValues();
        }
      }

    });

    expiryDate_picker.on({

      set: function () {
        let temp: Date = new Date(expiryDate_picker.get('select').pick);
        a.endDate = temp.getTime();
        if (a.startDate === undefined) {
          this.searchTerm = true;
          let obj = {
            dateSearch: true,
            endDate: (a.endDate / 1000) + (12 * 60 * 60),
            itemsPerPage: a.itemsPerPage,
            type: a.jobProfileType === "public" ? false : true
          }
          a.getJobProfileBidding(obj);
          a.resetValues();
        } else if (!(temp.getTime() >= a.startDate)) {
          Materialize.toast('Expiry date should be greater than Activation Date.', 4000);
          expiryDate_picker.set('select', new Date());
        } else {
          this.searchTerm = true;
          let obj = {
            dateSearch: true,
            startDate: (a.startDate / 1000),
            endDate: (a.endDate / 1000) + (12 * 60 * 60),
            itemsPerPage: a.itemsPerPage,
            type: a.jobProfileType === "public" ? false : true
          }
          a.getJobProfileBidding(obj);
          a.resetValues();
        }
      }
    });

  }

  resetValues() {
    this.p = 1;
    this.itemsList = [1];
    this.createdAt = null;
    this.biddingEvents = [];
  }

  ngAfterViewInit() {
    if (this.chkLoggedInUser.userRole == "recruiter") {
      this.search = true;
      jQuery(".postingForm").css("display", "none");
    }
    // server-side search
    if (!this.hideAddBtn) {
      this.searchTermByName();
    }
  }

  searchTermByName() {
    fromEvent(this.searchByName.nativeElement, 'keyup')
      .pipe(
        map(event => event),
        filter(Boolean),
        debounceTime(1000),
        distinctUntilChanged(),
        tap((text) => {
          this.search = this.searchTerm === "" ? false : true;
          this.getJobProfileBidding({
            search: this.search,
            searchTerm: this.searchTerm,
            type: this.jobProfileType === "public" ? false : true,
            itemsPerPage: this.searchTerm === "" ? this.itemsPerPage : undefined,
            onLoad: this.searchTerm === "" ? true : undefined
          });
          this.resetValues();
        })
      )
      .subscribe();
  }

  handleRequest(requestType: string) {
    if (requestType == 'my') {
      this.getMyBids();
    } else {
      this.getAllBidEvents();
    }
  }

  onDelete(event) {
    this.bidEventService.deletejobPost(event, this.chkLoggedInUser._id).subscribe((data) => {
      if (data) {
        Materialize.toast('JobPost Deleted Successfully !', 1000);
        jQuery('#DeleteConfirm' + event).modal('close');
        this.removeElementFromBiddingList(event);
      }
    }, (error) => {
      Materialize.toast(error, 1000);
      jQuery('#DeleteConfirm' + event).modal('close');
    })
  }

  removeElementFromBiddingList(id) {
    for (let i = 0; i < this.biddingEvents.length; i++) {
      if (this.biddingEvents[i]._id === id) {
        this.biddingEvents.splice(i, 1);
        break;
      }
    }
  }

  getJobProfileBidding(obj) {
    this.spinner.show();
    this.bidEventService.getBiddingEvents(obj).subscribe((data: BiddingEvent[]) => {
      if (data.length > 0) {
        this.biddingEvents = [...this.biddingEvents, ...data];
        this.createdAt = data[data.length - 1].createdAt;
        this.noBiddingEvents = false;
      }
      this.spinner.hide();

    }, (error) => {
      this.spinner.hide();
      console.log(error);
    });
  }

  getMyBids() {
    this.spinner.show();
    this.bidEventService.getMyBids(this.chkLoggedInUser._id).subscribe((data: BiddingEvent[]) => {
      if (data.length > 0) {

        this.biddingEvents = data;
        this.noBiddingEvents = false;
        this.spinner.hide();
      } else {
        this.noBiddingEvents = true;
        this.spinner.hide();
      }
    }, (error) => {
      console.log(error);
      this.spinner.hide();
    })
  }

  getAllBidEvents() {
    this.spinner.show();
    this.biddingService.getRecruiterBidsCount(this.chkLoggedInUser._id).subscribe((data: BiddingEvent[]) => {
      if (data.length > 0) {
        this.noBiddingEvents = false;
        this.biddingEvents = data;
        this.spinner.hide();
      } else {
        this.noBiddingEvents = true;
        this.spinner.hide();
      }
    }, (error) => {
      console.log(error);
      this.spinner.hide();
    });
  }


  onSelect(biddingEvent_Id) {
    this.router.navigate(['/bidding-events/details/' + biddingEvent_Id]);
  }

  handlePagination($event) {
    this.p = $event;
    if (this.itemsList.indexOf($event) !== -1 || this.search) {
      return;
    }
    this.itemsList.push($event);
    let obj = {
      createdAt: this.createdAt,
      type: this.jobProfileType === "public" ? false : true,
      itemsPerPage: this.itemsPerPage
    }
    this.getJobProfileBidding(obj);
  }

  jobProfileVal(val, id) {
    this.clickDropdown("none", '0');
    if (this.jobProfileType === val) {
      return;
    }

    this.p = 1;
    this.itemsList = [1];
    this.biddingEvents = [];
    this.jobProfileType = val;

    this.getJobProfileBidding({
      onLoad: true,
      type: this.jobProfileType === "public" ? false : true,
      itemsPerPage: this.itemsPerPage
    });

  }

  clickDropdown(val, opacity) {
    jQuery("#globalDropdown2").css("display", val);
    jQuery("#globalDropdown2").css("opacity", opacity);
  }

  handleToggleSign(obj) {
    if (obj.searchTab) {
      jQuery(".postingForm").css("display", "block");
    } else {
      jQuery(".postingForm").css("display", "none");
    }
  }
  getCandidateBiding(){
    this.spinner.show();
    this.biddingService.getCandidateBidsCount(this.chkLoggedInUser._id).subscribe((data: BiddingEvent[]) => {
      if (data.length > 0) {
        this.noBiddingEvents = false;
        this.biddingEvents = data;
        this.spinner.hide();
      } else {
        this.noBiddingEvents = true;
        this.spinner.hide();
      }
    }, (error) => {
      console.log(error);
      this.spinner.hide();
    });
  }

}
