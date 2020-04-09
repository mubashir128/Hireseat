import { BrowserModule } from "@angular/platform-browser";
import { TagInputModule } from "ngx-chips";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { RouterModule, Routes, ParamMap } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxPaginationModule } from "ngx-pagination";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { AuthenticationService } from "./_services/authentication.service";
import { UserService } from "./_services/user.service";
import { AuthGuard } from "./_guards/auth.guard";
import { JwtInterceptor } from "./_helpers/jwt.interceptor";
import { ErrorInterceptor } from "./_helpers/error.interceptor";
import { NavbarComponent } from "./navbar/navbar.component";
import { FooterComponent } from "./footer/footer.component";
import { EmployerHomeComponent } from "./employer/employer-home/employer-home.component";
import { EmployerNavbarComponent } from "./employer/employer-navbar/employer-navbar.component";
import { AuctionrulesComponent } from "./auctionrules/auctionrules.component";
import { ContactUsComponent } from "./contact-us/contact-us.component";
import { ProfileComponent } from "./profile/profile.component";
import { JobProfileListComponent } from "./employer/job-profile-list/job-profile-list.component";
import { CreateJobProfileComponent } from "./employer/create-job-profile/create-job-profile.component";
import { BiddingEventsListComponent } from "./bidding-events-list/bidding-events-list.component";
import { CreateBiddingEventComponent } from "./employer/create-bidding-event/create-bidding-event.component";
import { RecruiterHomeComponent } from "./recruiter/recruiter-home/recruiter-home.component";
import { RecruiterNavbarComponent } from "./recruiter/recruiter-navbar/recruiter-navbar.component";
import { EditJobProfileComponent } from "./employer/edit-job-profile/edit-job-profile.component";
import { BiddingEventDetailsComponent } from "./bidding-event-details/bidding-event-details.component";
import { BiddingInfoComponent } from "./bidding-info/bidding-info.component";
import { ResumeListComponent } from "./recruiter/resume-list/resume-list.component";
import { NewResumeComponent } from "./recruiter/new-resume/new-resume.component";
import { ResumeItemComponent } from "./recruiter/resume-item/resume-item.component";
import { PdfViewerComponent } from "./recruiter/pdf-viewer/pdf-viewer.component";
import { EditResumeComponent } from "./recruiter/edit-resume/edit-resume.component";
import { BiddingEventItemComponent } from "./bidding-event-item/bidding-event-item.component";
import { BidHighlightsComponent } from "./bid-highlights/bid-highlights.component";
import { BiddingResumesComponent } from "./bidding-resumes/bidding-resumes.component";
import { MyBidsComponent } from "./recruiter/my-bids/my-bids.component";
import { JobProfileDetailsComponent } from "./job-profile-details/job-profile-details.component";
import { WonBidsComponent } from "./recruiter/won-bids/won-bids.component";
import { RecruiterFeedbackComponent } from "./recruiter/recruiter-feedback/recruiter-feedback.component";
import { EmailVerificationComponent } from "./email-verification/email-verification.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { ForgotPasswordResetComponent } from "./forgot-password-reset/forgot-password-reset.component";
import { FeedbackListComponent } from "./employer/feedback-list/feedback-list.component";
import { FeedbackResumesComponent } from "./employer/feedback-resumes/feedback-resumes.component";
import { NgxCurrencyModule } from "ngx-currency";
import { RecruterBiddingInfoComponent } from "./recruter-bidding-info/recruter-bidding-info.component";
import { BiddingInterviewInfoComponent } from "./bidding-interview-info/bidding-interview-info.component";
import { RecruiterBiddingInterviewInfoComponent } from "./recruiter-bidding-interview-info/recruiter-bidding-interview-info.component";
import { BiddingHiredInfoComponent } from "./bidding-hired-info/bidding-hired-info.component";
import { RecruiterBiddingHiredInfoComponent } from "./recruiter-bidding-hired-info/recruiter-bidding-hired-info.component";
import { NgxMaskModule } from "ngx-mask";
import { JobProfileInfoComponent } from "./job-profile-info/job-profile-info.component";
import { UploadResumeComponent } from "./resume-bank/upload-resume/upload-resume.component";
import { SearchResumeComponent } from "./resume-bank/search-resume/search-resume.component";
import { UserlistComponent } from "./admin/userlist/userlist.component";
import { CKEditorModule } from "ng2-ckeditor";
import { SADashboardComponent } from "./super-admin/sa-dashboard/sa-dashboard.component";
import { SAUserListComponent } from "./super-admin/sa-user-list/sa-user-list.component";
import { SANavbarComponent } from "./super-admin/sa-navbar/sa-navbar.component";
import { SupperAdminGuard } from "./_guards/supper-admin.guard";
import { EmployerGuard } from "./_guards/employer.guard";
import { RecruiterGuard } from "./_guards/recruiter.guard";
import { AdminGuard } from "./_guards/admin.guard";
import { ViewForumComponent } from "./view-forum/view-forum.component";
import { MediaComponent } from "./media/media.component";
import { QuestionsComponent } from "./view-forum/questions/questions.component";
import { SearchFilterPipe } from "./view-forum/search-filter.pipe";
import { AskbuttonComponent } from "./view-forum/askbutton/askbutton.component";
import { AnswerlistsComponent } from "./view-forum/answerlists/answerlists.component";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { BlogMainComponent } from "./blog/blog-main/blog-main.component";
import { BlogMaiComponent } from "./blog/blog-mai/blog-mai.component";
import { CreatePostComponent } from "./blog/create-post/create-post.component";
import { BlogNavComponent } from "./blog/blog-nav/blog-nav.component";
import { EditorModule } from "@tinymce/tinymce-angular";
import { CreateCategoryComponent } from "./blog/create-category/create-category.component";
//import { AllPostComponent } from './all-post/all-post.component';
import { EditCategoryComponent } from "./blog/edit-blog/edit-category/edit-category.component";
import { AllBlogsComponent } from "./blog/frontend/all-blogs/all-blogs.component";
import { AllBlogCategoriesComponent } from "./blog/frontend/all-blog-categories/all-blog-categories.component";
import { SinglePageComponent } from "./blog/frontend/single-page/single-page.component";
import { AllPostComponent } from "./blog/all-post/all-post.component";
import { SidebarComponent } from "./admin/sidebar/sidebar.component";
import { CreateImagePostComponent } from "./blog/create-image-post/create-image-post.component";
import { EditBlogComponent } from "./blog/edit-blog/edit-blog.component";
import { EditTagComponent } from "./blog/edit-blog/edit-tag/edit-tag.component";
import { SocialShareComponent } from "src/app/blog/frontend/single-page/social-share/social-share.component";
import { CeiboShare } from "ng2-social-share";
import { NgxTwitterTimelineModule } from "ngx-twitter-timeline";
import { AllBlogTagComponent } from "./blog/frontend/all-blog-tag/all-blog-tag.component";

// import { CKEditorModule } from 'ngx-ckeditor';
// import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { Ng2CompleterModule } from "ng2-completer";
import { Angular2CsvModule } from "angular2-csv";
import { TimeFormat } from "./home/pipe";
import { RecruiterComponent } from "./recruiter-cost/recruiter/recruiter.component";
import { RecruiterQuestionComponent } from "./recruiter-brodcast/recruiter-question/recruiter-question.component";
import { JobpostComponent } from "./job-post/jobpost/jobpost.component";
import { EmployeerAnsComponent } from "./recruiter-brodcast/employeer-ans/employeer-ans.component";

import { NgHighlightModule } from "ngx-text-highlight";
import { SelectDropDownModule } from "ngx-select-dropdown";
import { inArrayPipe } from "./recruter-bidding-info/inArrayPipe";
import { LimitPipe } from "./../charlimit";
import { SafePipe } from "./blog/frontend/safepipe";
import { SortPipe } from "./shared/pipes/sort.pipe";
import { SafePdfPipe } from "./shared/pipes/safe-pdf.pipe";
import { CreateAdminComponent } from "./super-admin/create-admin/create-admin.component";
import { CreateEnterpriseComponent } from "./super-admin/create-enterprise/create-enterprise.component";
import { DashboardComponent } from './employer/dashboard/dashboard.component';
import { BarChartComponent } from './shared/pipes/chart/bar-chart/bar-chart.component';
import { LineChartComponent } from './shared/pipes/chart/line-chart/line-chart.component';
import { PieChartComponent } from './shared/pipes/chart/pie-chart/pie-chart.component';
import { ScatterChartComponent } from './shared/pipes/chart/scatter-chart/scatter-chart.component';
import { VideoInterviewRoomComponent } from './video-interview-room/video-interview-room.component';
import { VideoCallComponent } from './video-call/video-call.component';
import { SearchByNamePipe } from '../search-by-name.pipe';
import { SearchByExperiencePipe } from '../search-by-experience.pipe';

const appRoutes: Routes = [
  { path: "forum", component: ViewForumComponent },

  { path: "question-details/:id", component: AnswerlistsComponent },

  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  {
    path: "employer",
    component: EmployerHomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "recruiter",
    component: RecruiterHomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "bidding-events/details/:key",
    component: BiddingEventDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "event/feedback/candidate/resumes/:key",
    component: RecruiterFeedbackComponent
  },
  {
    path: "user/email/verification/check/:key",
    component: EmailVerificationComponent
  },
  {
    path: "user/forgot/password/check/hireseat/:key",
    component: ForgotPasswordResetComponent
  },
  { path: "employer/feedback/:key", component: FeedbackResumesComponent },
  { path: "rules", component: AuctionrulesComponent },
  { path: "contact-us", component: ContactUsComponent },
  { path: "Forgot-Password", component: ForgotPasswordComponent },
  { path: "home", component: HomeComponent },
  { path: "home/:id", component: HomeComponent },
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "upload-resume", component: UploadResumeComponent },
  { path: "job-post", component: JobpostComponent },

  { path: "user-list", component: UserlistComponent, canActivate: [AdminGuard] },
  {
    path: "video-call",
    component: VideoCallComponent
  }
];

const appChildRoutes: Routes = [
  {
    path: "employer",
    component: EmployerHomeComponent,
    children: [
      {
        path: "profile",
        component: ProfileComponent
      },
      {
        path: "job-profile-list",
        component: JobProfileListComponent
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
        component: DashboardComponent
      },
      {
        path: "video-interview-room",
        component: VideoInterviewRoomComponent
      }
    ],
    canActivate: [EmployerGuard]
  },
  {
    path: "blog-posts",
    component: BlogMainComponent,
    children: [
      {
        path: "create-post",
        component: CreatePostComponent
      },
      {
        path: "edit-post/:blogID",
        component: EditBlogComponent
      },
      {
        path: "create-image-post",
        component: CreateImagePostComponent
      },
      {
        path: "all-post",
        component: AllPostComponent
      },
      {
        path: "create-categories",
        component: CreateCategoryComponent
      },
      {
        path: "edit-categories",
        component: EditCategoryComponent
      }
    ],
    canActivate: [AdminGuard]
  },
  {
    path: "blog",
    component: AllBlogsComponent
  },
  {
    path: "blog/categories/:url",
    component: AllBlogCategoriesComponent
  },
  {
    path: "blog/tags/:url",
    component: AllBlogTagComponent
  },
  {
    path: "blog/:url",
    component: SinglePageComponent
  },
  {
    path: "blog/:url",
    component: SinglePageComponent
  },

  {
    path: "recruiter",
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
        component: ResumeListComponent
      },
      {
        path: "new-resume",
        component: NewResumeComponent
      },
      {
        path: "won-bids",
        component: WonBidsComponent
      },
      {
        path: "search-resume",
        component: SearchResumeComponent
      },
      {
        path: "video-interview-room",
        component: VideoInterviewRoomComponent
      },


    ],
    canActivate: [RecruiterGuard]
  },
  {
    path: "super-admin",
    component: SADashboardComponent,
    children: [
      {
        path: "user-list",
        component: SAUserListComponent
      },
      {
        path: "create-admin",
        component: CreateAdminComponent
      },
      {
        path: "create-enterprise",
        component: CreateEnterpriseComponent
      }
    ],
    canActivate: [SupperAdminGuard]
  },
  {
    path: "**",
    component: NotFoundComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    TimeFormat,
    SafePipe,
    LimitPipe,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    EmployerHomeComponent,
    EmployerNavbarComponent,
    AuctionrulesComponent,
    ContactUsComponent,
    ProfileComponent,
    JobProfileListComponent,
    CreateJobProfileComponent,
    BiddingEventsListComponent,
    CreateBiddingEventComponent,
    RecruiterHomeComponent,
    RecruiterNavbarComponent,
    EditJobProfileComponent,
    BiddingEventDetailsComponent,
    BiddingInfoComponent,
    ResumeListComponent,
    NewResumeComponent,
    ResumeItemComponent,
    PdfViewerComponent,
    EditResumeComponent,
    BiddingEventItemComponent,
    BidHighlightsComponent,
    BiddingResumesComponent,
    MyBidsComponent,
    JobProfileDetailsComponent,
    WonBidsComponent,
    RecruiterFeedbackComponent,
    EmailVerificationComponent,
    NotFoundComponent,
    ForgotPasswordComponent,
    ForgotPasswordResetComponent,
    FeedbackListComponent,
    FeedbackResumesComponent,
    RecruterBiddingInfoComponent,
    BiddingInterviewInfoComponent,
    RecruiterBiddingInterviewInfoComponent,
    BiddingHiredInfoComponent,
    RecruiterBiddingHiredInfoComponent,
    JobProfileInfoComponent,
    UploadResumeComponent,
    SearchResumeComponent,
    UserlistComponent,
    SADashboardComponent,
    SAUserListComponent,
    SANavbarComponent,
    ViewForumComponent,
    MediaComponent,
    QuestionsComponent,
    SearchFilterPipe,
    AskbuttonComponent,
    AnswerlistsComponent,
    BlogMainComponent,
    BlogMaiComponent,
    CreatePostComponent,
    BlogNavComponent,
    CreateCategoryComponent,
    AllPostComponent,
    EditCategoryComponent,
    AllBlogsComponent,
    AllBlogCategoriesComponent,
    SinglePageComponent,
    SidebarComponent,
    CreateImagePostComponent,
    EditBlogComponent,
    EditTagComponent,
    SocialShareComponent,
    CeiboShare,
    AllBlogTagComponent,
    RecruiterComponent,

    RecruiterQuestionComponent,
    JobpostComponent,
    EmployeerAnsComponent,
    inArrayPipe,
    SortPipe,
    SafePdfPipe,
    CreateAdminComponent,
    CreateEnterpriseComponent,
    DashboardComponent,
    BarChartComponent,
    LineChartComponent,
    PieChartComponent,
    ScatterChartComponent,
    VideoInterviewRoomComponent,
    VideoCallComponent,
    SearchByNamePipe,
    SearchByExperiencePipe
  ],
  imports: [
    InfiniteScrollModule,
    EditorModule,
    TagInputModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    NgxCurrencyModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    RouterModule.forRoot(appRoutes),
    RouterModule.forChild(appChildRoutes),
    NgxMaskModule.forRoot(),
    Angular2CsvModule,

    CKEditorModule,
    NgxTwitterTimelineModule,
    Ng2CompleterModule,
    SelectDropDownModule,
    NgHighlightModule
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
