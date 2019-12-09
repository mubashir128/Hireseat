import { Component, Input, OnChanges } from '@angular/core';
import { IBid } from '../../models/bid';
@Component({
  selector: 'app-my-bids',
  templateUrl: './my-bids.component.html',
  styleUrls: ['./my-bids.component.css']
})
export class MyBidsComponent implements OnChanges {
  @Input() myBids: IBid[];
  @Input() biddingStatus: number; // 0 scheduled, -1 expired, 1 active
  myBidsCount: number = 0;
  constructor() { }

  ngOnChanges() {   
    if (this.myBids)
            this.myBidsCount = this.myBids.length;
  }

}
