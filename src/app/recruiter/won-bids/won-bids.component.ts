
import { Component, OnInit,Input } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { BidService } from '../../_services/bid.service';
import {  BiddingEventService } from '../../_services/bidding-event.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-won-bids',
  templateUrl: './won-bids.component.html',
  styleUrls: ['./won-bids.component.css']
})
export class WonBidsComponent implements OnInit {
public loggedUser;
public reward:any[]=[]
dataArr:any[]=[];
p:any;
public noWonBids:boolean=true;
  constructor(private userService:UserService , private bidService:BidService,private bidEventService:BiddingEventService,private spinner:NgxSpinnerService,private sanitizer: DomSanitizer,) { 
    this.loggedUser=this.userService.getUserData();
    if(this.loggedUser != "no" && this.loggedUser.userRole == "recruiter"){
         this.spinner.show();         
        this.bidService.getSelectedBids(this.loggedUser._id).subscribe((data:any)=>{                    
          if(data.length > 0){
            this.dataArr=data;
            // console.log(this.dataArr);
            this.noWonBids=false;
            this.spinner.hide();      
          }else{
            this.spinner.hide();
            this.noWonBids=true;
          }                
        },(error)=>{
          this.spinner.hide();
        })
        
      }else{      
        this.spinner.hide();
      }
  }

  ngOnInit() {   
     }
   
  
  numberWithCommas(x) {  
    if(x){
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }  
 
}
transform(url) {
  return this.sanitizer.bypassSecurityTrustResourceUrl(url);

}

}
