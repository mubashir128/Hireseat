import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotPasswordResetComponent } from './forgot-password-reset.component';

const routes: Routes = [
  {
    path: '',
    component: ForgotPasswordResetComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgotPasswordResetRoutingModule { }
