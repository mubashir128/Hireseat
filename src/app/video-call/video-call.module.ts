import { NgxSpinnerModule } from 'ngx-spinner';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { VideoCallRoutingModule } from './video-call-routing.module';
import { OpentokService } from '../_services/opentok.service';
import { VideoCallComponent } from './video-call.component';
import { PublisherComponent } from '../publisher/publisher.component';
import { SubscriberComponent } from '../subscriber/subscriber.component';
import { SharedComponentsModule } from '../shared/shared-components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    VideoCallRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    SharedComponentsModule
  ],
  providers: [
    OpentokService
  ],
  declarations: [
    VideoCallComponent,
    PublisherComponent,
    SubscriberComponent,
  ],
})
export class VideoCallModule { }
