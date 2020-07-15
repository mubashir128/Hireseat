import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuctionrulesComponent } from './auctionrules.component';

const routes: Routes = [
  {
    path: '',
    component: AuctionrulesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuctionrulesRoutingModule { }
