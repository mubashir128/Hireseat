import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BiddingEventService } from 'src/app/_services/bidding-event.service';
import { UserService } from 'src/app/_services/user.service';
import * as myGlobals from '../../../../globalPath';
import { PostJobService } from 'src/app/_services/post-job.service';
import { PostJob } from '../app-list/app-list.component';

declare var Materialize;

@Component({
  selector: 'app-suggest-introduce',
  templateUrl: './suggest-introduce.component.html',
  styleUrls: ['./suggest-introduce.component.css']
})
export class SuggestIntroduceComponent implements OnInit {

  suggestIntro: PostJob[] = [];
  searchFilters = new Map();

  showLoadStatus : boolean = true;
  loadStatus = "Loading...";

  createdUrl: string = "";
  public baseurl: any;

  loggedUser: any;

  suggestIntro2: any[] = [];

  applyPostJobs: any[] = [];

  constructor(
    protected _userService: UserService,
    private _router: Router,
    private _biddingEventService: BiddingEventService,
    private _postJobService: PostJobService
  ){
    this.baseurl = myGlobals.redirecUrl;
    this.loggedUser = this._userService.getUserData();
  }

  ngOnInit(): void {
    this.jobsAre();
    // this.getSuggestIntroduce();
  }

  jobsAre(){
    let promises = [];
    promises.push(this._postJobService.getPostJob(null, true, this.searchFilters).toPromise());
    promises.push(this._biddingEventService.getJobProfiles(true).toPromise());
    promises.push(this._postJobService.getApplyPostJob(null, null).toPromise());
    Promise.all(promises).then(result => {
      this.suggestIntro = result[0].result;
      this.suggestIntro2 = result[1];
      this.applyPostJobs = result[2];
      if(result){
        this.showLoadStatus = false;
        this.loadStatus = "";
        this.suggestIntro = [...this.suggestIntro, ...this.suggestIntro2];
      }
    });
  }

  getSuggestIntroduce(){
    this._postJobService.getPostJob(null, true, this.searchFilters).subscribe((data)=>{
      this.suggestIntro = data.result;
      if(this.suggestIntro.length !== 0){
        this.showLoadStatus = false;
        this.loadStatus = "";
      }
    }, (err) => {
      console.log(err);
      this.loadStatus = "No Data available.";
    });
  }

  changeLogo(notify){
    notify.showCreatedLogo = true;
  }

  shareClick(companyId){
    this.createdUrl = this.baseurl + "shareIntroduceCompany/" + companyId;
    this._userService.shareToMedia(this.createdUrl);
  }

  gotoUsers(companiesAre){
    if(companiesAre && companiesAre.candidate.length){
      this._router.navigate(["/"+this.loggedUser.userRole+"/friends-connections"], { queryParams: { companyName: companiesAre.companyName}});
    }
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

  checkApply(companiesAre){
    let check = true;
    for(let apply of this.applyPostJobs){
      if(apply.postJobId._id == companiesAre._id){
        check = false;
      }
    }
    return check;
  }

  checkApplyPoints(companiesAre, field){
    let check = false;
    for(let apply of this.applyPostJobs){
      if(companiesAre?._id == apply?.postJobId?._id && apply[field]){
        check = true;
      }
    }
    return check;
  }

  allreadApplyForJobPost(companiesAre){
    Materialize.toast("You Already applied for this Post job", 1000, "red");
  }

  applyForJobPost(companiesAre){
    if(!companiesAre.pointBoolean1 || !companiesAre.pointBoolean2 || !companiesAre.pointBoolean3){
      Materialize.toast("Please select all three points!", 1000, "red");
      return ;
    }

    let promises = [];
    promises.push(this._postJobService.applyPostJob({ postJobId : companiesAre._id, point1 : companiesAre.pointBoolean1, point2 : companiesAre.pointBoolean2, point3 : companiesAre.pointBoolean3 }).toPromise());
    Promise.all(promises).then(result => {
      this.applyPostJobs = [...this.applyPostJobs, ...result];
      Materialize.toast("Applied for this Post job", 1000, "green");
    }).catch(err=>{
      Materialize.toast("You Already applied for this Post job", 1000, "red");
    });
  }

  changedValue(event, companiesAre, field){
    companiesAre[field] = event.target.checked;
  }
}
