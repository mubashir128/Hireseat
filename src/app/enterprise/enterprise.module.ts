import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnterpriseRoutingModule } from './enterprise-routing.module';
import { EnterpriseDashboardComponent } from './enterprise-dashboard/enterprise-dashboard.component';
import { SharedComponentsModule } from '../shared/shared-components/shared-components.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EnterpriseNavbarComponent } from './enterprise-navbar/enterprise-navbar.component';
// import { NgxPaginationModule } from "ngx-pagination";
import { EnterpriseUserListComponent } from './enterprise-user-list/enterprise-user-list.component';
import { CreateEmployerComponent } from './create-employer/create-employer.component';

@NgModule({
  imports: [
    CommonModule,
    EnterpriseRoutingModule,
    SharedComponentsModule,
    ReactiveFormsModule,
    FormsModule,
    // NgxPaginationModule
  ],
  declarations: [
    EnterpriseDashboardComponent,
    // EnterpriseUserListComponent,
    // CreateEmployerComponent,
    EnterpriseNavbarComponent
  ]
})
export class EnterpriseModule { }
