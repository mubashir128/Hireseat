import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./_guards/auth.guard";
import { EmployerHomeComponent } from "./employer/employer-home/employer-home.component";
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
import { ResumeListComponent } from "./recruiter/resume-list/resume-list.component";
import { NewResumeComponent } from './recruiter/new-resume/new-resume.component';
import { WonBidsComponent } from "./recruiter/won-bids/won-bids.component";
import { RecruiterFeedbackComponent } from "./recruiter/recruiter-feedback/recruiter-feedback.component";
import { EmailVerificationComponent } from "./email-verification/email-verification.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { ForgotPasswordResetComponent } from "./forgot-password-reset/forgot-password-reset.component";
import { FeedbackListComponent } from "./employer/feedback-list/feedback-list.component";
import { FeedbackResumesComponent } from "./employer/feedback-resumes/feedback-resumes.component";

import { UploadResumeComponent } from "./resume-bank/upload-resume/upload-resume.component";
import { SearchResumeComponent } from "./resume-bank/search-resume/search-resume.component";
import { UserlistComponent } from "./admin/userlist/userlist.component";
import { SADashboardComponent } from "./super-admin/sa-dashboard/sa-dashboard.component";
import { SAUserListComponent } from "./super-admin/sa-user-list/sa-user-list.component";
import { SupperAdminGuard } from "./_guards/supper-admin.guard";
import { EmployerGuard } from "./_guards/employer.guard";
import { RecruiterGuard } from "./_guards/recruiter.guard";
import { AdminGuard } from "./_guards/admin.guard";
import { BlogMainComponent } from "./blog/blog-main/blog-main.component";
import { CreatePostComponent } from "./blog/create-post/create-post.component";
import { CreateCategoryComponent } from "./blog/create-category/create-category.component";
import { EditCategoryComponent } from "./blog/edit-blog/edit-category/edit-category.component";
import { AllBlogsComponent } from "./blog/frontend/all-blogs/all-blogs.component";
import { AllBlogCategoriesComponent } from "./blog/frontend/all-blog-categories/all-blog-categories.component";
import { SinglePageComponent } from "./blog/frontend/single-page/single-page.component";
import { AllPostComponent } from "./blog/all-post/all-post.component";
import { CreateImagePostComponent } from "./blog/create-image-post/create-image-post.component";
import { EditBlogComponent } from "./blog/edit-blog/edit-blog.component";
import { AllBlogTagComponent } from "./blog/frontend/all-blog-tag/all-blog-tag.component";
import { RecruiterQuestionComponent } from "./recruiter-brodcast/recruiter-question/recruiter-question.component";
import { JobpostComponent } from "./job-post/jobpost/jobpost.component";
import { EmployeerAnsComponent } from "./recruiter-brodcast/employeer-ans/employeer-ans.component";

import { CreateAdminComponent } from "./super-admin/create-admin/create-admin.component";
import { CreateEnterpriseComponent } from "./super-admin/create-enterprise/create-enterprise.component";
import { EnterpriseDashboardComponent } from "./enterprise/enterprise-dashboard/enterprise-dashboard.component";
import { EnterpriseUserListComponent } from "./enterprise/enterprise-user-list/enterprise-user-list.component";
import { CreateEmployerComponent } from "./enterprise/create-employer/create-employer.component";
import { EnterpriseGuard } from "./_guards/enterprise.guard";
import { DashboardComponent } from './employer/dashboard/dashboard.component';
import { VideoInterviewRoomComponent } from './video-interview-room/video-interview-room.component';
// import { VideoCallComponent } from './video-call/video-call.component';
import { MycandidatesComponent } from './employer/mycandidates/mycandidates.component';
const appRoutes: Routes = [
  // { path: "forum", component: ViewForumComponent },
  { path: "forum", loadChildren: './view-forum/view-forum.module#ViewForumModule' },
  { path: "question-details/:id", loadChildren: './view-forum/answerlists/answerlists.module#AnswerlistsModule' },
  { path: "home", loadChildren: './home/home.module#HomeModule' },
  {
    path: "video-call/:id",
    loadChildren: './video-call/video-call.module#VideoCallModule'
  },

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
  { path: "", redirectTo: "home", pathMatch: "full" },

  { path: "upload-resume", component: UploadResumeComponent },
  { path: "job-post", component: JobpostComponent },

  { path: "user-list", component: UserlistComponent, canActivate: [AdminGuard] },
  // {
  //   path: "video-call/:id",
  //   component: VideoCallComponent
  // },
  {
    path: "shared-video/:token",
    loadChildren: './shared-video/shared-video.module#SharedVideoModule'
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
      },
      {
        path: "mycandidates",
        component: MycandidatesComponent
      },
      {
        path: "new-resume",
        component: NewResumeComponent
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
  // {
  //   path: "enterprise",
  //   component: EnterpriseDashboardComponent,
  //   children: [
  //     {
  //       path: "user-list",
  //       component: EnterpriseUserListComponent
  //     },
  //     {
  //       path: "create-employer",
  //       component: CreateEmployerComponent
  //     }
  //   ],
  //   canActivate: [EnterpriseGuard]
  // },
  {
    path: "enterprise",
    loadChildren: './enterprise/enterprise.module#EnterpriseModule',
    canLoad: [EnterpriseGuard]
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
