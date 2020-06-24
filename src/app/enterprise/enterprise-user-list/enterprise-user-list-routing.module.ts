import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnterpriseUserListComponent } from './enterprise-user-list.component';

const routes: Routes = [
  {
    path: '',
    component: EnterpriseUserListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnterpriseUserListRoutingModule { }
