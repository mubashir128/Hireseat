import { Component, OnInit } from '@angular/core';
import { PostJobService } from 'src/app/_services/post-job.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-suggested-post-jobs',
  templateUrl: './suggested-post-jobs.component.html',
  styleUrls: ['./suggested-post-jobs.component.css']
})
export class SuggestedPostJobsComponent implements OnInit {

  loggedUser: any;
  appliedPostJobs = [];

  constructor(
    protected _userService: UserService,
    private _postJobService: PostJobService
  ) {
    this.loggedUser = this._userService.getUserData();
  }

  ngOnInit(): void {
    this.getMyPostjobs();
  }

  getMyPostjobs() {
    let promises = [];
    promises.push(this._postJobService.getMyPostJob(null, null).toPromise());
    Promise.all(promises).then(result => {
      this.appliedPostJobs = result[0];
    });
  }

  changeLogo(apply){
    apply.showCreatedLogo = true;
  }
}
