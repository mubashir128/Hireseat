import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedVideoRoutingModule } from './shared-video-routing.module';
import { NgxSpinnerModule } from "ngx-spinner";
import { SharedVideoComponent } from './shared-video.component';
import { MatVideoModule } from 'mat-video';
import { SharedComponentsModule } from '../shared/shared-components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    SharedVideoRoutingModule,
    NgxSpinnerModule,
    MatVideoModule,
    SharedComponentsModule
  ],
  declarations: [
    SharedVideoComponent
  ]
})
export class SharedVideoModule { }
