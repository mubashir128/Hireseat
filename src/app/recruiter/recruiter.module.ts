import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecruiterRoutingModule } from './recruiter-routing.module';
import { ResumeListComponent } from './resume-list/resume-list.component';
import { WonBidsComponent } from './won-bids/won-bids.component';
import { SearchResumeComponent } from '../resume-bank/search-resume/search-resume.component';
import { RecruiterQuestionComponent } from '../recruiter-brodcast/recruiter-question/recruiter-question.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from '../shared/shared-components/shared-components.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { RecruiterHomeComponent } from './recruiter-home/recruiter-home.component';
import { TagInputModule } from "ngx-chips";
import { NgHighlightModule } from 'ngx-text-highlight';
import { RecruiterBrodcastModule } from '../recruiter-brodcast/recruiter-brodcast.module';
import { WaitingListComponent } from './waiting-list/waiting-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RecruiterPieChartComponent } from './charts/recruiter-pie-chart/recruiter-pie-chart.component';
import { RecruiterLineChartComponent } from './charts/recruiter-line-chart/recruiter-line-chart.component';
import { RecruiterBarChartComponent } from './charts/recruiter-bar-chart/recruiter-bar-chart.component';
import { RecruiterDoughnutChartComponent } from './charts/recruiter-doughnut-chart/recruiter-doughnut-chart.component';

@NgModule({
  imports: [
    CommonModule,
    RecruiterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    NgxPaginationModule,
    TagInputModule,
    NgHighlightModule,
    RecruiterBrodcastModule
  ],
  declarations: [
    ResumeListComponent,
    RecruiterHomeComponent,
    WonBidsComponent,
    SearchResumeComponent,
    WaitingListComponent,
    DashboardComponent,
    RecruiterPieChartComponent,
    RecruiterLineChartComponent,
    RecruiterBarChartComponent,
    RecruiterDoughnutChartComponent,
  ]
})
export class RecruiterModule { }
