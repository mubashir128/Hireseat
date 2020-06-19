
import { Component, OnInit,Input, ElementRef, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../_services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BiddingEvent,IBiddingEvent } from '../models/bidding-event';
import { RemainingTime } from '../models/remaining-time';
import { BiddingEventService } from '../_services/bidding-event.service';
import {ChangeDetectorRef} from '@angular/core';
import { BidService } from '../_services/bid.service';
import { map, filter, debounceTime, distinctUntilChanged, tap } from "rxjs/operators";
import { fromEvent } from 'rxjs';
declare var Materialize;
declare var jQuery:any;
@Component({
  selector: 'app-bidding-events-list',
  templateUrl: './bidding-events-list.component.html',
  styleUrls: ['./bidding-events-list.component.css']
})
export class BiddingEventsListComponent implements OnInit {
  p=1;
  createdAt;
  searchTerm;
  search = false;
  itemsList = [1];
  itemsPerPage = 5;
  public chkLoggedInUser:any;
  public hideAddBtn:boolean;
  public biddingEvents: BiddingEvent[]=[];
  public biddingEventsArr:any=[];
  public biddingStatus: number = 0; // 0:scheduled , -1:expired , 1:active
  public remainingTime: RemainingTime =  new RemainingTime();
  selectedBiddingEvent: IBiddingEvent;
  public noBiddingEvents:boolean=true;
  @ViewChild('searchByName') searchByName: ElementRef;

  constructor(private router: Router,private cdr:ChangeDetectorRef,private spinner:NgxSpinnerService,private userService:UserService,private biddingService:BidService, private route: ActivatedRoute,private bidEventService:BiddingEventService) { 
    this.chkLoggedInUser=this.userService.getUserData();
    if(this.chkLoggedInUser != "no"){
       if(this.chkLoggedInUser.userRole=="employer"){
          let obj={
              onLoad : true,
              itemsPerPage : this.itemsPerPage
          }
          this.getJobProfileBidding(obj); 
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

  ngAfterViewInit() {
    // server-side search
    this.searchTermByName();
  }

  searchTermByName(){
    fromEvent(this.searchByName.nativeElement,'keyup')
    .pipe(
      map(event=>event),
      filter(Boolean),
      debounceTime(1000),
      distinctUntilChanged(),
      tap((text) => {
        this.search = this.searchTerm === "" ? false : true;
        this.getJobProfileBidding({
          search : this.search,
          searchTerm : this.searchTerm,
          itemsPerPage : this.searchTerm === "" ? this.itemsPerPage : undefined,
          onLoad : this.searchTerm === "" ? true : undefined
        });
        this.p=1;
        this.itemsList=[1];
        this.createdAt=null;
        this.biddingEvents=[];
      })
    )
    .subscribe();
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
        this.getJobProfileBidding({});
      }
    },(error)=>{
    
      Materialize.toast(error, 1000);
      jQuery('#DeleteConfirm'+event).modal('close');  
    })
  }

  getJobProfileBidding(obj){
    this.spinner.show();
    this.bidEventService.getBiddingEvents(obj).subscribe((data:BiddingEvent[])=>{   
      console.log("---- : ",data);
      if(data.length > 0){
        this.biddingEvents=[...this.biddingEvents, ...data];
        this.createdAt = data[data.length - 1].createdAt;
        this.noBiddingEvents=false;
      }    
      this.spinner.hide();
                       
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

  handlePagination($event){
    this.p = $event;
    if (this.itemsList.indexOf($event) !== -1 || this.search) {
      return ;
    }
    this.itemsList.push($event);
    let obj={
      createdAt : this.createdAt,
      itemsPerPage : this.itemsPerPage
    }
    this.getJobProfileBidding(obj); 
  }

}
