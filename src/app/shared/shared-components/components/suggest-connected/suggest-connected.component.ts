import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CandidateService } from 'src/app/_services/candidate.service';
import { ConstantsService } from 'src/app/_services/constants.service';
import { UserService } from 'src/app/_services/user.service';

declare var jQuery;
declare var Materialize;

@Component({
  selector: 'app-suggest-connected',
  templateUrl: './suggest-connected.component.html',
  styleUrls: ['./suggest-connected.component.css']
})
export class SuggestConnectedComponent implements OnInit {
  intros: boolean = true;
  pendingIntros: boolean = false;
  itemsIs = 0;

  redirectId;
  type;

  constructor(
    private _route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.redirectId = this._route.snapshot.queryParams["redirectId"];
    this.type = this._route.snapshot.queryParams["type"];
    if(this.type){
      this.switchPage2(this.type);
    }
  }

  switchPage(page){
    jQuery("#switch" + this.itemsIs).css("background-color", "#33aaff");
    this.itemsIs = page;
    jQuery("#switch" + page).css("background-color", "#27B1BD");

    if(this.itemsIs == 0){
      this.intros = true;
      this.pendingIntros = false;
    }else if(this.itemsIs == 1){
      this.intros = false;
      this.pendingIntros = true;
    }
  }

  switchPage2(page){
    this.itemsIs = page;
    jQuery("#switch" + this.itemsIs).css("background-color", "#33aaff !important");

    if(this.itemsIs == 0){
      this.intros = true;
      this.pendingIntros = false;
    }else if(this.itemsIs == 1){
      this.intros = false;
      this.pendingIntros = true;
    }
  }

}
