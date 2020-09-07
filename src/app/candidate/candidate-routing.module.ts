import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { AllRecruitersComponent } from '../shared/shared-components/components/all-recruiters/all-recruiters.component';
import { CandidateHomeComponent } from './candidate-home/candidate-home.component';
import { MyReviewedProfilesComponent } from './my-reviewed-profiles/my-reviewed-profiles.component';


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
      },
      {
        path: 'my-reviewed-profiles',
        component: MyReviewedProfilesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidateRoutingModule { }
