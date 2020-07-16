import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllPostRoutingModule } from './all-post-routing.module';
import { AllBlogsComponent } from '../frontend/all-blogs/all-blogs.component';
import { Ng2CompleterModule } from 'ng2-completer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from 'src/app/shared/shared-components/shared-components.module';
import { NgxTwitterTimelineModule } from 'ngx-twitter-timeline';

@NgModule({
  imports: [
    CommonModule,
    AllPostRoutingModule,
    Ng2CompleterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    NgxTwitterTimelineModule
  ],
  declarations: [
    AllBlogsComponent
  ]
})
export class AllPostModule { }
