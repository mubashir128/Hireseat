import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./_guards/auth.guard";
import { AuctionrulesComponent } from "./auctionrules/auctionrules.component";
import { ContactUsComponent } from "./contact-us/contact-us.component";
import { BiddingEventDetailsComponent } from "./bidding-event-details/bidding-event-details.component";
import { RecruiterFeedbackComponent } from "./recruiter/recruiter-feedback/recruiter-feedback.component";
import { EmailVerificationComponent } from "./email-verification/email-verification.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { ForgotPasswordResetComponent } from "./forgot-password-reset/forgot-password-reset.component";
import { FeedbackResumesComponent } from "./employer/feedback-resumes/feedback-resumes.component";

import { UploadResumeComponent } from "./resume-bank/upload-resume/upload-resume.component";
import { UserlistComponent } from "./admin/userlist/userlist.component";
import { SupperAdminGuard } from "./_guards/supper-admin.guard";
import { EmployerGuard } from "./_guards/employer.guard";
import { AdminGuard } from "./_guards/admin.guard";
import { AllBlogsComponent } from "./blog/frontend/all-blogs/all-blogs.component";
import { AllBlogCategoriesComponent } from "./blog/frontend/all-blog-categories/all-blog-categories.component";
import { SinglePageComponent } from "./blog/frontend/single-page/single-page.component";


import { AllBlogTagComponent } from "./blog/frontend/all-blog-tag/all-blog-tag.component";
import { JobpostComponent } from "./job-post/jobpost/jobpost.component";
import { EnterpriseGuard } from "./_guards/enterprise.guard";
import { VideoCallComponent } from './video-call/video-call.component';

import { AllPostComponent } from "./blog/all-post/all-post.component";
import { CreateImagePostComponent } from "./blog/create-image-post/create-image-post.component";
import { EditBlogComponent } from "./blog/edit-blog/edit-blog.component";
import { BlogMainComponent } from "./blog/blog-main/blog-main.component";
import { CreatePostComponent } from "./blog/create-post/create-post.component";
import { CreateCategoryComponent } from "./blog/create-category/create-category.component";
import { EditCategoryComponent } from "./blog/edit-blog/edit-category/edit-category.component";

import { MycandidatesComponent } from './employer/mycandidates/mycandidates.component';
import { DashboardComponent } from './employer/dashboard/dashboard.component';
import { EmployeerAnsComponent } from "./recruiter-brodcast/employeer-ans/employeer-ans.component";
import { JobProfileListComponent } from "./employer/job-profile-list/job-profile-list.component";
import { CreateJobProfileComponent } from "./employer/create-job-profile/create-job-profile.component";
import { CreateBiddingEventComponent } from "./employer/create-bidding-event/create-bidding-event.component";
import { RecruiterHomeComponent } from "./recruiter/recruiter-home/recruiter-home.component";
import { EditJobProfileComponent } from "./employer/edit-job-profile/edit-job-profile.component";
import { FeedbackListComponent } from "./employer/feedback-list/feedback-list.component";
import { EmployerHomeComponent } from "./employer/employer-home/employer-home.component";


import { BiddingEventsListComponent } from "./bidding-events-list/bidding-events-list.component";
import { ProfileComponent } from "./profile/profile.component";
import { NewResumeComponent } from './recruiter/new-resume/new-resume.component';
import { VideoInterviewRoomComponent } from './video-interview-room/video-interview-room.component';
import { RecruiterNavbarComponent } from "./recruiter/recruiter-navbar/recruiter-navbar.component";
import { ResumeListComponent } from "./recruiter/resume-list/resume-list.component";
import { WonBidsComponent } from "./recruiter/won-bids/won-bids.component";
import { SearchResumeComponent } from "./resume-bank/search-resume/search-resume.component";
import { RecruiterGuard } from "./_guards/recruiter.guard";
import { RecruiterQuestionComponent } from "./recruiter-brodcast/recruiter-question/recruiter-question.component";

const appRoutes: Routes = [
  { path: "forum", loadChildren: './view-forum/view-forum.module#ViewForumModule' },
  { path: "question-details/:id", loadChildren: './view-forum/answerlists/answerlists.module#AnswerlistsModule' },
  { path: "home", loadChildren: './home/home.module#HomeModule' },
  // {
  //   path: "video-call/:id",
  //   loadChildren: './video-call/video-call.module#VideoCallModule'
  // },
  {
    path: "shared-video/:token",
    loadChildren: './shared-video/shared-video.module#SharedVideoModule'
  },

  {
    path: "recruiter",
    loadChildren: './recruiter/recruiter.module#RecruiterModule',
    // component: RecruiterHomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "employer",
    loadChildren: './employer/employer.module#EmployerModule',
    canActivate: [AuthGuard]
  },
  {
    path: "register",
    loadChildren: './register/register.module#RegisterModule'
  },
  {
    path: "login",
    loadChildren: './login/login.module#LoginModule'
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
  { path: "", redirectTo: "home", pathMatch: "full" },

  { path: "upload-resume", component: UploadResumeComponent },
  { path: "job-post", component: JobpostComponent },

  { path: "user-list", component: UserlistComponent, canActivate: [AdminGuard] },
  {
    path: "video-call/:id",
    component: VideoCallComponent
  },

];

const appChildRoutes: Routes = [
  {
    path: "super-admin",
    loadChildren: './super-admin/super-admin.module#SuperAdminModule',
    canActivate: [SupperAdminGuard]
  },
  {
    path: "enterprise",
    loadChildren: './enterprise/enterprise.module#EnterpriseModule',
    canActivate: [EnterpriseGuard]
  },
  {
    path: "blog-posts",
    loadChildren: './blog/blog.module#BlogModule'
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
    path: "**",
    component: NotFoundComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes),
    RouterModule.forChild(appChildRoutes),
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
