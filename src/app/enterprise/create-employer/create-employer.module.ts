import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateEmployerRoutingModule } from './create-employer-routing.module';
import { CreateEmployerComponent } from './create-employer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    CreateEmployerRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    CreateEmployerComponent
  ]
})
export class CreateEmployerModule { }
