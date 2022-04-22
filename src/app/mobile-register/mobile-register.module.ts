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
import { MatSelectModule} from '@angular/material/select';

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
    MatSelectModule
  ],
  declarations: [
    MobileRegisterComponent
  ]
})
export class MobileRegisterModule { }
