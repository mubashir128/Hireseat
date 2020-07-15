import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactUsRoutingModule } from './contact-us-routing.module';
import { ContactUsComponent } from './contact-us.component';
import { SharedComponentsModule } from '../shared/shared-components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    ContactUsRoutingModule,
    SharedComponentsModule
  ],
  declarations: [
    ContactUsComponent
  ]
})
export class ContactUsModule { }
