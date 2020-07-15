import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllBlogCategoriesComponent } from './all-blog-categories.component';

const routes: Routes = [
  {
    path: '',
    component: AllBlogCategoriesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllBlogCategoriesRoutingModule { }
