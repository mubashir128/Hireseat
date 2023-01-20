import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BiddingEventService } from 'src/app/_services/bidding-event.service';
import { UserService } from 'src/app/_services/user.service';
import * as myGlobals from '../../../../globalPath';

@Component({
  selector: 'app-suggest-introduce',
  templateUrl: './suggest-introduce.component.html',
  styleUrls: ['./suggest-introduce.component.css']
})
export class SuggestIntroduceComponent implements OnInit {

  suggestIntro: any[] = [];
  searchFilters = new Map();

  createdUrl: string = "";
  public baseurl: any;

  loggedUser: any;
  showLoader: boolean = true;

  suggestIntro2: any[] = [];

  constructor(protected _userService: UserService, private _router: Router,
    private _biddingEventService: BiddingEventService
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
    promises.push(this._userService.getPostJob(null, true, this.searchFilters).toPromise());
    promises.push(this._biddingEventService.getJobProfiles(true).toPromise());
    Promise.all(promises).then(result => {
      console.log(result);
      this.suggestIntro = result[0].result;
      this.suggestIntro2 = result[1];
      if(result){
        this.showLoadStatus = false;
        this.loadStatus = "";
        this.suggestIntro = [...this.suggestIntro, ...this.suggestIntro2];
      }
    });
  }

  getSuggestIntroduce(){
    this._userService.getPostJob(null, true, this.searchFilters).subscribe((data)=>{
      this.showLoader = false;
      this.suggestIntro = data.result;
    }, (err) => {
      console.log(err);
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
}
