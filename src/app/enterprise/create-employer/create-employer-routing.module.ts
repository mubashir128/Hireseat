import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateEmployerComponent } from './create-employer.component';

const routes: Routes = [
  {
    path: '',
    component: CreateEmployerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateEmployerRoutingModule { }
