import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SAUserListComponent } from './sa-user-list.component';

const routes: Routes = [
  {
    path: '',
    component: SAUserListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SAUserListRoutingModule { }
