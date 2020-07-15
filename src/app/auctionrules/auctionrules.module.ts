import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuctionrulesRoutingModule } from './auctionrules-routing.module';
import { AuctionrulesComponent } from './auctionrules.component';

@NgModule({
  imports: [
    CommonModule,
    AuctionrulesRoutingModule
  ],
  declarations: [
    AuctionrulesComponent
  ]
})
export class AuctionrulesModule { }
