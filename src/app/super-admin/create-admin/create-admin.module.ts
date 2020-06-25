import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateAdminRoutingModule } from './create-admin-routing.module';
import { CreateAdminComponent } from './create-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    CreateAdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    CreateAdminComponent
  ]
})
export class CreateAdminModule { }
