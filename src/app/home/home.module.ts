import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedComponentsModule } from '../shared/shared-components/shared-components.module';
import { NgxTwitterTimelineModule } from 'ngx-twitter-timeline';

@NgModule({
  imports: [
    HomeRoutingModule,
    CommonModule,
    SharedComponentsModule,
    NgxTwitterTimelineModule
  ],
  declarations: [
    HomeComponent,
  ],
  providers: [
  ]
})
export class HomeModule { }
