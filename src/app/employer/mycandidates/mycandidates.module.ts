import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MycandidatesRoutingModule } from './mycandidates-routing.module';
import { MycandidatesComponent } from './mycandidates.component';
import { SharedComponentsModule } from '../../shared/shared-components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    MycandidatesRoutingModule,
    SharedComponentsModule
  ],
  declarations: [
    MycandidatesComponent
  ]
})
export class MycandidatesModule { }
