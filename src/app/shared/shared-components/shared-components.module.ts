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
    MatDialogModule
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
    InterviewQuestionsComponent
  ],

})
export class SharedComponentsModule { }
