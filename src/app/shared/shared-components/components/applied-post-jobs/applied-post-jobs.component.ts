import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostJobService } from 'src/app/_services/post-job.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-applied-post-jobs',
  templateUrl: './applied-post-jobs.component.html',
  styleUrls: ['./applied-post-jobs.component.css']
})
export class AppliedPostJobsComponent implements OnInit {

  loggedUser: any;
  appliedPostJobs = [];

  constructor(
    protected _userService: UserService,
    private _postJobService: PostJobService,
    private _router: Router
  ) {
    this.loggedUser = this._userService.getUserData();
  }

  ngOnInit(): void {
    this.getAppliedjobs();
  }

  getAppliedjobs() {
    let promises = [];
    promises.push(this._postJobService.getApplyPostJob(null, null).toPromise());
    Promise.all(promises).then(result => {
      this.appliedPostJobs = result[0];
    });
  }

  showHideJobSpec(item) {
    if (item.expanded) {
      jQuery("#jobSpec_" + item._id).css("display", "none");
      item.expanded = false;
    } else {
      jQuery("#jobSpec_" + item._id).css("display", "block");
      item.expanded = true;
    }
  }

  seeProfile(_id, profileLink) {
    this._router.navigate([profileLink], { queryParams: { appliedPostJobs : true, postJobId : _id }});
  }

}
