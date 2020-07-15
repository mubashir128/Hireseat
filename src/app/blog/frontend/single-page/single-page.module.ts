import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SinglePageRoutingModule } from './single-page-routing.module';
import { SinglePageComponent } from './single-page.component';
import { SharedComponentsModule } from 'src/app/shared/shared-components/shared-components.module';
import { SocialShareComponent } from './social-share/social-share.component';
import { NgxTwitterTimelineModule } from 'ngx-twitter-timeline';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SinglePageRoutingModule,
    SharedComponentsModule,
    NgxTwitterTimelineModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    SinglePageComponent,
    SocialShareComponent
  ]
})
export class SinglePageModule { }
