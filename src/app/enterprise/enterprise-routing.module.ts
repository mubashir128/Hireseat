import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnterpriseDashboardComponent } from './enterprise-dashboard/enterprise-dashboard.component';
import { EnterpriseUserListComponent } from './enterprise-user-list/enterprise-user-list.component';
import { CreateEmployerComponent } from './create-employer/create-employer.component';
import { EnterpriseGuard } from '../_guards/enterprise.guard';

const routes: Routes = [
  {
    path: "",
    component: EnterpriseDashboardComponent,
    children: [
      {
        path: "user-list",
        loadChildren: './enterprise-user-list/enterprise-user-list.module#EnterpriseUserListModule'
      },
      {
        path: "create-employer",
        loadChildren: './create-employer/create-employer.module#CreateEmployerModule'
      }
    ],
    // canActivate: [EnterpriseGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnterpriseRoutingModule { }
