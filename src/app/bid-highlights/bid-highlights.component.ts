import { Component, OnChanges,Input } from '@angular/core';
import { IBiddingEvent, BiddingEvent } from '../models/bidding-event';
import { BidService } from '../_services/bid.service';
import { RemainingTime } from '../models/remaining-time';
import { Utils } from '../models/utils/utils';
import { BiddingEventService } from '../_services/bidding-event.service'
@Component({
  selector: 'app-bid-highlights',
  templateUrl: './bid-highlights.component.html',
  styleUrls: ['./bid-highlights.component.css']
})
export class BidHighlightsComponent implements OnChanges {
  @Input() biddingEvent: IBiddingEvent;
  @Input() totalCandidateBidded: number;
  @Input() SelectedBid: number;
  biddingStatus: number;// 0:scheduled , -1:expired , 1:active
  remainingTime: RemainingTime = new RemainingTime();
  constructor(private bidService:BidService,private biddingEventSercice:BiddingEventService) { }

  ngOnChanges() {  
    if (this.biddingEvent.$key) {
      this.remainingTime = Utils.getRemainingTime(this.biddingEvent);
        if (this.remainingTime.biddingStatusChanged){          
            this.biddingEventSercice.updateBiddingEventStatus(this.biddingEvent).subscribe((data:any)=>{                
            },(error)=>{});
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

  numberWithCommas(x) {
      return x;
}


}
