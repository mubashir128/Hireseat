import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogMainComponent } from './blog-main/blog-main.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';
import { CreateImagePostComponent } from './create-image-post/create-image-post.component';
import { AllPostComponent } from './all-post/all-post.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { EditCategoryComponent } from './edit-blog/edit-category/edit-category.component';

const routes: Routes = [
  {
    path: "",
    component: BlogMainComponent,
    children: [
      {
        path: "create-post",
        component: CreatePostComponent
      },
      {
        path: "edit-post/:blogID",
        component: EditBlogComponent
      },
      {
        path: "create-image-post",
        component: CreateImagePostComponent
      },
      {
        path: "all-post",
        component: AllPostComponent
      },
      {
        path: "create-categories",
        component: CreateCategoryComponent
      },
      {
        path: "edit-categories",
        component: EditCategoryComponent
      }
    ],
    // canActivate: [AdminGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
