import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotPasswordResetRoutingModule } from './forgot-password-reset-routing.module';
import { ForgotPasswordResetComponent } from './forgot-password-reset.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ForgotPasswordResetRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    ForgotPasswordResetComponent
  ]
})
export class ForgotPasswordResetModule { }
