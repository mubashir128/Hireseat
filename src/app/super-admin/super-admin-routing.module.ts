import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenusComponent } from '../shared/shared-components/components/menus/menus.component';
import { NotificationsComponent } from '../shared/shared-components/components/notifications/notifications.component';
import { PostJobComponent } from '../shared/shared-components/components/post-job/post-job.component';
import { SADashboardComponent } from './sa-dashboard/sa-dashboard.component';

const routes: Routes = [
  {
    path: "",
    component: SADashboardComponent,
    children: [
      {
        path: "user-list",
        loadChildren: () => import('./sa-user-list/sa-user-list.module').then(m => m.SAUserListModule)
      },
      {
        path: "create-admin",
        loadChildren: () => import('./create-admin/create-admin.module').then(m => m.CreateAdminModule)
      },
      {
        path: "create-enterprise",
        loadChildren: () => import('./create-enterprise/create-enterprise.module').then(m => m.CreateEnterpriseModule)
      },
      {
        path: "notification",
        component: NotificationsComponent,
      },
      {
        path: "menus",
        component: MenusComponent,
      },
      {
        path: "post-job",
        component: PostJobComponent
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
