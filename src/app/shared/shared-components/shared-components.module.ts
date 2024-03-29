import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FooterComponent } from "../../footer/footer.component";
import { NavbarComponent } from "../../navbar/navbar.component";
import { MediaComponent } from "../../media/media.component";
import { NgxTwitterTimelineModule } from "ngx-twitter-timeline";
import { TimeFormat } from "../../home/pipe";
import { SafePipe } from "../../blog/frontend/safepipe";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { QuestionsComponent } from "../../view-forum/questions/questions.component";
import { AskbuttonComponent } from "../../view-forum/askbutton/askbutton.component";
import { RecruiterNavbarComponent } from "../../recruiter/recruiter-navbar/recruiter-navbar.component";
import { EmployerNavbarComponent } from "../../employer/employer-navbar/employer-navbar.component";
import { BiddingEventsListComponent } from "../../bidding-events-list/bidding-events-list.component";
import { ProfileComponent } from "../../profile/profile.component";
import { NewResumeComponent } from "../../recruiter/new-resume/new-resume.component";
import { VideoInterviewRoomComponent } from "../../video-interview-room/video-interview-room.component";
import { EditResumeComponent } from "../../recruiter/edit-resume/edit-resume.component";
import { ResumeListComponent } from "../../recruiter/resume-list/resume-list.component";
import { ResumeItemComponent } from "../../recruiter/resume-item/resume-item.component";
import { LimitPipe } from "../../../charlimit";
import { SortPipe } from "../pipes/sort.pipe";
import { InUserChatSearchPipe } from "../pipes/in-user-chat-search.pipe";
import { SafePdfPipe } from "../pipes/safe-pdf.pipe";
import { SearchPipe } from "../../shared/pipes/search.pipe";
import { inArrayPipe } from "../pipes/inArrayPipe";
import { PdfViewerComponent } from "../../recruiter/pdf-viewer/pdf-viewer.component";
import { NgxPaginationModule } from "ngx-pagination";
import { BiddingEventItemComponent } from "../../bidding-event-item/bidding-event-item.component";
import { LineChartComponent } from "../chart/line-chart/line-chart.component";
import { PieChartComponent } from "../chart/pie-chart/pie-chart.component";
import { BarChartComponent } from "../chart/bar-chart/bar-chart.component";
import { ScatterChartComponent } from "../chart/scatter-chart/scatter-chart.component";
import { SearchByNamePipe } from "../../shared/pipes/search-by-name.pipe";
import { SearchByExperiencePipe } from "../../shared/pipes/search-by-experience.pipe";
import { SidebarComponent } from "../../admin/sidebar/sidebar.component";
import { EditTagComponent } from "../../blog/edit-blog/edit-tag/edit-tag.component";
import { TagInputModule } from "ngx-chips";
import { VideoQuestionsComponent } from "./components/video-questions/video-questions.component";
import { FilterDataComponent } from "./components/filter-data/filter-data.component";
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { SelectDropDownModule } from "ngx-select-dropdown";
import { AllRecruitersComponent } from "./components/all-recruiters/all-recruiters.component";
import { UserCalendarComponent } from "./components/user-calendar/user-calendar.component";
import { CalendarModule, DateAdapter } from "angular-calendar";
import { adapterFactory } from "angular-calendar/date-adapters/date-fns";
import { NgbModalModule } from "@ng-bootstrap/ng-bootstrap";
import { SharedCandidateProfilesComponent } from "./components/shared-candidate-profiles/shared-candidate-profiles.component";
import { CandidateNavbarComponent } from "src/app/candidate/candidate-navbar/candidate-navbar.component";
import { ShareProfileSearchPipe } from "./components/shared-candidate-profiles/share-profile-search.pipe";
import { AllRecruiterSearchPipe } from "./components/all-recruiters/all-recruiter-search.pipe";
import { ReversePipe } from "../pipes/reverse.pipe";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { FlatpickrModule } from "angularx-flatpickr";
import { CreateBiddingEventComponent } from "../../employer/create-bidding-event/create-bidding-event.component";
import { CreateJobProfileComponent } from "../../employer/create-job-profile/create-job-profile.component";
import { JobProfileListComponent } from "../../employer/job-profile-list/job-profile-list.component";
import { EditJobProfileComponent } from "../../employer/edit-job-profile/edit-job-profile.component";
import { MomentModule } from 'ngx-moment';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { MenusComponent } from './components/menus/menus.component';
import { MobileNavTabComponent } from './components/mobile-nav-tab/mobile-nav-tab.component';
import { MultiSharedCandidateProfileComponent } from './components/multi-shared-candidate-profile/multi-shared-candidate-profile.component';
import { ListLoaderComponent } from './components/list-loader/list-loader.component';
import { UserChatComponent } from './components/user-chat/user-chat.component';
import { NoDataAvailableComponent } from './no-data-available/no-data-available.component';
import { FillFormComponent } from './components/fill-form/fill-form.component';
import { SerchBySkillsPipe } from '../../shared/pipes/serch-by-skills.pipe';
import { SerchByFullNamePipe } from '../../shared/pipes/serch-by-full-name.pipe';
import { SearchByCTRPipe } from '../../shared/pipes/search-by-ctr.pipe';
import { SerchByJobTitlePipe } from '../../shared/pipes/serch-by-job-title.pipe';
import { ListLoaderSearchComponent } from './components/list-loader-search/list-loader-search.component';
import { TitleCasePipe } from "../pipes/title-case.pipe";
import { FriendsConnectionsComponent } from './components/friends-connections/friends-connections.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { SearchByOnlyFullNamePipe } from '../../shared/pipes/search-by-only-full-name.pipe';
import { SortByIndustiresPipe } from '../../shared/pipes/sort-by-industires.pipe';
import { DiaplogOfferIntroEmailComponent } from './components/diaplog-offer-intro-email/diaplog-offer-intro-email.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogIntroduceComponent } from './components/dialog-introduce/dialog-introduce.component';
import { DialogEmailPreviewComponent } from './components/dialog-email-preview/dialog-email-preview.component';
import { DialogEmailPreview2Component } from './components/dialog-email-preview2/dialog-email-preview2.component';
import { DialogOfferIntroChatComponent } from './components/dialog-offer-intro-chat/dialog-offer-intro-chat.component';
import { DialogConnectOfferIntroComponent } from './components/dialog-connect-offer-intro/dialog-connect-offer-intro.component';
import { CloseScreenComponent } from './components/close-screen/close-screen.component';
import { DialogImagePreviewComponent } from './components/dialog-image-preview/dialog-image-preview.component';
import { DialogCreateGroupComponent } from './components/dialog-create-group/dialog-create-group.component';
import { DialogSettingComponent } from './components/dialog-setting/dialog-setting.component';
import { DialogGroupMembersComponent } from './components/dialog-group-members/dialog-group-members.component';
import { DialogAddMembersComponent } from './components/dialog-add-members/dialog-add-members.component';
import { DialogUploadPictureComponent } from './components/dialog-upload-picture/dialog-upload-picture.component';
import { DialogTitleComponent } from './components/dialog-title/dialog-title.component';
import { DialogThanksLaterComponent } from './components/dialog-thanks-later/dialog-thanks-later.component';
import { DialogShareToUsersComponent } from './components/dialog-share-to-users/dialog-share-to-users.component';
import { CandidateSummaryComponent } from './components/candidate-summary/candidate-summary.component';
import { SkillsAndIndustriesComponent } from './components/skills-and-industries/skills-and-industries.component';
import { InterviewQuestionsComponent } from './components/interview-questions/interview-questions.component';
import { ProfileButtonsComponent } from "./components/profile-buttons/profile-buttons.component";
import { DialogProfileExampleComponent } from './components/dialog-profile-example/dialog-profile-example.component';
import { DialogDeleteComponent } from './components/dialog-delete/dialog-delete.component';
import { UserChatRecordComponent } from './components/user-chat-record/user-chat-record.component';
import { DialogAskToSendProfileLinkComponent } from './components/dialog-ask-to-send-profile-link/dialog-ask-to-send-profile-link.component';
import { PostJobComponent } from './components/post-job/post-job.component';
import { DialogCreatePostJobComponent } from './components/dialog-create-post-job/dialog-create-post-job.component';
import { AppListComponent } from './components/app-list/app-list.component';
import { SuggestIntroduceComponent } from './components/suggest-introduce/suggest-introduce.component';
import { OnlyForCandidateSharedProfileComponent } from "src/app/candidate/only-for-candidate-shared-profile/only-for-candidate-shared-profile.component";
import { DialogSelectToAddFriendsComponent } from './components/dialog-select-to-add-friends/dialog-select-to-add-friends.component';
import {MatListModule} from '@angular/material/list';
import { ShowFriendRequestListComponent } from './components/show-friend-request-list/show-friend-request-list.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';


import { DialogMessageComponent } from './components/dialog-message/dialog-message.component';
import { EditHighlightsComponent } from './components/edit-highlights/edit-highlights.component';
import {MatFormFieldModule} from '@angular/material/form-field';  
import { SettingsComponent } from './components/settings/settings.component';
import { JoyrideModule } from "ngx-joyride";
import { MatStepperModule } from "@angular/material/stepper";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CreateEventComponent } from './components/create-event/create-event.component';
import { DialogCreateEventComponent } from './components/dialog-create-event/dialog-create-event.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { EventListComponent } from './components/event-list/event-list.component';
import { SuggestAndEventsComponent } from './components/suggest-and-events/suggest-and-events.component';
import { EventListUsersComponent } from './components/event-list-users/event-list-users.component';
import { ConferenceRoomComponent } from './components/conference-room/conference-room.component';
import { CandidateProfilesComponent } from './components/candidate-profiles/candidate-profiles.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { CommentsSectionComponent } from './components/comments-section/comments-section.component';
import { DialogSelectUserToExportComponent } from './components/dialog-select-user-to-export/dialog-select-user-to-export.component';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule} from '@angular/material/input';
import { SuggestConnectedComponent } from './components/suggest-connected/suggest-connected.component';
import { DialogDeleteUsersComponent } from './components/dialog-delete-users/dialog-delete-users.component';
import { AllUserListComponent } from './components/all-user-list/all-user-list.component';
import { MatTableModule } from '@angular/material/table';
import { IntroductionsComponent } from './components/introductions/introductions.component';
import { PendingIntroductionsComponent } from './components/pending-introductions/pending-introductions.component';
import { DialogSelectUserComponent } from './components/dialog-select-user/dialog-select-user.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SortComponent } from './components/sort/sort.component';
import { MatButtonModule } from '@angular/material/button';
import { IntrosTabComponent } from './components/intros-tab/intros-tab.component';
import { DialogInputTextMessageComponent } from './components/dialog-input-text-message/dialog-input-text-message.component';
import { SuggestedPostJobsComponent } from './components/suggested-post-jobs/suggested-post-jobs.component';
import { AppliedPostJobsComponent } from './components/applied-post-jobs/applied-post-jobs.component';
import { DialogInputBigMessageComponent } from './components/dialog-input-big-message/dialog-input-big-message.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DialogOnlyTextMessageComponent } from './components/dialog-only-text-message/dialog-only-text-message.component';
import { DialogOnlyMessageComponent } from './components/dialog-only-message/dialog-only-message.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { SelectJobTitleComponent } from './components/select-job-title/select-job-title.component';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { SelectDesiredCompaniesComponent } from './components/select-desired-companies/select-desired-companies.component';
import { DialogSelectButttonsComponent } from './components/dialog-select-butttons/dialog-select-butttons.component';
import { IntrosToCompaniesComponent } from './components/intros-to-companies/intros-to-companies.component';
import { TimelineCommentsComponent } from './components/timeline-comments/timeline-comments.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { TopUsersComponent } from './components/top-users/top-users.component';
import { ConnectionRequestsComponent } from './components/connection-requests/connection-requests.component';
import { MatGridListModule } from '@angular/material/grid-list';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxTwitterTimelineModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    NgxPaginationModule,
    TagInputModule,
    CKEditorModule,
    SelectDropDownModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    NgbModalModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MomentModule,
    MatDialogModule,
    MatListModule,
    MatFormFieldModule,
    JoyrideModule,
    MatStepperModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatTabsModule,
    MatCardModule,
    NgxMaterialTimepickerModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    DragDropModule,
    MatCheckboxModule,
    MatButtonModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatIconModule,
    MatGridListModule,
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    MediaComponent,
    QuestionsComponent,
    AskbuttonComponent,
    RecruiterNavbarComponent,
    EmployerNavbarComponent,
    // pipes
    TimeFormat,
    SafePipe,
    inArrayPipe,
    LimitPipe,
    SortPipe,
    InUserChatSearchPipe,
    SafePdfPipe,
    SearchPipe,
    SearchByNamePipe,
    SearchByExperiencePipe,
    TitleCasePipe,
    // end of pipes

    PdfViewerComponent,
    ResumeItemComponent,
    // ResumeListComponent,
    EditResumeComponent,
    BiddingEventsListComponent,
    ProfileComponent,
    NewResumeComponent,
    VideoInterviewRoomComponent,
    BiddingEventItemComponent,

    //
    BarChartComponent,
    LineChartComponent,
    PieChartComponent,
    ScatterChartComponent,
    SidebarComponent,
    VideoQuestionsComponent,
    // EditTagComponent

    VideoQuestionsComponent,
    FilterDataComponent,
    AllRecruitersComponent,
    UserCalendarComponent,
    SharedCandidateProfilesComponent,

    // candidate
    CandidateNavbarComponent,

    ShareProfileSearchPipe,

    AllRecruiterSearchPipe,
    ReversePipe,

    //job posting
    CreateBiddingEventComponent,
    CreateJobProfileComponent,
    JobProfileListComponent,
    EditJobProfileComponent,
    NotificationsComponent,
    MenusComponent,
    MobileNavTabComponent,
    MultiSharedCandidateProfileComponent,
    ListLoaderComponent,
    ListLoaderSearchComponent,
    UserChatComponent,
    NoDataAvailableComponent,
    FillFormComponent,
    SerchBySkillsPipe,
    SerchByFullNamePipe,
    SearchByCTRPipe,
    SerchByJobTitlePipe,
    FriendsConnectionsComponent,
    TimelineComponent,
    SearchByOnlyFullNamePipe,
    SortByIndustiresPipe,
    DiaplogOfferIntroEmailComponent,
    DialogIntroduceComponent,
    DialogEmailPreviewComponent,
    DialogEmailPreview2Component,
    DialogOfferIntroChatComponent,
    DialogConnectOfferIntroComponent,
    CloseScreenComponent,
    DialogImagePreviewComponent,
    DialogCreateGroupComponent,
    DialogSettingComponent,
    DialogGroupMembersComponent,
    DialogAddMembersComponent,
    DialogUploadPictureComponent,
    DialogTitleComponent,
    DialogThanksLaterComponent,
    DialogShareToUsersComponent,
    CandidateSummaryComponent,
    SkillsAndIndustriesComponent,
    ProfileButtonsComponent,
    InterviewQuestionsComponent,
    DialogProfileExampleComponent,
    DialogDeleteComponent,
    UserChatRecordComponent,
    DialogAskToSendProfileLinkComponent,
    PostJobComponent,
    DialogCreatePostJobComponent,
    AppListComponent,
    SuggestIntroduceComponent,
    OnlyForCandidateSharedProfileComponent,
    DialogSelectToAddFriendsComponent,
    ShowFriendRequestListComponent,
    DialogMessageComponent,
    EditHighlightsComponent,
    SettingsComponent,
    CreateEventComponent,
    DialogCreateEventComponent,
    EventListComponent,
    SuggestAndEventsComponent,
    EventListUsersComponent,
    ConferenceRoomComponent,
    CandidateProfilesComponent,
    CommentsSectionComponent,
    DialogSelectUserToExportComponent,
    SuggestConnectedComponent,
    DialogDeleteUsersComponent,
    AllUserListComponent,
    IntroductionsComponent,
    PendingIntroductionsComponent,
    DialogSelectUserComponent,
    UserListComponent,
    SortComponent,
    IntrosTabComponent,
    DialogInputTextMessageComponent,
    SuggestedPostJobsComponent,
    AppliedPostJobsComponent,
    DialogInputBigMessageComponent,
    DialogOnlyTextMessageComponent,
    DialogOnlyMessageComponent,
    SelectJobTitleComponent,
    SelectDesiredCompaniesComponent,
    DialogSelectButttonsComponent,
    IntrosToCompaniesComponent,
    TimelineCommentsComponent,
    TopUsersComponent,
    ConnectionRequestsComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    MediaComponent,
    TimeFormat,
    SafePipe,
    QuestionsComponent,
    AskbuttonComponent,
    RecruiterNavbarComponent,
    EmployerNavbarComponent,

    inArrayPipe,
    LimitPipe,
    SortPipe,
    InUserChatSearchPipe,
    SafePdfPipe,
    SearchPipe,

    SearchByNamePipe,
    SearchByExperiencePipe,
    TitleCasePipe,
    BiddingEventItemComponent,
    PdfViewerComponent,
    ResumeItemComponent,
    // ResumeListComponent,
    EditResumeComponent,
    BiddingEventsListComponent,
    ProfileComponent,
    NewResumeComponent,
    VideoInterviewRoomComponent,

    //
    BarChartComponent,
    LineChartComponent,
    PieChartComponent,
    ScatterChartComponent,
    SidebarComponent,
    // EditTagComponent

    VideoQuestionsComponent,
    FilterDataComponent,
    TagInputModule,
    AllRecruitersComponent,
    UserCalendarComponent,
    SharedCandidateProfilesComponent,
    // candidate
    CandidateNavbarComponent,
    ShareProfileSearchPipe,
    AllRecruiterSearchPipe,
    ReversePipe,
    //jobposting
    CreateBiddingEventComponent,
    CreateJobProfileComponent,
    JobProfileListComponent,
    EditJobProfileComponent,

    NgbModalModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MomentModule,
    SelectDropDownModule,
    MenusComponent,
    MobileNavTabComponent,
    ListLoaderComponent,
    ListLoaderSearchComponent,
    NoDataAvailableComponent,
    SerchBySkillsPipe,
    SerchByFullNamePipe,
    SearchByCTRPipe,
    SerchByJobTitlePipe,
    SearchByOnlyFullNamePipe,
    SortByIndustiresPipe,
    MatDialogModule,
    CloseScreenComponent,
    DialogImagePreviewComponent,
    CandidateSummaryComponent,
    SkillsAndIndustriesComponent,
    ProfileButtonsComponent,
    InterviewQuestionsComponent,
    MatTabsModule,
    MatCardModule,
    NgxMaterialTimepickerModule,
    SelectJobTitleComponent,
    SelectDesiredCompaniesComponent,
    MatExpansionModule
  ],

})
export class SharedComponentsModule { }
