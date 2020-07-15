import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllBlogTagRoutingModule } from './all-blog-tag-routing.module';
import { AllBlogTagComponent } from './all-blog-tag.component';
import { SharedComponentsModule } from 'src/app/shared/shared-components/shared-components.module';
import { NgxTwitterTimelineModule } from 'ngx-twitter-timeline';

@NgModule({
  imports: [
    CommonModule,
    AllBlogTagRoutingModule,
    SharedComponentsModule,
    NgxTwitterTimelineModule
  ],
  declarations: [
    AllBlogTagComponent
  ]
})
export class AllBlogTagModule { }
