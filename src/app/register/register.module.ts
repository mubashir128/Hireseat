import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecruiterBrodcastModule } from '../recruiter-brodcast/recruiter-brodcast.module';

@NgModule({
  imports: [
    CommonModule,
    RegisterRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    RegisterComponent
  ]
})
export class RegisterModule { }
