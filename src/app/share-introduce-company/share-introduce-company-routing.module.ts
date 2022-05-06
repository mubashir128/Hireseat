import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShareIntroduceCompanyComponent } from './share-introduce-company.component';
import { CommonModule } from '@angular/common';
import { SharedComponentsModule } from '../shared/shared-components/shared-components.module';

const routes: Routes = [{ path: '', component: ShareIntroduceCompanyComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedComponentsModule
  ],
  exports: [RouterModule]
})
export class ShareIntroduceCompanyRoutingModule { }
