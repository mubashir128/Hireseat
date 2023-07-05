import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CandidateService } from 'src/app/_services/candidate.service';
import { ConstantsService } from 'src/app/_services/constants.service';
import { IntroduceService, tabTypes } from 'src/app/_services/introduce.service';
import { UserService } from 'src/app/_services/user.service';
import { SearchFilter } from '../user-list/user-list.component';

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

  pageSize: number = 10;
  pageLength: number = 100;
  pageIndex: number = 0;
  currentPageEvent: PageEvent;

  companiesTab: tabTypes = tabTypes.companiesTab;
  industriesTab: tabTypes = tabTypes.industriesTab;

  searchFilters = new Map();

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
    this.getConnectedFriendsIntroCompanies();
  }

  getConnectedFriendsIntroCompanies(){
    let payload = {
      type: this._constants.asAFriend
    }
    
    let promises = [];
    promises.push(this._candidateService.getIntrosCompanies(payload, this.currentPageEvent, this.searchFilters).toPromise());
    Promise.all(promises).then(result => {
      this.fetchEachMatchingEntry(result);
    });
  }

  getConnectedFriendsIntroIndustries(){
    let payload = {
      type: this._constants.asAFriend
    }
    
    let promises = [];
    promises.push(this._candidateService.getIntrosIndustries(payload, this.currentPageEvent, this.searchFilters).toPromise());
    Promise.all(promises).then(result => {
      this.fetchEachMatchingEntryByIndustries(result);
    });
  }

  getIntrosCompanies(pageEvent: PageEvent = this.currentPageEvent){
    this.currentPageEvent = pageEvent;
    
    let payload = {
      type: this._constants.asAFriend
    }
    
    let promises = [];
    promises.push(this._candidateService.getIntrosCompanies(payload, pageEvent, this.searchFilters).toPromise());
    Promise.all(promises).then(result => {
      this.fetchEachMatchingEntry(result);
    });
  }

  getIntrosIndustries(pageEvent: PageEvent = this.currentPageEvent){
    this.currentPageEvent = pageEvent;
    
    let payload = {
      type: this._constants.asAFriend
    }
    
    let promises = [];
    promises.push(this._candidateService.getIntrosIndustries(payload, pageEvent, this.searchFilters).toPromise());
    Promise.all(promises).then(result => {
      this.fetchEachMatchingEntryByIndustries(result);
    });
  }

  fetchEachMatchingEntry(result) {
    this.eachEntry1 = result[0].eachEntry;
    this.pageLength = result[0].totalLength;
    this.pageIndex = result[0].pageIndex;
    this.showLoader = false;
  }

  fetchEachMatchingEntryByIndustries(result) {
    this.eachEntry2 = result[0].eachEntry;
    this.pageLength = result[0].totalLength;
    this.pageIndex = result[0].pageIndex;
    this.showLoader = false;
  }

  switchPage(page){
    this.searchFilters.clear();
    jQuery("#switch" + this.itemsIs).css("background-color", "#33aaff");
    this.itemsIs = page;
    jQuery("#switch" + page).css("background-color", "#27B1BD");

    this.currentPageEvent = undefined;
    if(this.itemsIs == 0){
      this.jobs = true;
      this.industries = false;
      this.getConnectedFriendsIntroCompanies();
    }else if(this.itemsIs == 1){
      this.jobs = false;
      this.industries = true;
      this.getConnectedFriendsIntroIndustries();
    }
  }

  searchIntrosCompanies(searchFilter: SearchFilter){
    this.searchFilters.set(searchFilter.column, searchFilter.value);
    this.getConnectedFriendsIntroCompanies();
  }

  searchIntrosIndustries(searchFilter: SearchFilter){
    this.searchFilters.set(searchFilter.column, searchFilter.value);
    this.getConnectedFriendsIntroIndustries();
  }
}
