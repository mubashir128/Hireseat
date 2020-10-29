import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { AllRecruitersComponent } from '../shared/shared-components/components/all-recruiters/all-recruiters.component';
import { CandidateHomeComponent } from './candidate-home/candidate-home.component';
import { MyReviewedProfilesComponent } from './my-reviewed-profiles/my-reviewed-profiles.component';
import { VideoInterviewRoomComponent } from '../video-interview-room/video-interview-room.component';


const routes: Routes = [
  {
    path: '',
    component: CandidateHomeComponent,
    children: [
      {
        path: 'all-recruiters',
        component: AllRecruitersComponent
      },
      {
        path: 'my-profile',
        component: MyProfileComponent
      },

      {
        path: 'my-reviewed-profiles',
        component: MyReviewedProfilesComponent
      },
      {
        path:'interview-room',
        component:VideoInterviewRoomComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidateRoutingModule { }
