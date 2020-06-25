import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewForumRoutingModule } from './view-forum-routing.module';
import { ViewForumComponent } from './view-forum.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { SharedComponentsModule } from '../shared/shared-components/shared-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    ViewForumRoutingModule,
    SharedComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  declarations: [
    ViewForumComponent,
    SearchFilterPipe
  ]
})
export class ViewForumModule { }
