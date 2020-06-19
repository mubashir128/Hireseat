import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedVideoRoutingModule } from './shared-video-routing.module';
import { NgxSpinnerModule } from "ngx-spinner";
import { SharedVideoComponent } from './shared-video.component';


@NgModule({
  imports: [
    CommonModule,
    SharedVideoRoutingModule,
    NgxSpinnerModule
  ],
  declarations: [
    SharedVideoComponent
  ]
})
export class SharedVideoModule { }