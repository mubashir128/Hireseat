import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeerAnsComponent } from './employeer-ans/employeer-ans.component';
import { RecruiterQuestionComponent } from './recruiter-question/recruiter-question.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgHighlightModule } from "ngx-text-highlight";
import { SharedComponentsModule } from '../shared/shared-components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgHighlightModule,
    SharedComponentsModule
  ],
  declarations: [
    EmployeerAnsComponent,
    RecruiterQuestionComponent
  ],
  exports: [
    EmployeerAnsComponent,
    RecruiterQuestionComponent
  ]
})
export class RecruiterBrodcastModule { }
