import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MobileRegisterComponent } from './mobile-register.component';

const routes: Routes = [
  {
    path: '',
    component: MobileRegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobileRegisterRoutingModule { }
