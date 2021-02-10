import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RecruiterHomeComponent } from "./recruiter-home/recruiter-home.component";
import { ProfileComponent } from "../profile/profile.component";
import { BiddingEventsListComponent } from "../bidding-events-list/bidding-events-list.component";
import { RecruiterQuestionComponent } from "../recruiter-brodcast/recruiter-question/recruiter-question.component";
import { ResumeListComponent } from "./resume-list/resume-list.component";
import { NewResumeComponent } from "./new-resume/new-resume.component";
import { WonBidsComponent } from "./won-bids/won-bids.component";
import { SearchResumeComponent } from "../resume-bank/search-resume/search-resume.component";
import { VideoInterviewRoomComponent } from "../video-interview-room/video-interview-room.component";
import { AllRecruitersComponent } from "../shared/shared-components/components/all-recruiters/all-recruiters.component";
import { WaitingListComponent } from "./waiting-list/waiting-list.component";
import { UserCalendarComponent } from "../shared/shared-components/components/user-calendar/user-calendar.component";
import { SharedCandidateProfilesComponent } from "../shared/shared-components/components/shared-candidate-profiles/shared-candidate-profiles.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { CreateBiddingEventComponent } from "../employer/create-bidding-event/create-bidding-event.component";
import { CreateJobProfileComponent } from "../employer/create-job-profile/create-job-profile.component";
import { JobProfileListComponent } from "../employer/job-profile-list/job-profile-list.component";
import { EditJobProfileComponent } from "../employer/edit-job-profile/edit-job-profile.component";

const routes: Routes = [
  {
    path: "",
    component: RecruiterHomeComponent,
    children: [
      {
        path: "profile",
        component: ProfileComponent,
      },
      {
        path: "bidding-event-list",
        component: BiddingEventsListComponent,
      },
      {
        path: "bidding-event-list/:type",
        component: BiddingEventsListComponent,
      },
      {
        path: "recruiter-question/:id",
        component: RecruiterQuestionComponent,
      },
      {
        path: "resume-list",
        component: ResumeListComponent,
      },
      {
        path: "new-resume",
        component: NewResumeComponent,
      },
      {
        path: "won-bids",
        component: WonBidsComponent,
      },
      {
        path: "search-resume",
        component: SearchResumeComponent,
      },
      {
        path: "video-interview-room",
        component: VideoInterviewRoomComponent,
      },
      {
        path: "all-recruiters",
        component: AllRecruitersComponent,
      },
      {
        path: "waiting-list",
        component: WaitingListComponent,
      },
      {
        path: "calendar",
        component: UserCalendarComponent,
      },
      {
        path: "share-candidate-profile",
        component: SharedCandidateProfilesComponent,
      },
      {
        path: "dashboard",
        component: DashboardComponent,
      },
      {
        path: "create-bidding-event",
        component: CreateBiddingEventComponent,
      },
      {
        path:"create-job-profile",
        component:CreateJobProfileComponent
      },
      {
        path: "job-profile-list",
        component: JobProfileListComponent,
      },
      {
        path: "edit-job-profile",
        component: EditJobProfileComponent,
      },
    ],
    // canActivate: [RecruiterGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecruiterRoutingModule {}
