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

    let payload2 = {
      type: this._constants.asAFriend,
      allRecords : true
    }

    let promises = [];
    promises.push(this._candidateService.getAllConnectedUsers(payload).toPromise());
    promises.push(this._candidateService.getAllConnectedUsers(payload2).toPromise());
    Promise.all(promises).then(result => {
      this.friendsConnections = result[0].data;
      this.allConnectedFriends = result[1].data;
      this.fetchEachMatchingEntry();
      this.fetchEachMatchingEntryByIndustries();
    });
  }

  fetchEachMatchingEntry() {
    this.friendsConnections.forEach((connection, index) => {
      if (connection?.requester?._id == this.loggedUser._id) {
        let array = connection?.resumeId2?.desiredCompanies ? connection?.resumeId2?.desiredCompanies?.split(",") : [];
        let userObj = {
          user: connection?.recipient,
          intro: []
        };

        this._userService.getUserObject(this.friendsConnections, array, userObj, this.eachEntry1, connection.recipient, this.loggedUser, this.allConnectedFriends);
      } else if (connection?.recipient?._id == this.loggedUser._id) {
        let array = connection?.resumeId?.desiredCompanies ? connection?.resumeId?.desiredCompanies?.split(",") : [];
        let userObj = {
          user: connection?.requester,
          intro: []
        };

        this._userService.getUserObject(this.friendsConnections, array, userObj, this.eachEntry1, connection.requester, this.loggedUser, this.allConnectedFriends);
      } else {
        console.log("no match : ");
      }
    });
    // console.log("desired company this.eachEntry : ",this.eachEntry1);
    this.showLoader = false;
  }

  fetchEachMatchingEntryByIndustries() {
    this.friendsConnections.forEach((connection, index) => {
      if (connection?.requester?._id == this.loggedUser._id) {
        let array = connection?.resumeId2?.industries ? connection?.resumeId2?.industries.map((industry)=>industry.name) : [];
        let userObj = {
          user: connection?.recipient,
          intro: []
        };

        this._userService.getUserObject2(this.friendsConnections, array, userObj, this.eachEntry2, connection.recipient, this.loggedUser, this.allConnectedFriends);
      } else if (connection?.recipient?._id == this.loggedUser._id) {
        let array = connection?.resumeId?.industries ? connection?.resumeId?.industries.map((industry)=>industry.name) : [];
        let userObj = {
          user: connection?.requester,
          intro: []
        };

        this._userService.getUserObject2(this.friendsConnections, array, userObj, this.eachEntry2, connection.requester, this.loggedUser, this.allConnectedFriends);
      } else {
        console.log("no match : ");
      }
    });
    // console.log("industries this.eachEntry : ",this.eachEntry2);
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
