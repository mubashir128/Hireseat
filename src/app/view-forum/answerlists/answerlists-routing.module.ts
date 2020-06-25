import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnswerlistsComponent } from './answerlists.component';

const routes: Routes = [
  {
    path: '',
    component: AnswerlistsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnswerlistsRoutingModule { }
