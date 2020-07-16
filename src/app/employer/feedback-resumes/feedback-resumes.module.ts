import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedbackResumesRoutingModule } from './feedback-resumes-routing.module';
import { FeedbackResumesComponent } from './feedback-resumes.component';
import { SharedComponentsModule } from 'src/app/shared/shared-components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FeedbackResumesRoutingModule,
    SharedComponentsModule
  ],
  declarations: [
    FeedbackResumesComponent
  ]
})
export class FeedbackResumesModule { }
