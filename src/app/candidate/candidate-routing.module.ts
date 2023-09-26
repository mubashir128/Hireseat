import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MyProfileComponent } from "./my-profile/my-profile.component";
import { AllRecruitersComponent } from "../shared/shared-components/components/all-recruiters/all-recruiters.component";
import { CandidateHomeComponent } from "./candidate-home/candidate-home.component";
import { MyReviewedProfilesComponent } from "./my-reviewed-profiles/my-reviewed-profiles.component";
import { VideoInterviewRoomComponent } from "../video-interview-room/video-interview-room.component";
import { SharedCandidateProfilesComponent } from "../shared/shared-components/components/shared-candidate-profiles/shared-candidate-profiles.component";
import { BiddingEventsListComponent } from "../bidding-events-list/bidding-events-list.component";
import {MenusComponent} from "../shared/shared-components/components/menus/menus.component";
import { NotificationsComponent } from "../shared/shared-components/components/notifications/notifications.component";
import { FillFormComponent } from "../shared/shared-components/components/fill-form/fill-form.component";
import { OnlyForCandidateSharedProfileComponent } from "./only-for-candidate-shared-profile/only-for-candidate-shared-profile.component";
import { UserChatComponent } from "../shared/shared-components/components/user-chat/user-chat.component";
import { FriendsConnectionsComponent } from "../shared/shared-components/components/friends-connections/friends-connections.component";
import { TimelineComponent } from "../shared/shared-components/components/timeline/timeline.component";
import { UserChatRecordComponent } from "../shared/shared-components/components/user-chat-record/user-chat-record.component";
import { EditHighlightsComponent } from "../shared/shared-components/components/edit-highlights/edit-highlights.component";
import { SettingsComponent } from "../shared/shared-components/components/settings/settings.component";
import { SuggestAndEventsComponent } from "../shared/shared-components/components/suggest-and-events/suggest-and-events.component";
import { EventListUsersComponent } from "../shared/shared-components/components/event-list-users/event-list-users.component";
import { ConferenceRoomComponent } from "../shared/shared-components/components/conference-room/conference-room.component";
import { SuggestConnectedComponent } from "../shared/shared-components/components/suggest-connected/suggest-connected.component";
import { AppliedPostJobsComponent } from "../shared/shared-components/components/applied-post-jobs/applied-post-jobs.component";
import { SuggestedPostJobsComponent } from "../shared/shared-components/components/suggested-post-jobs/suggested-post-jobs.component";
import { TimelineCommentsComponent } from "../shared/shared-components/components/timeline-comments/timeline-comments.component";

const routes: Routes = [
  {
    path: "",
    component: CandidateHomeComponent,
    children: [
      {
        path: "all-recruiters",
        component: AllRecruitersComponent,
      },
      {
        path: "my-profile",
        component: MyProfileComponent,
      },
      {
        path: "all-only-candidate-shared-profile",
        component: OnlyForCandidateSharedProfileComponent,
      },
      {
        path: "friends-connections",
        component: FriendsConnectionsComponent,
      },
      {
        path: "my-reviewed-profiles",
        component: MyReviewedProfilesComponent,
      },
      {
        path: "interview-room",
        component: VideoInterviewRoomComponent,
      },
      {
        path: "my-posted-profiles",
        component: SharedCandidateProfilesComponent,
      },
      {
        path: "bidding-event-list",
        component: BiddingEventsListComponent,
      },
      {
        path: "menus",
        component: MenusComponent,
      },
      {
        path: "notification",
        component: NotificationsComponent,
      },
      {
        path: "fill-form",
        component: FillFormComponent,
      },
      {
        path: "user-chat",
        component: UserChatComponent,
      },
      {
        path: "chat-record/:id",
        component: UserChatRecordComponent,
      },
      {
        path: "timeline",
        component: TimelineComponent,
      },
      {
        path: "edit-highlights",
        component: EditHighlightsComponent,
      },
      {
        path: "settings",
        component: SettingsComponent,
      },
      {
        path: "suggest-and-events",
        component: SuggestAndEventsComponent,
      },
      {
        path: "see-event-users/:eventId",
        component: EventListUsersComponent,
      },
      {
        path: "conference-room",
        component: ConferenceRoomComponent,
      },
      {
        path: "suggest-connected-friends",
        component: SuggestConnectedComponent,
      },
      {
        path: "applied-jobs",
        component: AppliedPostJobsComponent,
      },
      {
        path: "my-post-jobs",
        component: SuggestedPostJobsComponent,
      },
      {
        path: "timeline-comments/:timelineId",
        component: TimelineCommentsComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CandidateRoutingModule {}
