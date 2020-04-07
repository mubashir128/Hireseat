
import { Component, OnInit,Input } from '@angular/core';
import { BiddingEvent } from '../../models/bidding-event';
import { UserService } from '../../_services/user.service';
import { JobProfile } from '../../models/job-profile';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BiddingEventService } from '../../_services/bidding-event.service';
import { RecruiterProfile } from 'src/app/models/recruiter-profile';
declare var jQuery: any;
declare var Materialize: any;
@Component({
  selector: 'app-create-bidding-event',
  templateUrl: './create-bidding-event.component.html',
  styleUrls: ['./create-bidding-event.component.css']
})
export class CreateBiddingEventComponent implements OnInit {
  biddingEvent: BiddingEvent;
  public auctionFrm: FormGroup;
  public jp: JobProfile[];
  public selectedJobProfile: any;
  public jobProfileName: string = "Select Job Profile";
  allRecruiterList = [];
  recruiterList = [];
  finalRecruiterList = [];
  startList : any[]=[1,2,3,4,5];
  itemsPerPageAreForTop = 5;
  pTop = 1;
  _searchTopTerm : any;
  itemsPerPageAreForFinal = 5;
  pFinal = 1;
  _searchFinalTerm : any;
  noBiddingEventsForTop = false;
  noBiddingEventsForFinal = false;
  tempRecruiters=[];
  globalType="private";
  publicRecruitersAre=[];
  privateRecruitersAre=[];
  finalRecruitersAre=[];
  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router, private spinner: NgxSpinnerService,
    private bidEventService: BiddingEventService) {
    this.biddingEvent = new BiddingEvent();
  }

  ngOnInit() {
   

    this.getRecruiterList();
    this.getJobProfile();
    jQuery('.datepicker').on('mousedown',function(event){
        event.preventDefault();
    })
    jQuery('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15 // Creates a dropdown of 15 years to control year
    });

    jQuery('select').material_select();

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

    this.auctionFrm = this.formBuilder.group({
      selectedJobProfile: ['', Validators.compose([Validators.required])],
      /* resumeLimit: ['', Validators.compose([Validators.required,Validators.pattern('^[1-9][0-9]*$')])], */
      rewardMoneyFrom: ['', Validators.compose([Validators.required])],
      rewardMoneyTo: ['', Validators.compose([Validators.required])],
      activationDate: [],
      expirydate: []
    },{validator: this.checkRewardMoney });

    var a = this;
    var activationDate_input = jQuery('#activationDate').pickadate();
    var activationDate_picker = activationDate_input.pickadate('picker');

    var expiryDate_input = jQuery('#expiryDate').pickadate();
    var expiryDate_picker = expiryDate_input.pickadate('picker');

    if (a.biddingEvent.activationDate === undefined || a.biddingEvent.activationDate === null) {
      a.biddingEvent.activationDate = new Date().getTime() / 1000;
    }

    if (a.biddingEvent.expiryDate === undefined || a.biddingEvent.expiryDate === null) {
      let current = new Date();
      current.setDate(current.getDate() + 7);
      a.biddingEvent.expiryDate = current.getTime() / 1000;
    }

    activationDate_picker.set('select', new Date(a.biddingEvent.activationDate * 1000));
    expiryDate_picker.set('select', new Date(a.biddingEvent.expiryDate * 1000));

    activationDate_picker.on({
      
      set: function () {
        let temp: Date = new Date(activationDate_picker.get('select').pick);
        let current: Date = new Date();
        if (temp.getFullYear() >= current.getFullYear() && temp.getMonth() >= current.getMonth() && temp.getDate() >= current.getDate()) {
          let expirydate: Date = new Date(a.biddingEvent.expiryDate * 1000);
          if (expirydate.getTime() > temp.getTime()) {
            a.biddingEvent.activationDate = temp.getTime() / 1000;
          } else {
            Materialize.toast('Activation date should not be greater than Expiry date.', 1000);
            activationDate_picker.set('select', new Date(a.biddingEvent.activationDate * 1000));
          }

        } else {
          Materialize.toast('Activation date should be greater than today.', 1000);
          activationDate_picker.set('select', new Date(a.biddingEvent.activationDate * 1000));
        }
      }
      
    });

    expiryDate_picker.on({
     
      set: function () {
        let temp: Date = new Date(expiryDate_picker.get('select').pick);
        let activateDate: Date = new Date(a.biddingEvent.activationDate * 1000);
        if (temp.getTime() > activateDate.getTime()) {
          let activationDate: Date = new Date(a.biddingEvent.activationDate * 1000);
          if (temp.getTime() > activationDate.getTime()) {
            a.biddingEvent.expiryDate = temp.getTime() / 1000;
            a.biddingEvent.expiryDate = a.biddingEvent.expiryDate + (12 * 60 * 60);

          } else {
            Materialize.toast('Activation date should not be greater than Expiry date.', 4000);
            expiryDate_picker.set('select', new Date(a.biddingEvent.expiryDate * 1000));
          }
        } else {
          Materialize.toast('Expiry date should be greater than Activation Date.', 4000);
          expiryDate_picker.set('select', new Date(a.biddingEvent.expiryDate * 1000));
        }
      }
    });


  }

  getRecruiterList(){
    this.bidEventService.getRecruiterList().subscribe(res=>{
      this.allRecruiterList=res;
      this.extractData(res);
    },err=>{
      console.log(err);
    });
  }

  extractData(res){
    let previouslyInvitedRecruiters=this.userService.getUserData().previouslyInvitedRecruiters;
    res.map(data=>{
        if(previouslyInvitedRecruiters.includes(data._id)){
          this.finalRecruiterList.push(data);
          this.finalRecruitersAre.push(data._id);
        }else{
          this.recruiterList.push(data);
        }
        this.publicRecruitersAre.push(data._id);
    });
    this.handlePaginator();
  }

  handlePaginator(){
    this.noBiddingEventsForTop = this.recruiterList.length === 0 ? true : false;
    this.noBiddingEventsForFinal = this.finalRecruiterList.length === 0 ? true : false;
  }

  handleTopSelected($event){
    if($event.target.checked){
      this.recruiterList.map(item=>{
        if(item._id === $event.target.name){
          this.finalRecruiterList.unshift(item);
          let index=this.recruiterList.indexOf(item);
          this.recruiterList.splice(index,1);
          this.finalRecruitersAre.push(item._id);
          this.handlePaginator();
        }
      });
    }
  }

  handleFinalSelected($event){
    if(!$event.target.checked){
      this.finalRecruiterList.map(item=>{
        if(item._id === $event.target.name){
          this.recruiterList.unshift(item);
          let index=this.finalRecruiterList.indexOf(item);
          this.finalRecruiterList.splice(index,1);
          this.finalRecruitersAre.splice(item,1);
          this.handlePaginator();
        }
      });
    }
  }

  handleGenderChange($event){
    this.globalType=$event.target.value;
    if($event.target.value === "private"){
      this.finalRecruiterList=[];
      this.finalRecruitersAre=[];
      this.publicRecruitersAre=[];
      this.extractData(this.allRecruiterList);
    }else{
      this.recruiterList=[];
      this.finalRecruiterList=this.allRecruiterList;
      this.finalRecruitersAre=[...this.publicRecruitersAre];
      this.handlePaginator();
    }
  }

  get searchTopTerm(){
    return this._searchTopTerm;
  }

  set searchTopTerm(value){
    this._searchTopTerm=value;
    this.itemsPerPageAreForTop = this._searchTopTerm === "" ? 5 : 100;
  }

  get searchFinalTerm(){
    return this._searchFinalTerm;
  }

  set searchFinalTerm(value){
    this._searchFinalTerm=value;
    this.itemsPerPageAreForFinal = this._searchFinalTerm === "" ? 5 : 100;
  }

  get f() { return this.auctionFrm.controls; }

  getJobProfile() {
    this.bidEventService.getJobProfiles().subscribe((data: JobProfile[]) => {
      this.jp = data;
    }, (error) => {
      console.log(error);
    });
  }

  jobProfileVal(val, id) {
    this.jobProfileName = val;
    this.selectedJobProfile = id;
    this.biddingEvent.setJobProfile(id);
  }

  submit() {
    if (this.selectedJobProfile) {
      this.spinner.show();
      if (!this.auctionFrm.invalid) {
        this.biddingEvent.setEmployer(this.userService.getIUserData());
        this.biddingEvent.updateStatus();
        this.biddingEvent.setFinalRecruiters(this.finalRecruitersAre);
        this.bidEventService.createBiddingEvent(this.biddingEvent).subscribe((data: any) => {
          if (data.result == "inserted") {
            Materialize.toast('New Auction Created !', 4000);
            this.spinner.hide();
            this.router.navigate(['employer/bidding-event-list']);
          } else {
            this.spinner.hide();
            Materialize.toast('Something Went Wrong!', 4000);
          }
        },
          (error) => {
            console.log(error);
            this.spinner.hide();
            Materialize.toast('Something Went Wrong!', 4000);
          });
      }
    } else {
      this.spinner.hide();
      Materialize.toast('Please select Job Profile', 4000);
    }
  }

  goBack() {
    this.router.navigate(['/employer/bidding-event-list']);
  }

 // Validation of reward Money 
  checkRewardMoney(group: FormGroup) {
  let fromReward = group.controls.rewardMoneyFrom.value;
  let toReward = group.controls.rewardMoneyTo.value;
  return Number(fromReward) <= Number(toReward) ? null : { invalidReward: true }     
}

  
}
