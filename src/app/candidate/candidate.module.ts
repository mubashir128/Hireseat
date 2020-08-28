import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandidateRoutingModule } from './candidate-routing.module';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { AllRecruitersComponent } from '../shared/shared-components/components/all-recruiters/all-recruiters.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedComponentsModule } from '../shared/shared-components/shared-components.module';
import { CandidateHomeComponent } from './candidate-home/candidate-home.component';
import { CandidateNavbarComponent } from './candidate-navbar/candidate-navbar.component';


@NgModule({
  declarations: [
    MyProfileComponent,
    // AllRecruitersComponent,
    CandidateHomeComponent,
    CandidateNavbarComponent
  ],
  imports: [
    CommonModule,
    CandidateRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedComponentsModule
  ]
})
export class CandidateModule { }
