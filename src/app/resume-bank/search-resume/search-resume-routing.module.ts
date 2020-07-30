import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchResumeComponent } from './search-resume.component';

const routes: Routes = [{
  path : "",
  component : SearchResumeComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchResumeRoutingModule { }
