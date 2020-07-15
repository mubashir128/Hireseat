import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecruiterFeedbackComponent } from './recruiter-feedback.component';

const routes: Routes = [
  {
    path: '',
    component: RecruiterFeedbackComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecruiterFeedbackRoutingModule { }
