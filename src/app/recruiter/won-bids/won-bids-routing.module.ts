import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WonBidsComponent } from './won-bids.component';

const routes: Routes = [{
  path : "",
  component : WonBidsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WonBidsRoutingModule { }
