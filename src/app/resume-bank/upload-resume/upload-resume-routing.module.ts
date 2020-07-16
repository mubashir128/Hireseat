import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadResumeComponent } from './upload-resume.component';

const routes: Routes = [
  {
    path: '',
    component: UploadResumeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadResumeRoutingModule { }
