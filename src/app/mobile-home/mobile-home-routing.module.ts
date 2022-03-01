import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileHomeComponent } from './mobile-home.component';
import { TimelineComponent } from '../shared/shared-components/components/timeline/timeline.component';

const routes: Routes = [
  {
    path: '',
    component: MobileHomeComponent,
    children: [
      {
        path: 'mobileHome',
        // component: MobileHomeComponent
        component: TimelineComponent
      },
      {
        path: 'mobileHome/:id',
        // component: MobileHomeComponent
        component: TimelineComponent
      }
    ]
  }

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MobileHomeRoutingModule { }
