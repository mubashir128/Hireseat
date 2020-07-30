import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecruiterHomeComponent } from './recruiter-home/recruiter-home.component';
import { ProfileComponent } from '../profile/profile.component';
import { BiddingEventsListComponent } from '../bidding-events-list/bidding-events-list.component';
import { RecruiterQuestionComponent } from '../recruiter-brodcast/recruiter-question/recruiter-question.component';
import { NewResumeComponent } from './new-resume/new-resume.component';
import { VideoInterviewRoomComponent } from '../video-interview-room/video-interview-room.component';

const routes: Routes = [
  {
    path: "",
    component: RecruiterHomeComponent,
    children: [
      {
        path: "profile",
        component: ProfileComponent
      },
      {
        path: "bidding-event-list",
        component: BiddingEventsListComponent
      },
      {
        path: "bidding-event-list/:type",
        component: BiddingEventsListComponent
      },
      {
        path: "recruiter-question/:id",
        component: RecruiterQuestionComponent
      },
      {
        path: "resume-list",
        loadChildren : "./resume-list/resume-list.module#ResumeListModule"
      },
      {
        path: "new-resume",
        component: NewResumeComponent
      },
      {
        path: "won-bids",
        loadChildren : "./won-bids/won-bids.module#WonBidsModule"
      },
      {
        path: "search-resume",
        loadChildren : "../resume-bank/search-resume/search-resume.module#SearchResumeModule"
      },
      {
        path: "video-interview-room",
        component: VideoInterviewRoomComponent
      },


    ],
    // canActivate: [RecruiterGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecruiterRoutingModule { }
