
import { Component, OnInit,Input, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { BidService } from '../../_services/bid.service';
import {  BiddingEventService } from '../../_services/bidding-event.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer } from '@angular/platform-browser';
import { map, filter, debounceTime, distinctUntilChanged, tap } from "rxjs/operators";
import { fromEvent } from 'rxjs';
@Component({
  selector: 'app-won-bids',
  templateUrl: './won-bids.component.html',
  styleUrls: ['./won-bids.component.css']
})
export class WonBidsComponent implements OnInit {
  public loggedUser;
  public reward:any[]=[]
  dataArr:any[]=[];
  p=1;
  createdAt;
  itemsList=[1];
  searchTerm;
  search=false;
  itemsPerPage=10;
  @ViewChild('searchByName') searchByName: ElementRef;
  public noWonBids:boolean=true;

  constructor(private userService:UserService , private bidService:BidService,private bidEventService:BiddingEventService,private spinner:NgxSpinnerService,private sanitizer: DomSanitizer,) { 
    this.loggedUser=this.userService.getUserData();
  }

  ngOnInit() {
    if(this.loggedUser != "no" && this.loggedUser.userRole == "recruiter"){
      let obj={
        onLoad : true,
        itemsPerPage : this.itemsPerPage
      };
      this.getSelectedBids(obj);
    }
  }
  
  ngAfterViewInit() {
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
        this.getSelectedBids({
          searchTerm : this.searchTerm,
          onLoad : this.searchTerm === "" ? true : undefined,
          itemsPerPage : this.searchTerm === "" ? this.itemsPerPage : undefined
        });
        this.resetValues();
      })
    )
    .subscribe();
  }

  resetValues(){
    this.p=1;
    this.dataArr=[];
    this.itemsList=[1];
    this.createdAt=null;
  }

  getSelectedBids(obj){
    this.spinner.show();
    this.bidService.getSelectedBids(obj).subscribe((data:any)=>{
      if(data.length > 0){
        this.dataArr=[...this.dataArr, ...data];
        this.createdAt=this.dataArr[this.dataArr.length-1].createdAt;
        this.noWonBids=false;
      }
      this.spinner.hide();
    },(error)=>{
      this.spinner.hide();
    });
  }
  
  numberWithCommas(x){
    if(x){
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }

  transform(url){
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  handlePagination($event){
    this.p = $event;
    if (this.itemsList.indexOf($event) !== -1 && !this.search) {
      return ;
    }

    this.itemsList.push($event);

    let obj={
      createdAt : this.createdAt,
      itemsPerPage : this.itemsPerPage
    }
    this.getSelectedBids(obj);
  }

  handleToggleSign(obj){
    if(obj.searchTab){
      jQuery(".searchForm").css("display","block");
    }else{
      jQuery(".searchForm").css("display","none");
    }
  }

}
