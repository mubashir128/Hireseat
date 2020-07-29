import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MycandidatesComponent } from './mycandidates.component';

const routes: Routes = [{
  path: "",
  component: MycandidatesComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MycandidatesRoutingModule { }
