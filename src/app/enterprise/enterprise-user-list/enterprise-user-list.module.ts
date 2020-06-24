import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnterpriseUserListRoutingModule } from './enterprise-user-list-routing.module';
import { EnterpriseUserListComponent } from './enterprise-user-list.component';
import { NgxPaginationModule } from "ngx-pagination";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    EnterpriseUserListRoutingModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    EnterpriseUserListComponent
  ]
})
export class EnterpriseUserListModule { }
