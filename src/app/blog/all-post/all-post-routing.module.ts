import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllBlogsComponent } from '../frontend/all-blogs/all-blogs.component';

const routes: Routes = [
  {
    path: '',
    component: AllBlogsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllPostRoutingModule { }
