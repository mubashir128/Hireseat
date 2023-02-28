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
  eachEntry: any[] = [];

  intros: boolean = true;
  pendingIntros: boolean = false;
  itemsIs = 0;

  showLoader: boolean = true;

  Search: FormGroup;
  @ViewChild("searchByName", { static: true }) searchByName: ElementRef;
  searchTerm: String = "";

  constructor(
    private _candidateService: CandidateService,
    private _constants: ConstantsService,
    protected _userService: UserService,
    protected _introduceService: IntroduceService,
    protected _formBuilder: FormBuilder
  ) {
    this.loggedUser = this._userService.getUserData();
    this.Search = this._formBuilder.group({
      searchTerm: [""],
    });
  }

  ngOnInit(): void {
    this.getConnectedFriends();
    this.debounceSearch();
  }

  debounceSearch(){
    this.Search.valueChanges.pipe(debounceTime(1200), distinctUntilChanged()).subscribe((value) => {
      this.searchTerm = value.searchTerm;
    });
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

        this._userService.getUserObject(this.friendsConnections, array, userObj, this.eachEntry, connection.recipient, this.loggedUser, this.allConnectedFriends);
      } else if (connection?.recipient?._id == this.loggedUser._id) {
        let array = connection?.resumeId?.desiredCompanies ? connection?.resumeId?.desiredCompanies?.split(",") : [];
        let userObj = {
          user: connection?.requester,
          intro: []
        };

        this._userService.getUserObject(this.friendsConnections, array, userObj, this.eachEntry, connection.requester, this.loggedUser, this.allConnectedFriends);
      } else {
        console.log("no match : ");
      }
    });
    // console.log("this.eachEntry : ",this.eachEntry);
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

        this._userService.getUserObject2(this.friendsConnections, array, userObj, this.eachEntry, connection.recipient, this.loggedUser, this.allConnectedFriends);
      } else if (connection?.recipient?._id == this.loggedUser._id) {
        let array = connection?.resumeId?.industries ? connection?.resumeId?.industries.map((industry)=>industry.name) : [];
        let userObj = {
          user: connection?.requester,
          intro: []
        };

        this._userService.getUserObject2(this.friendsConnections, array, userObj, this.eachEntry, connection.requester, this.loggedUser, this.allConnectedFriends);
      } else {
        console.log("no match : ");
      }
    });
    // console.log("this.eachEntry : ",this.eachEntry);
    this.showLoader = false;
  }

  introduce(entry){
    let payload = {
      toId: entry?.desiredUser?._id,
      introduceId: entry?.introUser?._id,
      comapnyName:  entry?.company
    }
    this._introduceService.introduce(payload).subscribe((res) => {
      Materialize.toast("Introduced successfully", 1000, "green");
    }, (err) => {
      console.log(err);
      Materialize.toast("Already introduced", 1000, "red");
    });
  }

  changeLogo(notify) {
    notify.showCreatedLogo = true;
  }

  switchPage(page) {
    jQuery("#switch" + this.itemsIs).css("background-color", "#33aaff");
    this.itemsIs = page;
    jQuery("#switch" + page).css("background-color", "#27B1BD");

    if (this.itemsIs == 0) {
      this.intros = true;
      this.pendingIntros = false;
    } else if (this.itemsIs == 1) {
      this.intros = false;
      this.pendingIntros = true;
    }
  }

}
