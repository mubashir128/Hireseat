import { Component, OnInit } from '@angular/core';
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
  loggedUser: any;
  eachEntry: any[] = [];

  intros: boolean = true;
  pendingIntros: boolean = false;
  itemsIs = 0;

  showLoader: boolean = true;

  constructor(
    private _candidateService: CandidateService,
    private _constants: ConstantsService,
    protected _userService: UserService,
    protected _introduceService: IntroduceService
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
    this._candidateService.getAllConnectedUsers(payload).subscribe((res) => {
      this.friendsConnections = res.data;
      this.fetchEachMatchingEntry();
    }, (err) => {
      console.log(err);
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

        this._userService.getUserObject(this.friendsConnections, array, userObj, this.eachEntry, connection.recipient, this.loggedUser);
        if (userObj && userObj.intro && userObj.intro.length !== 0) {
          // this.eachEntry.push(userObj);
        }
      } else if (connection?.recipient?._id == this.loggedUser._id) {
        let array = connection?.resumeId?.desiredCompanies ? connection?.resumeId?.desiredCompanies?.split(",") : [];
        let userObj = {
          user: connection?.requester,
          intro: []
        };

        this._userService.getUserObject(this.friendsConnections, array, userObj, this.eachEntry, connection.requester, this.loggedUser);
        if (userObj && userObj.intro && userObj.intro.length !== 0) {
          // this.eachEntry.push(userObj);
        }
      } else {
        console.log("no match : ");
      }
    });
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
