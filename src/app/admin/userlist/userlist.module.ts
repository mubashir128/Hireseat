import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserlistRoutingModule } from './userlist-routing.module';
import { UserlistComponent } from './userlist.component';
import { SharedComponentsModule } from 'src/app/shared/shared-components/shared-components.module';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    UserlistRoutingModule,
    SharedComponentsModule,
    NgxPaginationModule
  ],
  declarations: [
    UserlistComponent
  ]
})
export class UserlistModule { }
