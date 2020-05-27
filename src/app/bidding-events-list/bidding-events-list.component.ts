
import { Component, OnInit,Input } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../_services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BiddingEvent,IBiddingEvent } from '../models/bidding-event';
import { RemainingTime } from '../models/remaining-time';
import { BiddingEventService } from '../_services/bidding-event.service';
import {ChangeDetectorRef} from '@angular/core';
import { BidService } from '../_services/bid.service';
declare var Materialize;
declare var jQuery:any;
@Component({
  selector: 'app-bidding-events-list',
  templateUrl: './bidding-events-list.component.html',
  styleUrls: ['./bidding-events-list.component.css']
})
export class BiddingEventsListComponent implements OnInit {
  public chkLoggedInUser:any;
  public hideAddBtn:boolean;
  public biddingEvents: BiddingEvent[];
  public biddingEventsArr:any=[];
  public biddingStatus: number = 0; // 0:scheduled , -1:expired , 1:active
  public remainingTime: RemainingTime =  new RemainingTime();
  selectedBiddingEvent: IBiddingEvent;
  public noBiddingEvents:boolean=true;
  constructor(private router: Router,private cdr:ChangeDetectorRef,private spinner:NgxSpinnerService,private userService:UserService,private biddingService:BidService, private route: ActivatedRoute,private bidEventService:BiddingEventService) { 
    this.chkLoggedInUser=this.userService.getUserData();
    if(this.chkLoggedInUser != "no"){
       if(this.chkLoggedInUser.userRole=="employer"){
        this.getJobProfileBidding(); 

         this.hideAddBtn=false;
       }else if(this.chkLoggedInUser.userRole=="recruiter"){
        this.route.params.subscribe(params => { this.handleRequest(params['type']); });        
        this.hideAddBtn=true;     
       }
    }else{
      //Do something
    }
  }

  ngOnInit() {
  }

  handleRequest(requestType: string) {
    if(requestType == 'my'){     
      this.getMyBids();
    }else{
      this.getAllBidEvents();
    }
  }
  onDelete(event){
    this.bidEventService.deletejobPost(event,this.chkLoggedInUser._id).subscribe((data)=>{
      console.log(data);
      
      if(data){
        Materialize.toast('JobPost Deleted Successfully !', 1000); 
        jQuery('#DeleteConfirm'+event).modal('close'); 
        this.getJobProfileBidding();
      }
    },(error)=>{
    
      Materialize.toast(error, 1000);
      jQuery('#DeleteConfirm'+event).modal('close');  
    })
  }

  getJobProfileBidding(){
    this.spinner.show();
    this.bidEventService.getBiddingEvents().subscribe((data:BiddingEvent[])=>{   
      if(data.length > 0){
        this.biddingEvents=data;
        this.noBiddingEvents=false;
        this.spinner.hide();
      }else{
        this.noBiddingEvents=true;
        this.spinner.hide();
      }                            
                       
    },(error)=>{
      this.spinner.hide();
    console.log(error);
    });
  }

  getMyBids(){
    this.spinner.show();
    this.bidEventService.getMyBids(this.chkLoggedInUser._id).subscribe((data:BiddingEvent[])=>{   
       if(data.length > 0){
        
        this.biddingEvents=data;
        this.noBiddingEvents=false;
        this.spinner.hide();
       }else{
        this.noBiddingEvents=true;
        this.spinner.hide();
       }       
     },(error)=>{
       console.log(error);
       this.spinner.hide();
     })
  }

  getAllBidEvents(){
    this.spinner.show();
    this.biddingService.getRecruiterBidsCount(this.chkLoggedInUser._id).subscribe((data:BiddingEvent[])=>{   
                if(data.length > 0){
                  this.noBiddingEvents=false;
                  this.biddingEvents=data;  
                  this.spinner.hide();
                }else{
                  this.noBiddingEvents=true;
                  this.spinner.hide();
                }              
    },(error)=>{
    console.log(error);
    this.spinner.hide();
    });
  }
  

   onSelect(biddingEvent_Id) {
     this.router.navigate(['/bidding-events/details/' + biddingEvent_Id]);
  }

}
