import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewForumComponent } from './view-forum.component';

const routes: Routes = [
  {
    path: '',
    component: ViewForumComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewForumRoutingModule { }
