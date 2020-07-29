import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobProfileListRoutingModule } from './job-profile-list-routing.module';
import { SharedComponentsModule } from '../../shared/shared-components/shared-components.module';
import { JobProfileListComponent } from './job-profile-list.component';

@NgModule({
  imports: [
    CommonModule,
    JobProfileListRoutingModule,
    SharedComponentsModule
  ],
  declarations: [
    JobProfileListComponent
  ]
})
export class JobProfileListModule { }
