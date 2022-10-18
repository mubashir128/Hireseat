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
import { OnlyForCandidateSharedProfileComponent } from "./only-for-candidate-shared-profile/only-for-candidate-shared-profile.component";
import { UserChatComponent } from "../shared/shared-components/components/user-chat/user-chat.component";
import { FriendsConnectionsComponent } from "../shared/shared-components/components/friends-connections/friends-connections.component";
import { UserChatRecordComponent } from "../shared/shared-components/components/user-chat-record/user-chat-record.component";
import { SuggestIntroduceComponent } from "../shared/shared-components/components/suggest-introduce/suggest-introduce.component";
import { SettingsComponent } from "../shared/shared-components/components/settings/settings.component";
import { TimelineComponent } from "../shared/shared-components/components/timeline/timeline.component";

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
        path: "suggest-introduce",
        component: SuggestIntroduceComponent,
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
        path: "user-chat",
        component: UserChatComponent,
      },
      {
        path: "chat-record/:id",
        component: UserChatRecordComponent,
      },
      {
        path: "settings",
        component: SettingsComponent,
      },
      {
        path: "timeline",
        component: TimelineComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CandidateRoutingModule {}
