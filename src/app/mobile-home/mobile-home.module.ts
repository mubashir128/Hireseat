import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponentsModule } from '../shared/shared-components/shared-components.module';
import { MobileHomeRoutingModule } from './mobile-home-routing.module';
import { MobileHomeComponent } from './mobile-home.component';

@NgModule({
  declarations: [
    MobileHomeComponent
  ],
  imports: [
    MobileHomeRoutingModule,
    CommonModule,
    SharedComponentsModule
  ]
})
export class MobileHomeModule { }
