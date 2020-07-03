import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { AuthenticationService } from "./_services/authentication.service";
import { UserService } from "./_services/user.service";
import { AuthGuard } from "./_guards/auth.guard";
import { JwtInterceptor } from "./_helpers/jwt.interceptor";
import { ErrorInterceptor } from "./_helpers/error.interceptor";
import { AuctionrulesComponent } from "./auctionrules/auctionrules.component";
import { ContactUsComponent } from "./contact-us/contact-us.component";

import { BiddingEventDetailsComponent } from "./bidding-event-details/bidding-event-details.component";
import { BiddingInfoComponent } from "./bidding-info/bidding-info.component";
import { BidHighlightsComponent } from "./bid-highlights/bid-highlights.component";
import { BiddingResumesComponent } from "./bidding-resumes/bidding-resumes.component";
import { MyBidsComponent } from "./recruiter/my-bids/my-bids.component";
import { JobProfileDetailsComponent } from "./job-profile-details/job-profile-details.component";
import { RecruiterFeedbackComponent } from "./recruiter/recruiter-feedback/recruiter-feedback.component";
import { EmailVerificationComponent } from "./email-verification/email-verification.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { ForgotPasswordResetComponent } from "./forgot-password-reset/forgot-password-reset.component";
import { FeedbackResumesComponent } from "./employer/feedback-resumes/feedback-resumes.component";
import { RecruterBiddingInfoComponent } from "./recruter-bidding-info/recruter-bidding-info.component";
import { BiddingInterviewInfoComponent } from "./bidding-interview-info/bidding-interview-info.component";
import { RecruiterBiddingInterviewInfoComponent } from "./recruiter-bidding-interview-info/recruiter-bidding-interview-info.component";
import { BiddingHiredInfoComponent } from "./bidding-hired-info/bidding-hired-info.component";
import { RecruiterBiddingHiredInfoComponent } from "./recruiter-bidding-hired-info/recruiter-bidding-hired-info.component";
import { JobProfileInfoComponent } from "./job-profile-info/job-profile-info.component";
import { UploadResumeComponent } from "./resume-bank/upload-resume/upload-resume.component";
import { UserlistComponent } from "./admin/userlist/userlist.component";
import { CKEditorModule } from "ng2-ckeditor";
import { BlogMaiComponent } from "./blog/blog-mai/blog-mai.component";
import { BlogNavComponent } from "./blog/blog-nav/blog-nav.component";
import { EditorModule } from "@tinymce/tinymce-angular";

import { AllBlogsComponent } from "./blog/frontend/all-blogs/all-blogs.component";
import { AllBlogCategoriesComponent } from "./blog/frontend/all-blog-categories/all-blog-categories.component";
import { SinglePageComponent } from "./blog/frontend/single-page/single-page.component";
// import { SidebarComponent } from "./admin/sidebar/sidebar.component";
// import { EditTagComponent } from "./blog/edit-blog/edit-tag/edit-tag.component";
import { SocialShareComponent } from "src/app/blog/frontend/single-page/social-share/social-share.component";
import { AllBlogTagComponent } from "./blog/frontend/all-blog-tag/all-blog-tag.component";
import { Ng2CompleterModule } from "ng2-completer";
import { Angular2CsvModule } from "angular2-csv";
import { RecruiterComponent } from "./recruiter-cost/recruiter/recruiter.component";
import { JobpostComponent } from "./job-post/jobpost/jobpost.component";
import { OpentokService } from './_services/opentok.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { SharedComponentsModule } from './shared/shared-components/shared-components.module';
import { VideoCallComponent } from './video-call/video-call.component';
import { PublisherComponent } from './publisher/publisher.component';
import { SubscriberComponent } from './subscriber/subscriber.component';
import { TagInputModule } from "ngx-chips";
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxPaginationModule } from "ngx-pagination";
import { NgxCurrencyModule } from "ngx-currency";
import { NgxMaskModule } from "ngx-mask";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { NgxTwitterTimelineModule } from "ngx-twitter-timeline";
import { NgHighlightModule } from "ngx-text-highlight";
import { SelectDropDownModule } from "ngx-select-dropdown";

// import { SearchByNamePipe } from '../search-by-name.pipe';
// import { SearchByExperiencePipe } from '../search-by-experience.pipe';
// import { EmployerHomeComponent } from "./employer/employer-home/employer-home.component";
// import { FeedbackListComponent } from "./employer/feedback-list/feedback-list.component";
// import { VideoInterviewRoomComponent } from './video-interview-room/video-interview-room.component';
// import { MycandidatesComponent } from './employer/mycandidates/mycandidates.component';


// import { RecruiterNavbarComponent } from "./recruiter/recruiter-navbar/recruiter-navbar.component";
// import { ResumeListComponent } from "./recruiter/resume-list/resume-list.component";
// import { WonBidsComponent } from "./recruiter/won-bids/won-bids.component";
// import { SearchResumeComponent } from "./resume-bank/search-resume/search-resume.component";
// import { RecruiterQuestionComponent } from "./recruiter-brodcast/recruiter-question/recruiter-question.component";


// import { EmployeerAnsComponent } from "./recruiter-brodcast/employeer-ans/employeer-ans.component";
// import { inArrayPipe } from "./recruter-bidding-info/inArrayPipe";
// import { LimitPipe } from "./../charlimit";
// import { SortPipe } from "./shared/pipes/sort.pipe";
// import { SafePdfPipe } from "./shared/pipes/safe-pdf.pipe";
// import { SearchPipe } from '../search.pipe';
// import { DashboardComponent } from './employer/dashboard/dashboard.component';
// import { BarChartComponent } from './shared/pipes/chart/bar-chart/bar-chart.component';
// import { LineChartComponent } from './shared/pipes/chart/line-chart/line-chart.component';
// import { PieChartComponent } from './shared/pipes/chart/pie-chart/pie-chart.component';
// import { ScatterChartComponent } from './shared/pipes/chart/scatter-chart/scatter-chart.component';


// import { JobProfileListComponent } from "./employer/job-profile-list/job-profile-list.component";
// import { CreateJobProfileComponent } from "./employer/create-job-profile/create-job-profile.component";
// import { CreateBiddingEventComponent } from "./employer/create-bidding-event/create-bidding-event.component";
// import { EditJobProfileComponent } from "./employer/edit-job-profile/edit-job-profile.component";
// import { NewResumeComponent } from './recruiter/new-resume/new-resume.component';
// import { ResumeItemComponent } from "./recruiter/resume-item/resume-item.component";
// import { PdfViewerComponent } from "./recruiter/pdf-viewer/pdf-viewer.component";
// import { EditResumeComponent } from "./recruiter/edit-resume/edit-resume.component";
// import { BiddingEventItemComponent } from "./bidding-event-item/bidding-event-item.component";
// import { EmployerNavbarComponent } from "./employer/employer-navbar/employer-navbar.component";
// import { ProfileComponent } from "./profile/profile.component";
// import { BiddingEventsListComponent } from "./bidding-events-list/bidding-events-list.component";
// import { RecruiterHomeComponent } from "./recruiter/recruiter-home/recruiter-home.component";


// import { BlogMainComponent } from "./blog/blog-main/blog-main.component";
// import { CreatePostComponent } from "./blog/create-post/create-post.component";
// import { CreateCategoryComponent } from "./blog/create-category/create-category.component";
// import { EditCategoryComponent } from "./blog/edit-blog/edit-category/edit-category.component";
// import { AllPostComponent } from "./blog/all-post/all-post.component";
// import { CreateImagePostComponent } from "./blog/create-image-post/create-image-post.component";
// import { EditBlogComponent } from "./blog/edit-blog/edit-blog.component";

@NgModule({
  imports: [
    AppRoutingModule,
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
    NgxMaskModule.forRoot(),
    Angular2CsvModule,
    CKEditorModule,
    NgxTwitterTimelineModule,
    Ng2CompleterModule,
    SelectDropDownModule,
    NgHighlightModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    SharedComponentsModule,
    // BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    // EmployerNavbarComponent,
    AuctionrulesComponent,
    ContactUsComponent,
    // RecruiterNavbarComponent,
    BiddingEventDetailsComponent,
    BiddingInfoComponent,
    BidHighlightsComponent,
    BiddingResumesComponent,
    MyBidsComponent,
    JobProfileDetailsComponent,
    // RecruiterHomeComponent,
    // BiddingEventItemComponent,
    // VideoInterviewRoomComponent,
    // ResumeItemComponent,
    // NewResumeComponent,
    // ProfileComponent,
    // BiddingEventsListComponent,
    // PdfViewerComponent,
    // EditResumeComponent,
    // ResumeListComponent,
    // WonBidsComponent,
    // RecruiterQuestionComponent,
    // SearchResumeComponent,
    RecruiterFeedbackComponent,
    EmailVerificationComponent,
    NotFoundComponent,
    ForgotPasswordComponent,
    ForgotPasswordResetComponent,
    FeedbackResumesComponent,
    RecruterBiddingInfoComponent,
    BiddingInterviewInfoComponent,
    RecruiterBiddingInterviewInfoComponent,
    BiddingHiredInfoComponent,
    RecruiterBiddingHiredInfoComponent,
    JobProfileInfoComponent,
    UploadResumeComponent,
    UserlistComponent,
    BlogMaiComponent,
    BlogNavComponent,
    // BlogMainComponent,
    // CreatePostComponent,
    // CreateCategoryComponent,
    // AllPostComponent,
    // EditCategoryComponent,
    // CreateImagePostComponent,
    // EditBlogComponent,

    // SidebarComponent,

    // EditTagComponent,

    AllBlogsComponent,
    AllBlogCategoriesComponent,
    SinglePageComponent,
    SocialShareComponent,
    AllBlogTagComponent,
    RecruiterComponent,

    JobpostComponent,
    // inArrayPipe,
    // SortPipe,
    // SafePdfPipe,
    // SearchPipe,
    // LimitPipe,
    // BarChartComponent,
    // LineChartComponent,
    // PieChartComponent,
    // ScatterChartComponent,
    // SearchByNamePipe,
    // SearchByExperiencePipe,
    VideoCallComponent,
    PublisherComponent,
    SubscriberComponent,
    // EmployerHomeComponent,
    // JobProfileListComponent,
    // CreateJobProfileComponent,
    // CreateBiddingEventComponent,
    // EditJobProfileComponent,
    // FeedbackListComponent,
    // EmployeerAnsComponent,
    // DashboardComponent,
    // MycandidatesComponent,

  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    UserService,
    OpentokService,
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
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
