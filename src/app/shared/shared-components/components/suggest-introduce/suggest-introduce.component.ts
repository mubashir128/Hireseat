import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import * as myGlobals from '../../../../globalPath';

@Component({
  selector: 'app-suggest-introduce',
  templateUrl: './suggest-introduce.component.html',
  styleUrls: ['./suggest-introduce.component.css']
})
export class SuggestIntroduceComponent implements OnInit {

  suggestIntro: any[];
  searchFilters = new Map();

  showLoadStatus : boolean = true;
  loadStatus = "Loading...";

  createdUrl: string = "";
  public baseurl: any;

  loggedUser: any;

  constructor(protected _userService: UserService, private _router: Router){
    this.baseurl = myGlobals.redirecUrl;
    this.loggedUser = this._userService.getUserData();
  }

  ngOnInit(): void {
    this.getSuggestIntroduce();
  }

  getSuggestIntroduce(){
    this._userService.getPostJob(null, true, this.searchFilters).subscribe((data)=>{
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
}
