import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobpostComponent } from './jobpost/jobpost.component';

const routes: Routes = [
  {
    path: '',
    component: JobpostComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobPostRoutingModule { }
