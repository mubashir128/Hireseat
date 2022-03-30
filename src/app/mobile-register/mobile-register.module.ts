import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MobileRegisterRoutingModule } from './mobile-register-routing.module';
import { MobileRegisterComponent } from './mobile-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MobileRegisterRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    MobileRegisterComponent
  ]
})
export class MobileRegisterModule { }
