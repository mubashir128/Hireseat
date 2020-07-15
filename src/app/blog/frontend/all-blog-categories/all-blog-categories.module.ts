import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllBlogCategoriesRoutingModule } from './all-blog-categories-routing.module';
import { AllBlogCategoriesComponent } from './all-blog-categories.component';
import { SharedComponentsModule } from 'src/app/shared/shared-components/shared-components.module';
import { NgxTwitterTimelineModule } from 'ngx-twitter-timeline';

@NgModule({
  imports: [
    CommonModule,
    AllBlogCategoriesRoutingModule,
    SharedComponentsModule,
    NgxTwitterTimelineModule
  ],
  declarations: [
    AllBlogCategoriesComponent
  ]
})
export class AllBlogCategoriesModule { }
