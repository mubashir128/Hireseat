import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecruiterRoutingModule } from './recruiter-routing.module';
import { RecruiterNavbarComponent } from './recruiter-navbar/recruiter-navbar.component';
import { ResumeListComponent } from './resume-list/resume-list.component';
import { WonBidsComponent } from './won-bids/won-bids.component';
import { SearchResumeComponent } from '../resume-bank/search-resume/search-resume.component';
import { RecruiterGuard } from '../_guards/recruiter.guard';
import { RecruiterQuestionComponent } from '../recruiter-brodcast/recruiter-question/recruiter-question.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from '../shared/shared-components/shared-components.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { RecruiterHomeComponent } from './recruiter-home/recruiter-home.component';
import { TagInputModule } from "ngx-chips";
import { NgHighlightModule } from 'ngx-text-highlight';

@NgModule({
  imports: [
    CommonModule,
    RecruiterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    NgxPaginationModule,
    TagInputModule,
    NgHighlightModule
  ],
  declarations: [
    // RecruiterNavbarComponent,
    ResumeListComponent,
    RecruiterHomeComponent,
    WonBidsComponent,
    SearchResumeComponent,
    RecruiterQuestionComponent
  ]
})
export class RecruiterModule { }
