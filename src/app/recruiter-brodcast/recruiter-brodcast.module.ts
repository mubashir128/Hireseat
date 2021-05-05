import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeerAnsComponent } from './employeer-ans/employeer-ans.component';
import { RecruiterQuestionComponent } from './recruiter-question/recruiter-question.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from '../shared/shared-components/shared-components.module';
import { TextHighLightPipe } from './text-highlight.pipe';
import { CandidateQuestionComponent } from './candidate-question/candidate-question.component';
import { RecruiterAnsComponent } from './recruiter-ans/recruiter-ans.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule
  ],
  declarations: [
    EmployeerAnsComponent,
    RecruiterQuestionComponent,
    TextHighLightPipe,
    CandidateQuestionComponent,
    RecruiterAnsComponent
  ],
  exports: [
    EmployeerAnsComponent,
    RecruiterQuestionComponent,
    CandidateQuestionComponent,
    RecruiterAnsComponent
  ]
})
export class RecruiterBrodcastModule { }
