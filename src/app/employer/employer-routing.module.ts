import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployerHomeComponent } from './employer-home/employer-home.component';
import { ProfileComponent } from '../profile/profile.component';
import { CreateJobProfileComponent } from './create-job-profile/create-job-profile.component';
import { BiddingEventsListComponent } from '../bidding-events-list/bidding-events-list.component';
import { CreateBiddingEventComponent } from './create-bidding-event/create-bidding-event.component';
import { EditJobProfileComponent } from './edit-job-profile/edit-job-profile.component';
import { FeedbackListComponent } from './feedback-list/feedback-list.component';
import { EmployeerAnsComponent } from '../recruiter-brodcast/employeer-ans/employeer-ans.component';
import { VideoInterviewRoomComponent } from '../video-interview-room/video-interview-room.component';
import { NewResumeComponent } from '../recruiter/new-resume/new-resume.component';

const routes: Routes = [
  {
    path: "",
    component: EmployerHomeComponent,
    children: [
      {
        path: "profile",
        component: ProfileComponent
      },
      {
        path: "job-profile-list",
        loadChildren : "./job-profile-list/job-profile-list.module#JobProfileListModule"
      },
      {
        path: "create-job-profile",
        component: CreateJobProfileComponent
      },
      {
        path: "bidding-event-list",
        component: BiddingEventsListComponent
      },
      {
        path: "create-bidding-event",
        component: CreateBiddingEventComponent
      },
      {
        path: "edit-job-profile",
        component: EditJobProfileComponent
      },
      {
        path: "feedback-list",
        component: FeedbackListComponent
      },
      {
        path: "employer-Answere/:id",
        component: EmployeerAnsComponent
      },
      {
        path: "dashboard",
        loadChildren : "./dashboard/dashboard.module#DashboardModule"
      },
      {
        path: "video-interview-room",
        component: VideoInterviewRoomComponent
      },
      {
        path: "mycandidates",
        loadChildren : "./mycandidates/mycandidates.module#MycandidatesModule"
      },
      {
        path: "new-resume",
        component: NewResumeComponent
      }
    ],
    // canActivate: [EmployerGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployerRoutingModule { }
