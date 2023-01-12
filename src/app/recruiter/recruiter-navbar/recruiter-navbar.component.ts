import { Component, OnInit, Input, ElementRef, ViewChild } from "@angular/core";
import { Tab } from "../models/tab";
import { NavigationEnd, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { UserService } from "src/app/_services/user.service";
import { RewardSummary } from "src/app/profile/model/reward-summary";
import { IProfile, Profile } from "src/app/profile/model/user-profile";
import { SubscriberslistService } from "src/app/_services/subscriberslist.service";
import { Subject } from "rxjs";
import { Tab2 } from "../models/tab2";
declare var Materialize: any;
declare var jQuery: any;
@Component({
  selector: "app-recruiter-navbar",
  templateUrl: "./recruiter-navbar.component.html",
  styleUrls: ["./recruiter-navbar.component.css"],
})
export class RecruiterNavbarComponent implements OnInit {
  @ViewChild("advicePoints", { static: true }) advicePoints: ElementRef;
  @ViewChild("ratingPoints", { static: true }) ratingPoints: ElementRef;

  tabs1: Tab[];
  public userProfile: IProfile;
  public PointsSummary = new RewardSummary();

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private userService: UserService,
    private _subList: SubscriberslistService
  ) {
    /**
     * subcription incresed points
     */
    this.userService._setProfileObservable.subscribe((data) => {
      if (data !== null) {
        this.userProfile = data;
        this.animateValue(
          this.advicePoints,
          data.advicePoints - 100,
          data.advicePoints,
          5000
        );
        this.animateValue(
          this.ratingPoints,
          data.ratingPoints - 100,
          data.ratingPoints,
          5000
        );
      }
    });

    this.tabs1 = [];

    this.userProfile = new Profile();

    this.tabs1.push(new Tab("/recruiter/dashboard", "Dashboard", true));
    this.tabs1.push(
      new Tab("/recruiter/share-candidate-profile", "Candidates", false)
    );

    this.tabs1.push(
      new Tab("/recruiter/multi-share-candidate-profile", "Multi Shared Candidates", false)
    );

    this.tabs1.push(
      new Tab("/recruiter/all-recruiters", "Recruiters Market Place", false)
    );
    this.tabs1.push(
      new Tab("/recruiter/job-profile-list", "Job Profiles", false)
    );

    this.tabs1.push(
      new Tab("/recruiter/bidding-event-list", "Job Postings", false)
    );
    // this.tabs1.push(new Tab('/recruiter/bidding-event-list/my', 'My Candidates Submission', false));
    this.tabs1.push(
      new Tab("/recruiter/won-bids", "Selected Candidates", false)
    );
    this.tabs1.push(new Tab("/recruiter/resume-list", "My Candidates", false));
    this.tabs1.push(new Tab("/recruiter/my-clients", "My Clients", false));
    this.tabs1.push(new Tab("/recruiter/waiting-list", "Waiting List", false));
    this.tabs1.push(new Tab("/recruiter/search-resume", "Resume Bank", false));

    this.tabs1.push(
      new Tab("/recruiter/video-interview-room", "Video Interview Room", false)
    );
    this.tabs1.push(new Tab("/recruiter/calendar", "Calendar", false));

    this.tabs1.push(new Tab("/recruiter/timeline", "Timelines", false));
  }

  ngOnInit() {
    jQuery(".modal").modal();
    jQuery(".button-collapse").sideNav({
      menuWidth: 300, // Default is 240
      closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
    });
    this.showSummary();
    this.SelectItem(this.router.url);
    this.getUsersProfile();

    if (this.router.url === "/recruiter") {
      this.tabs1[0].selected = true;
    }

    this._subList.recruiterPoints$.subscribe((res: any) => {
      this.handleRecruiterPoints(res);
    });

    this._subList.activebidEvent$.subscribe((res) => {
      this.handleActiveList(res);
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === "/candidate/all-recruiters") {
          this.SelectItem(event.url);
        }
      }
    });
  }

  handleRecruiterPoints(res) {
    switch (res.pointer) {
      case "advicePoints":
        if (res.subType === "divide") {
          this.userProfile[res.pointer] = res.increseCount;
        } else {
          this.userProfile[res.pointer] += res.increseCount;
        }
        break;
      case "ratingPoints":
        this.userProfile[res.pointer] += res.increseCount;
        break;
      case "sharePoints":
        this.userProfile[res.pointer] += res.increseCount;
        break;
    }
  }

  /**
   * to display count from start to end
   * @param obj
   * @param start
   * @param end
   * @param duration
   */
  animateValue(obj, start, end, duration) {
    // console.log(obj, start, end);
    if (obj !== null || start !== NaN || end !== undefined) {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.nativeElement.textContent = Math.floor(
          progress * (end - start) + start
        );
        obj.nativeElement.className = "change";

        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }

  handleActiveList(obj) {
    this.tabs1.forEach((tab) => {
      if (tab.displayText === "Dashboard") {
        tab.selected = true;
      } else {
        tab.selected = false;
      }
    });
  }

  SelectItem(item) {
    this.tabs1.forEach((tab) => {
      if (tab.id === item) {
        tab.selected = true;
      } else {
        tab.selected = false;
      }
    });
  }
  
  getUsersProfile() {
    this.userService
      .getUserProfile(this.userService.getUserData().userRole)
      .subscribe(
        (data: any) => {
          if (data != null && data != undefined && data != "") {
            this.userProfile = data.res;
          } else {
            Materialize.toast("Something went wrong", 1000);
          }
          this.spinner.hide();
        },
        (error) => {
          console.log(error);
          this.spinner.hide();
        }
      );
  }

  showSummary() {
    this.spinner.show();
    this.userService.getRewardLoosePointsSummary().subscribe(
      (data: any) => {
        this.PointsSummary.skillsLosePt = data.skillsLosePt;
        this.PointsSummary.experienceLosePt = data.experienceLosePt;
        this.PointsSummary.personalityLosePt = data.personalityLosePt;
        this.PointsSummary.resumeLosePt = data.resumeLosePt;
        this.PointsSummary.interViewLosePt = data.interViewLosePt;
        this.getEarnreward();
      },
      (error) => {
        console.log(error);
        this.spinner.hide();
      }
    );
  }

  getEarnreward() {
    this.userService.getEarnreward().subscribe(
      (data) => {
        this.PointsSummary.skillsErn = data.skillsErn;
        this.PointsSummary.personalityErn = data.personalityErn;
        this.PointsSummary.experienceEarn = data.experienceEarn;
        this.PointsSummary.resumeErn = data.resumeErn;
        this.PointsSummary.interViewErn = data.interViewErn;
        this.spinner.hide();
      },
      (error) => {
        console.log(error);
        this.spinner.hide();
      }
    );
  }
}
