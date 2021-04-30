import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SAUserListRoutingModule } from './sa-user-list-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SAUserListComponent } from './sa-user-list.component';
import { NgxPaginationModule } from "ngx-pagination";
import { SharedComponentsModule } from 'src/app/shared/shared-components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    SAUserListRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SharedComponentsModule
  ],
  declarations: [
    SAUserListComponent
  ]
})
export class SAUserListModule { }
