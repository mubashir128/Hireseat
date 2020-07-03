import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedVideoRoutingModule } from './shared-video-routing.module';
import { NgxSpinnerModule } from "ngx-spinner";
import { SharedVideoComponent } from './shared-video.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatVideoModule } from 'mat-video';

@NgModule({
  imports: [
    CommonModule,
    SharedVideoRoutingModule,
    NgxSpinnerModule,
    // BrowserAnimationsModule,
    MatVideoModule
  ],
  declarations: [
    SharedVideoComponent
  ]
})
export class SharedVideoModule { }
