import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogMainComponent } from './blog-main/blog-main.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';
import { CreateImagePostComponent } from './create-image-post/create-image-post.component';
import { AllPostComponent } from './all-post/all-post.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { EditCategoryComponent } from './edit-blog/edit-category/edit-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from '../shared/shared-components/shared-components.module';
import { Ng2CompleterModule } from "ng2-completer";
import { EditTagComponent } from './edit-blog/edit-tag/edit-tag.component';
import { TagInputModule } from "ngx-chips";
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  imports: [
    CommonModule,
    BlogRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    Ng2CompleterModule,
    TagInputModule,
    CKEditorModule
  ],
  declarations: [
    BlogMainComponent,
    CreatePostComponent,
    EditBlogComponent,
    CreateImagePostComponent,
    AllPostComponent,
    CreateCategoryComponent,
    EditCategoryComponent,
    EditTagComponent
  ]
})
export class BlogModule { }
