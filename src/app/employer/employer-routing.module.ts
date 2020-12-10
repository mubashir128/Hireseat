import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EmployerHomeComponent } from "./employer-home/employer-home.component";
import { ProfileComponent } from "../profile/profile.component";
import { JobProfileListComponent } from "./job-profile-list/job-profile-list.component";
import { CreateJobProfileComponent } from "./create-job-profile/create-job-profile.component";
import { BiddingEventsListComponent } from "../bidding-events-list/bidding-events-list.component";
import { CreateBiddingEventComponent } from "./create-bidding-event/create-bidding-event.component";
import { EditJobProfileComponent } from "./edit-job-profile/edit-job-profile.component";
import { FeedbackListComponent } from "./feedback-list/feedback-list.component";
import { EmployeerAnsComponent } from "../recruiter-brodcast/employeer-ans/employeer-ans.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { VideoInterviewRoomComponent } from "../video-interview-room/video-interview-room.component";
import { MycandidatesComponent } from "./mycandidates/mycandidates.component";
import { NewResumeComponent } from "../recruiter/new-resume/new-resume.component";
import { SharedCandidateProfilesComponent } from "../shared/shared-components/components/shared-candidate-profiles/shared-candidate-profiles.component";

const routes: Routes = [
  {
    path: "",
    component: EmployerHomeComponent,
    children: [
      {
        path: "profile",
        component: ProfileComponent,
      },
      {
        path: "job-profile-list",
        component: JobProfileListComponent,
      },
      {
        path: "create-job-profile",
        component: CreateJobProfileComponent,
      },
      {
        path: "bidding-event-list",
        component: BiddingEventsListComponent,
      },
      {
        path: "create-bidding-event",
        component: CreateBiddingEventComponent,
      },
      {
        path: "edit-job-profile",
        component: EditJobProfileComponent,
      },
      {
        path: "feedback-list",
        component: FeedbackListComponent,
      },
      {
        path: "employer-Answere/:id",
        component: EmployeerAnsComponent,
      },
      {
        path: "dashboard",
        component: DashboardComponent,
      },
      {
        path: "video-interview-room",
        component: VideoInterviewRoomComponent,
      },
      {
        path: "mycandidates",
        component: MycandidatesComponent,
      },
      {
        path: "new-resume",
        component: NewResumeComponent,
      },
      {
        path: "share-candidate-profile",
        component: SharedCandidateProfilesComponent,
      },
    ],
    // canActivate: [EmployerGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployerRoutingModule {}
