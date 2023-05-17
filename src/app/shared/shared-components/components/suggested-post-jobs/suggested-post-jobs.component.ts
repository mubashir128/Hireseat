import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostJobService } from 'src/app/_services/post-job.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-suggested-post-jobs',
  templateUrl: './suggested-post-jobs.component.html',
  styleUrls: ['./suggested-post-jobs.component.css']
})
export class SuggestedPostJobsComponent implements OnInit {

  loggedUser: any;
  myPostJobs = [];

  showLoadStatus : boolean = true;
  loadStatus = "Loading...";

  constructor(
    protected _userService: UserService,
    private _postJobService: PostJobService,
    private _router: Router
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
      this.myPostJobs = result[0];
      this.showLoadStatus = false;
      this.loadStatus = "";
    });
  }

  changeLogo(apply){
    apply.showCreatedLogo = true;
  }

  showHideJobSpec(company){
    if(company.expanded){
      jQuery("#jobSpec_"+company._id).css("display", "none");
      company.expanded = false;
    }else{
      jQuery("#jobSpec_"+company._id).css("display", "block");
      company.expanded = true;
    }
  }

  seeProfile(_id, profileLink) {
    this._router.navigate([profileLink], { queryParams: { myJobList : true, postJobId : _id }});
  }
}
