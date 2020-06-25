import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateEnterpriseComponent } from './create-enterprise.component';

const routes: Routes = [
  {
    path: '',
    component: CreateEnterpriseComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateEnterpriseRoutingModule { }
