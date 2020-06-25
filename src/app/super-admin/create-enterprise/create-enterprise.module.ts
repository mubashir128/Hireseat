import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateEnterpriseRoutingModule } from './create-enterprise-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateEnterpriseComponent } from './create-enterprise.component';

@NgModule({
  imports: [
    CommonModule,
    CreateEnterpriseRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    CreateEnterpriseComponent
  ]
})
export class CreateEnterpriseModule { }
