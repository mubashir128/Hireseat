import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchResumeRoutingModule } from './search-resume-routing.module';
import { SearchResumeComponent } from './search-resume.component';
import { SharedComponentsModule } from '../../shared/shared-components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    SearchResumeRoutingModule,
    SharedComponentsModule
  ],
  declarations: [
    SearchResumeComponent
  ]
})
export class SearchResumeModule { }
