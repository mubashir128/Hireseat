import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecruiterFeedbackRoutingModule } from './recruiter-feedback-routing.module';
import { RecruiterFeedbackComponent } from './recruiter-feedback.component';
import { SharedComponentsModule } from 'src/app/shared/shared-components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    RecruiterFeedbackRoutingModule,
    SharedComponentsModule
  ],
  declarations: [
    RecruiterFeedbackComponent
  ]
})
export class RecruiterFeedbackModule { }
