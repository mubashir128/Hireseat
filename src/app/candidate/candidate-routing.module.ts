import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { AllRecruitersComponent } from '../shared/shared-components/components/all-recruiters/all-recruiters.component';
import { CandidateHomeComponent } from './candidate-home/candidate-home.component';


const routes: Routes = [
  {
    path: '',
    component: CandidateHomeComponent,
    children: [
      {
        path: 'my-profile',
        component: MyProfileComponent
      },
      {
        path: 'all-recruiters',
        component: AllRecruitersComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidateRoutingModule { }
