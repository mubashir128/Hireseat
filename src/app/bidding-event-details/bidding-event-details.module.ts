import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BiddingEventDetailsRoutingModule } from './bidding-event-details-routing.module';
import { BiddingEventDetailsComponent } from './bidding-event-details.component';
import { SharedComponentsModule } from '../shared/shared-components/shared-components.module';
import { JobProfileInfoComponent } from '../job-profile-info/job-profile-info.component';
import { RecruiterBrodcastModule } from '../recruiter-brodcast/recruiter-brodcast.module';
import { BiddingInfoComponent } from '../bidding-info/bidding-info.component';
import { RecruterBiddingInfoComponent } from '../recruter-bidding-info/recruter-bidding-info.component';
import { BiddingInterviewInfoComponent } from '../bidding-interview-info/bidding-interview-info.component';
import { RecruiterBiddingInterviewInfoComponent } from '../recruiter-bidding-interview-info/recruiter-bidding-interview-info.component';
import { BiddingHiredInfoComponent } from '../bidding-hired-info/bidding-hired-info.component';
import { RecruiterBiddingHiredInfoComponent } from '../recruiter-bidding-hired-info/recruiter-bidding-hired-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from "ngx-pagination";

@NgModule({
  imports: [
    CommonModule,
    BiddingEventDetailsRoutingModule,
    SharedComponentsModule,
    RecruiterBrodcastModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  declarations: [
    BiddingEventDetailsComponent,
    JobProfileInfoComponent,
    BiddingInfoComponent,
    RecruterBiddingInfoComponent,
    BiddingInterviewInfoComponent,
    RecruiterBiddingInterviewInfoComponent,
    BiddingHiredInfoComponent,
    RecruiterBiddingHiredInfoComponent
  ]
})
export class BiddingEventDetailsModule { }
