import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnswerlistsRoutingModule } from './answerlists-routing.module';
import { SharedComponentsModule } from 'src/app/shared/shared-components/shared-components.module';
import { AnswerlistsComponent } from './answerlists.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AnswerlistsRoutingModule,
    SharedComponentsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AnswerlistsComponent
  ]
})
export class AnswerlistsModule { }
