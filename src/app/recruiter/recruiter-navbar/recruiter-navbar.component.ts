
import { Component, OnInit, Input } from '@angular/core';
import { Tab } from '../models/tab';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/_services/user.service';
import { RewardSummary } from 'src/app/profile/model/reward-summary';
import { IProfile, Profile } from 'src/app/profile/model/user-profile';
import { SubscriberslistService } from 'src/app/_services/subscriberslist.service';
declare var Materialize: any;
declare var jQuery: any;
@Component({
  selector: 'app-recruiter-navbar',
  templateUrl: './recruiter-navbar.component.html',
  styleUrls: ['./recruiter-navbar.component.css']
})
export class RecruiterNavbarComponent implements OnInit {
  tabs1: Tab[];
  public userProfile: IProfile;
  public PointsSummary = new RewardSummary();
  constructor(private router: Router, private spinner: NgxSpinnerService, private userService: UserService, private _subList: SubscriberslistService) {
    this.tabs1 = [];
    this.userProfile = new Profile();
    this.tabs1.push(new Tab('/recruiter/bidding-event-list', 'Job Postings', true));
    // this.tabs1.push(new Tab('/recruiter/bidding-event-list/my', 'My Candidates Submission', false));
    this.tabs1.push(new Tab('/recruiter/won-bids', 'Selected Candidates', false));
    this.tabs1.push(new Tab('/recruiter/resume-list', 'My Candidates', false));
    this.tabs1.push(new Tab('/recruiter/waiting-list', 'Waiting List', false));
    this.tabs1.push(new Tab('/recruiter/search-resume', 'Resume Bank', false));
    this.tabs1.push(new Tab('/recruiter/share-candidate-profile', 'Shared Profiles', false));

    this.tabs1.push(new Tab('/recruiter/video-interview-room', 'Video Interview Room', false));
    this.tabs1.push(new Tab('/recruiter/all-recruiters', 'Recruiters Market Place', false));
    this.tabs1.push(new Tab('/recruiter/calendar', 'Calendar', false));

  }

  ngOnInit() {
    jQuery('.modal').modal();
    jQuery('.button-collapse').sideNav({
      menuWidth: 300, // Default is 240
      closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    });
    this.showSummary();
    this.SelectItem(this.router.url);
    this.getUsersProfile();

    this._subList.activebidEvent$.subscribe(res => {
      this.handleActiveList(res);
    });
  }

  handleActiveList(obj) {
    this.tabs1.forEach(tab => {
      if (tab.displayText === "Job Postings") {
        tab.selected = true;
      }
      else {
        tab.selected = false;
      }
    });
  }

  SelectItem(item) {
    this.tabs1.forEach(tab => {
      if (tab.id === item)
        tab.selected = true;
      else
        tab.selected = false;
    });

  }

  getUsersProfile() {
    this.userService.getUserProfile(this.userService.getUserData().userRole).subscribe((data: any) => {
      if (data != null && data != undefined && data != "") {
        this.userProfile = data.res;
      } else {
        Materialize.toast('Something went wrong', 1000)
      }
      this.spinner.hide();
    }, (error) => {
      console.log(error);
      this.spinner.hide();
    });
  }

  showSummary() {
    this.spinner.show();
    this.userService.getRewardLoosePointsSummary().subscribe((data: any) => {
      this.PointsSummary.skillsLosePt = data.skillsLosePt;
      this.PointsSummary.experienceLosePt = data.experienceLosePt;
      this.PointsSummary.personalityLosePt = data.personalityLosePt;
      this.PointsSummary.resumeLosePt = data.resumeLosePt;
      this.PointsSummary.interViewLosePt = data.interViewLosePt;
      this.getEarnreward();
    }, (error) => {
      console.log(error);
      this.spinner.hide();
    })

  }

  getEarnreward() {
    this.userService.getEarnreward().subscribe((data) => {
      this.PointsSummary.skillsErn = data.skillsErn;
      this.PointsSummary.personalityErn = data.personalityErn;
      this.PointsSummary.experienceEarn = data.experienceEarn;
      this.PointsSummary.resumeErn = data.resumeErn;
      this.PointsSummary.interViewErn = data.interViewErn;
      this.spinner.hide();
    }, (error) => {
      console.log(error);
      this.spinner.hide();
    })
  }

}
