import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthGuard } from "./_guards/auth.guard";
import { NotFoundComponent } from "./not-found/not-found.component";
import { SupperAdminGuard } from "./_guards/supper-admin.guard";
import { AdminGuard } from "./_guards/admin.guard";
import { EnterpriseGuard } from "./_guards/enterprise.guard";
const appRoutes: Routes = [
  { path: "forum", loadChildren: () => import('./view-forum/view-forum.module').then(m => m.ViewForumModule) },
  { path: "question-details/:id", loadChildren: () => import('./view-forum/answerlists/answerlists.module').then(m => m.AnswerlistsModule) },
  { path: "", redirectTo: "home", pathMatch: "full" },

  { path: "home", loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  {
    path: "video-call/:id",
    loadChildren: () => import('./video-call/video-call.module').then(m => m.VideoCallModule)
  },
  {
    path: "shared-video/:token",
    loadChildren: () => import('./shared-video/shared-video.module').then(m => m.SharedVideoModule)
  },
  {
    path: "candidate",
    loadChildren: () => import('./candidate/candidate.module').then(m => m.CandidateModule)
  },
  {
    path: "recruiter",
    loadChildren: () => import('./recruiter/recruiter.module').then(m => m.RecruiterModule),
    // component: RecruiterHomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "employer",
    loadChildren: () => import('./employer/employer.module').then(m => m.EmployerModule),
    canActivate: [AuthGuard]
  },
  // 14july
  {
    path: "register",
    loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)
  },
  {
    path: "login",
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: "bidding-events/details/:key",
    loadChildren: () => import('./bidding-event-details/bidding-event-details.module').then(m => m.BiddingEventDetailsModule),
    // canActivate: [AuthGuard]
  },
  {
    path: "event/feedback/candidate/resumes/:key",
    loadChildren: () => import('./recruiter/recruiter-feedback/recruiter-feedback.module').then(m => m.RecruiterFeedbackModule)
  },
  {
    path: "user/email/verification/check/:key",
    loadChildren: () => import('./email-verification/email-verification.module').then(m => m.EmailVerificationModule)
  },
  {
    path: "user/forgot/password/check/hireseat/:key",
    loadChildren: () => import('./forgot-password-reset/forgot-password-reset.module').then(m => m.ForgotPasswordResetModule)
  },
  {
    path: "employer/feedback/:key",
    loadChildren: () => import('./employer/feedback-resumes/feedback-resumes.module').then(m => m.FeedbackResumesModule)
  },
  {
    path: "rules",
    loadChildren: () => import('./auctionrules/auctionrules.module').then(m => m.AuctionrulesModule)
  },
  {
    path: "contact-us",
    loadChildren: () => import('./contact-us/contact-us.module').then(m => m.ContactUsModule)
  },
  {
    path: "Forgot-Password",
    loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)
  },

  {
    path: "upload-resume",
    loadChildren: () => import('./resume-bank/upload-resume/upload-resume.module').then(m => m.UploadResumeModule)
  },
  {
    path: "job-post",
    loadChildren: () => import('./job-post/job-post.module').then(m => m.JobPostModule)
  },

  {
    path: "user-list",
    loadChildren: () => import('./admin/userlist/userlist.module').then(m => m.UserlistModule),
    canActivate: [AdminGuard]
  },
  {
    path: 'shareIntroduceCompany/:companyId',
    loadChildren: () => import('./share-introduce-company/share-introduce-company.module').then(m => m.ShareIntroduceCompanyModule)
  }

];

const appChildRoutes: Routes = [
  {
    path: "super-admin",
    loadChildren: () => import('./super-admin/super-admin.module').then(m => m.SuperAdminModule),
    canActivate: [SupperAdminGuard]
  },
  {
    path: "enterprise",
    loadChildren: () => import('./enterprise/enterprise.module').then(m => m.EnterpriseModule),
    canActivate: [EnterpriseGuard]
  },
  {
    path: "blog-posts",
    loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule)
  },
  {
    path: "blog",
    loadChildren: () => import('./blog/all-post/all-post.module').then(m => m.AllPostModule)
  },
  {
    path: "blog/categories/:url",
    loadChildren: () => import('./blog/frontend/all-blog-categories/all-blog-categories.module').then(m => m.AllBlogCategoriesModule)
  },
  {
    path: "blog/tags/:url",
    loadChildren: () => import('./blog/frontend/all-blog-tag/all-blog-tag.module').then(m => m.AllBlogTagModule)
  },
  {
    path: "blog/:url",
    loadChildren: () => import('./blog/frontend/single-page/single-page.module').then(m => m.SinglePageModule)
  },


  {
    path: "**",
    component: NotFoundComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' }),
    RouterModule.forChild(appChildRoutes),
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
