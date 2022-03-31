import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MobileRegisterRoutingModule } from './mobile-register-routing.module';
import { MobileRegisterComponent } from './mobile-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    MobileRegisterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
  ],
  declarations: [
    MobileRegisterComponent
  ]
})
export class MobileRegisterModule { }
