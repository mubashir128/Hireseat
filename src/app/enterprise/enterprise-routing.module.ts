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
        component: EnterpriseUserListComponent
      },
      {
        path: "create-employer",
        component: CreateEmployerComponent
      }
    ],
    canActivate: [EnterpriseGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnterpriseRoutingModule { }
