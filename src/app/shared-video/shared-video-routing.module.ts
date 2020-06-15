import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { SharedVideoComponent } from './shared-video.component';
const routes: Routes = [
  {
    path: '',
    component: SharedVideoComponent
  }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class SharedVideoRoutingModule { }
