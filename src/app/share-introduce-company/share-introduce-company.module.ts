import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareIntroduceCompanyRoutingModule } from './share-introduce-company-routing.module';
import { ShareIntroduceCompanyComponent } from './share-introduce-company.component';


@NgModule({
  declarations: [ShareIntroduceCompanyComponent],
  imports: [
    CommonModule,
    ShareIntroduceCompanyRoutingModule,
  ]
})
export class ShareIntroduceCompanyModule { }
