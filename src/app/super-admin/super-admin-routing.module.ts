import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SADashboardComponent } from './sa-dashboard/sa-dashboard.component';

const routes: Routes = [
  {
    path: "",
    component: SADashboardComponent,
    children: [
      {
        path: "user-list",
        loadChildren: './sa-user-list/sa-user-list.module#SAUserListModule'
      },
      {
        path: "create-admin",
        loadChildren: './create-admin/create-admin.module#CreateAdminModule'
      },
      {
        path: "create-enterprise",
        loadChildren: './create-enterprise/create-enterprise.module#CreateEnterpriseModule'
      }
    ],
    // canActivate: [SupperAdminGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
