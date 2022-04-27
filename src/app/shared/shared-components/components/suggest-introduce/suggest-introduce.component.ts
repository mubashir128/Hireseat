import { Component, OnInit } from '@angular/core';
import { CandidateService } from 'src/app/_services/candidate.service';
import { UserService } from 'src/app/_services/user.service';

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

  constructor(protected _userService: UserService) { }

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
}
