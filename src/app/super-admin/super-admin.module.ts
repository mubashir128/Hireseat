import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { SADashboardComponent } from './sa-dashboard/sa-dashboard.component';
import { SANavbarComponent } from './sa-navbar/sa-navbar.component';

@NgModule({
  imports: [
    CommonModule,
    SuperAdminRoutingModule
  ],
  declarations: [
    SADashboardComponent,
    SANavbarComponent,
  ]
})
export class SuperAdminModule { }
