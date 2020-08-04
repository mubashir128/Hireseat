import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecruiterCoachingComponent } from './recruiter-coaching.component';

const routes: Routes = [
  {
    path: '',
    component: RecruiterCoachingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecruiterCoachingRoutingModule { }
