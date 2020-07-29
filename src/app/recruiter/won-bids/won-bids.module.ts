import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WonBidsRoutingModule } from './won-bids-routing.module';
import { WonBidsComponent } from './won-bids.component';
import { SharedComponentsModule } from '../../shared/shared-components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    WonBidsRoutingModule,
    SharedComponentsModule
  ],
  declarations: [
    WonBidsComponent
  ]
})
export class WonBidsModule { }
