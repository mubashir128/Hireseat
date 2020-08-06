import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecruiterCoachingRoutingModule } from './recruiter-coaching-routing.module';
import { RecruiterCoachingComponent } from './recruiter-coaching.component';
import { SharedComponentsModule } from '../shared/shared-components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    RecruiterCoachingRoutingModule,
    SharedComponentsModule
  ],
  declarations: [RecruiterCoachingComponent]
})
export class RecruiterCoachingModule { }
