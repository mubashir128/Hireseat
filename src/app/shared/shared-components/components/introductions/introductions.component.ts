import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CandidateService } from 'src/app/_services/candidate.service';
import { ConstantsService } from 'src/app/_services/constants.service';
import { IntroduceService } from 'src/app/_services/introduce.service';
import { UserService } from 'src/app/_services/user.service';

declare var jQuery;
declare var Materialize;

@Component({
  selector: 'app-introductions',
  templateUrl: './introductions.component.html',
  styleUrls: ['./introductions.component.css']
})
export class IntroductionsComponent implements OnInit {
  friendsConnections: any;
  allConnectedFriends: []= [];
  loggedUser: any;
  eachEntry1: any[] = [];
  eachEntry2: any[] = [];

  showLoader: boolean = true;

  jobs: boolean = true;
  industries: boolean = false;
  itemsIs = 0;

  seachCompanyLable = "Desired Companies";
  seachIndustryLable = "Desired Industries";

  constructor(
    private _candidateService: CandidateService,
    private _constants: ConstantsService,
    protected _userService: UserService,
    protected _introduceService: IntroduceService,
    protected _formBuilder: FormBuilder
  ) {
    this.loggedUser = this._userService.getUserData();
  }

  ngOnInit(): void {
    this.getConnectedFriends();
  }

  getConnectedFriends() {
    let payload = {
      type: this._constants.asAFriend
    }
    
    let promises = [];
    promises.push(this._candidateService.getIntrosCompanies(payload).toPromise());
    promises.push(this._candidateService.getIntrosIndustries(payload).toPromise());
    Promise.all(promises).then(result => {
      this.fetchEachMatchingEntry(result);
      this.fetchEachMatchingEntryByIndustries(result);
    });
  }

  fetchEachMatchingEntry(result) {
    this.eachEntry1 = result[0];
    this.showLoader = false;
  }

  fetchEachMatchingEntryByIndustries(result) {
    this.eachEntry2 = result[1];
    this.showLoader = false;
  }

  switchPage(page){
    jQuery("#switch" + this.itemsIs).css("background-color", "#33aaff");
    this.itemsIs = page;
    jQuery("#switch" + page).css("background-color", "#27B1BD");

    if(this.itemsIs == 0){
      this.jobs = true;
      this.industries = false;
    }else if(this.itemsIs == 1){
      this.jobs = false;
      this.industries = true;
    }
  }

}
