import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobProfileListComponent } from './job-profile-list.component';

const routes: Routes = [{
  path: "",
  component: JobProfileListComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobProfileListRoutingModule { }
