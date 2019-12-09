import { Component,Input, OnInit, EventEmitter, Output, ChangeDetectorRef} from '@angular/core';
import { IBiddingEvent, BiddingEvent } from '../models/bidding-event';
import { RemainingTime } from '../models/remaining-time';
import {Utils} from '../models/utils/utils';
import { BiddingEventService } from '../_services/bidding-event.service';

import {ChangeDetectionStrategy} from '@angular/core';
import { BidService } from '../_services/bid.service';
import { ActivatedRoute } from '@angular/router';
declare var  Materialize: any;
declare var jQuery:any;
@Component({
  selector: 'app-bidding-event-item',
  templateUrl: './bidding-event-item.component.html',
  styleUrls: ['./bidding-event-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BiddingEventItemComponent implements OnInit {
  @Input() biddingEvent: IBiddingEvent;
  @Output() selected = new EventEmitter(false);
  @Output() delete = new EventEmitter(false);
  
  biddingStatus: number = 0; // 0:scheduled , -1:expired , 1:active
  remainingTime: RemainingTime =  new RemainingTime();
  Counts: number;
  bids:any[];
  userInfo: any;
count:any[];
  id: any;
  constructor(private biddingEventSercice:BiddingEventService,private cd:ChangeDetectorRef,private biddingService:BidService,private route:ActivatedRoute) { }

  ngOnInit() {
    this.userInfo = JSON.parse(localStorage.getItem('currentUser')).userInfo;
 
    jQuery('.modal').modal();
   
    if (this.biddingEvent) {
      this.remainingTime = Utils.getRemainingTime(this.biddingEvent);
      if (this.remainingTime.biddingStatusChanged){ 
        this.biddingEventSercice.updateBiddingEventStatus(this.biddingEvent).subscribe((data:any)=>{
         
         
        },(error)=>{
          console.log(error);
         
        });
    }
     if (this.biddingEvent.status === BiddingEvent.STATUS_ACTIVE) {
          this.biddingStatus = 1;
      } else if (this.biddingEvent.status === BiddingEvent.STATUS_EXPIRED) {
          this.biddingStatus = -1;
      } else {          
          this.biddingStatus = 0;
      }
    } 
  }

  select(event) {
    this.selected.emit(event);   
}
showdelete(id){

  jQuery('#DeleteConfirm'+id).modal('open'); 

}
deleteJobPost(event){


 this.delete.emit(event);

}
closed(id){
  jQuery('#DeleteConfirm'+id).modal('close'); 
}
numberWithCommas(x) {
  if(x!=undefined){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
   
}
}
