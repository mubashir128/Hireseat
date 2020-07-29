import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResumeListRoutingModule } from './resume-list-routing.module';
import { SharedComponentsModule } from '../../shared/shared-components/shared-components.module';
import { ResumeListComponent } from './resume-list.component';

@NgModule({
  imports: [
    CommonModule,
    ResumeListRoutingModule,
    SharedComponentsModule
  ],
  declarations: [
    ResumeListComponent
  ]
})
export class ResumeListModule { }
