import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideoCallComponent } from './video-call.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: VideoCallComponent
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoCallRoutingModule { }
