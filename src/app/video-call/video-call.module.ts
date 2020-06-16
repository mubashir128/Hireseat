import { NgxSpinnerModule } from 'ngx-spinner';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { VideoCallRoutingModule } from './video-call-routing.module';
import { OpentokService } from '../_services/opentok.service';
import { VideoCallComponent } from './video-call.component';
import { PublisherComponent } from '../publisher/publisher.component';
import { SubscriberComponent } from '../subscriber/subscriber.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { AppModule } from '../app.module';

@NgModule({
  imports: [
    CommonModule,
    VideoCallRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    AppModule,
    NavbarComponent,
    FooterComponent
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
