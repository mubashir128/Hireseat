import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BiddingEventDetailsComponent } from './bidding-event-details.component';

const routes: Routes = [
  {
    path: '',
    component: BiddingEventDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BiddingEventDetailsRoutingModule { }
