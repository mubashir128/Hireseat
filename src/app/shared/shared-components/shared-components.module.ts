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

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgxTwitterTimelineModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,

  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    MediaComponent,
    TimeFormat,
    SafePipe,
    QuestionsComponent,
    AskbuttonComponent,
    RecruiterNavbarComponent,
    EmployerNavbarComponent
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
    EmployerNavbarComponent
  ]
})
export class SharedComponentsModule { }
