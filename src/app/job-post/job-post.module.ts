import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobPostRoutingModule } from './job-post-routing.module';
import { JobpostComponent } from './jobpost/jobpost.component';
import { SharedComponentsModule } from '../shared/shared-components/shared-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { TagInputModule } from 'ngx-chips';

@NgModule({
  imports: [
    CommonModule,
    JobPostRoutingModule,
    SharedComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    TagInputModule
  ],
  declarations: [
    JobpostComponent
  ]
})
export class JobPostModule { }
