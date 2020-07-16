import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthGuard } from "./_guards/auth.guard";
import { NotFoundComponent } from "./not-found/not-found.component";
import { SupperAdminGuard } from "./_guards/supper-admin.guard";
import { AdminGuard } from "./_guards/admin.guard";
import { EnterpriseGuard } from "./_guards/enterprise.guard";
import { VideoCallComponent } from './video-call/video-call.component';

import { RecruiterFeedbackComponent } from "./recruiter/recruiter-feedback/recruiter-feedback.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { ForgotPasswordResetComponent } from "./forgot-password-reset/forgot-password-reset.component";
import { FeedbackResumesComponent } from "./employer/feedback-resumes/feedback-resumes.component";

import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { AuctionrulesComponent } from "./auctionrules/auctionrules.component";
import { ContactUsComponent } from "./contact-us/contact-us.component";
import { BiddingEventDetailsComponent } from "./bidding-event-details/bidding-event-details.component";
import { EmailVerificationComponent } from "./email-verification/email-verification.component";
import { UploadResumeComponent } from "./resume-bank/upload-resume/upload-resume.component";
import { UserlistComponent } from "./admin/userlist/userlist.component";
import { AllBlogsComponent } from "./blog/frontend/all-blogs/all-blogs.component";
import { EmployerGuard } from "./_guards/employer.guard";
import { SinglePageComponent } from "./blog/frontend/single-page/single-page.component";

import { AllBlogCategoriesComponent } from "./blog/frontend/all-blog-categories/all-blog-categories.component";
import { AllBlogTagComponent } from "./blog/frontend/all-blog-tag/all-blog-tag.component";

import { JobpostComponent } from "./job-post/jobpost/jobpost.component";

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
  { path: "", redirectTo: "home", pathMatch: "full" },

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
  // 14july
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
    loadChildren: './bidding-event-details/bidding-event-details.module#BiddingEventDetailsModule',
    canActivate: [AuthGuard]
  },
  {
    path: "event/feedback/candidate/resumes/:key",
    loadChildren: './recruiter/recruiter-feedback/recruiter-feedback.module#RecruiterFeedbackModule'
  },
  {
    path: "user/email/verification/check/:key",
    loadChildren: './email-verification/email-verification.module#EmailVerificationModule'
  },
  {
    path: "user/forgot/password/check/hireseat/:key",
    loadChildren: './forgot-password-reset/forgot-password-reset.module#ForgotPasswordResetModule'
  },
  {
    path: "employer/feedback/:key",
    loadChildren: './employer/feedback-resumes/feedback-resumes.module#FeedbackResumesModule'
  },
  {
    path: "rules",
    loadChildren: './auctionrules/auctionrules.module#AuctionrulesModule'
  },
  {
    path: "contact-us",
    loadChildren: './contact-us/contact-us.module#ContactUsModule'
  },
  {
    path: "Forgot-Password",
    loadChildren: './forgot-password/forgot-password.module#ForgotPasswordModule'
  },

  {
    path: "upload-resume",
    loadChildren: './resume-bank/upload-resume/upload-resume.module#UploadResumeModule'
  },
  {
    path: "job-post",
    loadChildren: './job-post/job-post.module#JobPostModule'
  },

  {
    path: "user-list",
    loadChildren: './admin/userlist/userlist.module#UserlistModule',
    canActivate: [AdminGuard]
  },
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
    loadChildren: './blog/all-post/all-post.module#AllPostModule'
  },
  {
    path: "blog/categories/:url",
    loadChildren: './blog/frontend/all-blog-categories/all-blog-categories.module#AllBlogCategoriesModule'
  },
  {
    path: "blog/tags/:url",
    loadChildren: './blog/frontend/all-blog-tag/all-blog-tag.module#AllBlogTagModule'
  },
  {
    path: "blog/:url",
    loadChildren: './blog/frontend/single-page/single-page.module#SinglePageModule'
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
