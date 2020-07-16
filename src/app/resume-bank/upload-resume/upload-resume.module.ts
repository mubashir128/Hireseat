import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadResumeRoutingModule } from './upload-resume-routing.module';
import { UploadResumeComponent } from './upload-resume.component';
import { SharedComponentsModule } from 'src/app/shared/shared-components/shared-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagInputModule } from "ngx-chips";

@NgModule({
  imports: [
    CommonModule,
    UploadResumeRoutingModule,
    SharedComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    TagInputModule
  ],
  declarations: [
    UploadResumeComponent
  ]
})
export class UploadResumeModule { }
