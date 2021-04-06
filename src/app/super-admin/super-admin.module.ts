import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { SADashboardComponent } from './sa-dashboard/sa-dashboard.component';
import { SANavbarComponent } from './sa-navbar/sa-navbar.component';
import { SharedComponentsModule } from '../shared/shared-components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    SuperAdminRoutingModule,
    SharedComponentsModule
  ],
  declarations: [
    SADashboardComponent,
    SANavbarComponent,
  ]
})
export class SuperAdminModule { }
