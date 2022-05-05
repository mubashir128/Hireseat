import { Component, OnInit } from '@angular/core';
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

  constructor(protected _userService: UserService){
    this.baseurl = myGlobals.redirecUrl;
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
}
