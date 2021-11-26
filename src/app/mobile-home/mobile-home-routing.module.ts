import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileHomeComponent } from './mobile-home.component';

const routes: Routes = [
  {
    path: '',
    component: MobileHomeComponent,
    children: [
      {
        path: 'mobileHome',
        component: MobileHomeComponent
      },
      {
        path: 'mobileHome/:id',
        component: MobileHomeComponent
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
