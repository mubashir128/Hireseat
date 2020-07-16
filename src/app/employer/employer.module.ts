import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployerRoutingModule } from './employer-routing.module';
import { SharedComponentsModule } from '../shared/shared-components/shared-components.module';
import { JobProfileListComponent } from './job-profile-list/job-profile-list.component';
import { CreateJobProfileComponent } from './create-job-profile/create-job-profile.component';
import { CreateBiddingEventComponent } from './create-bidding-event/create-bidding-event.component';
import { EditJobProfileComponent } from './edit-job-profile/edit-job-profile.component';
import { FeedbackListComponent } from './feedback-list/feedback-list.component';
import { EmployeerAnsComponent } from '../recruiter-brodcast/employeer-ans/employeer-ans.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MycandidatesComponent } from './mycandidates/mycandidates.component';
import { EmployerHomeComponent } from './employer-home/employer-home.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CKEditorModule } from "ng2-ckeditor";
import { RecruiterBrodcastModule } from '../recruiter-brodcast/recruiter-brodcast.module';

@NgModule({
  imports: [
    CommonModule,
    EmployerRoutingModule,
    SharedComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    CKEditorModule,
    RecruiterBrodcastModule
  ],
  declarations: [
    EmployerHomeComponent,
    JobProfileListComponent,
    CreateJobProfileComponent,
    CreateBiddingEventComponent,
    EditJobProfileComponent,
    FeedbackListComponent,
    // EmployeerAnsComponent,
    DashboardComponent,
    MycandidatesComponent
  ]
})
export class EmployerModule { }
