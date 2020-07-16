import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllBlogTagComponent } from './all-blog-tag.component';

const routes: Routes = [{
  path: '',
  component: AllBlogTagComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllBlogTagRoutingModule { }
