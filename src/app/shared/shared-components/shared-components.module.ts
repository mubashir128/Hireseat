import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../footer/footer.component';
import { NavbarComponent } from '../../navbar/navbar.component';
import { MediaComponent } from '../../media/media.component';
import { NgxTwitterTimelineModule } from 'ngx-twitter-timeline';
import { TimeFormat } from '../../home/pipe';
import { SafePipe } from '../../blog/frontend/safepipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { QuestionsComponent } from 'src/app/view-forum/questions/questions.component';
import { AskbuttonComponent } from 'src/app/view-forum/askbutton/askbutton.component';
import { RecruiterNavbarComponent } from 'src/app/recruiter/recruiter-navbar/recruiter-navbar.component';
import { EmployerNavbarComponent } from 'src/app/employer/employer-navbar/employer-navbar.component';
import { BiddingEventsListComponent } from 'src/app/bidding-events-list/bidding-events-list.component';
import { ProfileComponent } from 'src/app/profile/profile.component';
import { NewResumeComponent } from 'src/app/recruiter/new-resume/new-resume.component';
import { VideoInterviewRoomComponent } from 'src/app/video-interview-room/video-interview-room.component';
import { EditResumeComponent } from 'src/app/recruiter/edit-resume/edit-resume.component';
import { ResumeListComponent } from 'src/app/recruiter/resume-list/resume-list.component';
import { ResumeItemComponent } from 'src/app/recruiter/resume-item/resume-item.component';
import { LimitPipe } from 'src/charlimit';
import { SortPipe } from '../pipes/sort.pipe';
import { SafePdfPipe } from '../pipes/safe-pdf.pipe';
import { SearchPipe } from 'src/search.pipe';
import { inArrayPipe } from '../pipes/inArrayPipe';
import { PdfViewerComponent } from 'src/app/recruiter/pdf-viewer/pdf-viewer.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { BiddingEventItemComponent } from '../../bidding-event-item/bidding-event-item.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgxTwitterTimelineModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    NgxPaginationModule
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
    SafePdfPipe,
    SearchPipe,
    // end of pipes

    PdfViewerComponent,
    ResumeItemComponent,
    // ResumeListComponent,
    EditResumeComponent,
    BiddingEventsListComponent,
    ProfileComponent,
    NewResumeComponent,
    VideoInterviewRoomComponent,
    BiddingEventItemComponent
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
    SafePdfPipe,
    SearchPipe,
    BiddingEventItemComponent,
    PdfViewerComponent,
    ResumeItemComponent,
    // ResumeListComponent,
    EditResumeComponent,
    BiddingEventsListComponent,
    ProfileComponent,
    NewResumeComponent,
    VideoInterviewRoomComponent
  ]
})
export class SharedComponentsModule { }
