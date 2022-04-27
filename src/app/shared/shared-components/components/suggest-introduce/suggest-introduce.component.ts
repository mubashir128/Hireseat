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

  constructor(protected _userService: UserService) { }

  ngOnInit(): void {
    this.getSuggestIntroduce();
  }

  getSuggestIntroduce(){
    this._userService.getPostJob(null, true, this.searchFilters).subscribe((data)=>{
      this.suggestIntro = data.result;
    }, (err) => {
      console.log(err);
    });
  }

  changeLogo(notify){
    notify.showCreatedLogo = true;
  }
}
