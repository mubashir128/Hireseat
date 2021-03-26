import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandidateRoutingModule } from './candidate-routing.module';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { AllRecruitersComponent } from '../shared/shared-components/components/all-recruiters/all-recruiters.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedComponentsModule } from '../shared/shared-components/shared-components.module';
import { CandidateHomeComponent } from './candidate-home/candidate-home.component';
import { MyReviewedProfilesComponent } from './my-reviewed-profiles/my-reviewed-profiles.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProfileItemsComponent } from './profile-items/profile-items.component';

@NgModule({
  declarations: [
    MyProfileComponent,
    // AllRecruitersComponent,
    CandidateHomeComponent,
    MyReviewedProfilesComponent,
    ViewProfileComponent,
    ProfileItemsComponent
  ],
  imports: [
    CommonModule,
    CandidateRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedComponentsModule,
    NgxPaginationModule
  ]
})
export class CandidateModule { }
