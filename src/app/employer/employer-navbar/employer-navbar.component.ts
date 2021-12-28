import { Component, OnInit, Input } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { EmployerTab } from "../models/employerTab";
import { UserService } from "src/app/_services/user.service";
import { IProfile } from "src/app/profile/model/user-profile";
import { NgxSpinnerService } from "ngx-spinner";
import { SubscriberslistService } from "src/app/_services/subscriberslist.service";
import { Tab2 } from "src/app/recruiter/models/tab2";
declare var jQuery: any;
declare var Materialize: any;
@Component({
  selector: "app-employer-navbar",
  templateUrl: "./employer-navbar.component.html",
  styleUrls: ["./employer-navbar.component.css"],
})
export class EmployerNavbarComponent implements OnInit {
  public userProfile: IProfile;
  public type: number = 0;
  tabMenu: EmployerTab[];

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private _subList: SubscriberslistService
  ) {
    const employerId = JSON.parse(localStorage.getItem("currentUser")).userInfo._id;

    this.tabMenu = [
      new EmployerTab(1, "Dashboard", "/employer/dashboard", true),
      new EmployerTab(2, "Job Profiles", "/employer/job-profile-list", false),
      new EmployerTab(3, "Job Postings", "/employer/bidding-event-list", false),
      // new EmployerTab(
      //   4,
      //   "Video Interview Room",
      //   "/employer/video-interview-room",
      //   false
      // ),
      new EmployerTab(5, "My Candidates", "/employer/mycandidates", false),
      new EmployerTab(
        6,
        "Shared Profiles",
        "/employer/share-candidate-profile",
        false
      ),
      new EmployerTab(7, "Multi Shared Candidates", "/employer/multi-share-candidate-profile", false)
    ];

  }

  ngOnInit() {
    this.getUsersProfile();
    jQuery(".button-collapse").sideNav({
      menuWidth: 300, // Default is 240
      closeOnClick: false, // Closes side-nav on <a> clicks, useful for Angular/Meteor
    });

    this.SelectItem(this.router.url);

    this._subList.activeDashboard$.subscribe((res) => {
      this.handleActiveList(res);
    });
  }

  handleActiveList(obj) {
    this.tabMenu.forEach((tab) => {
      if (tab.name === "Dashboard") {
        tab.select();
      } else {
        tab.deselect();
      }
    });
  }

  SelectItem(item) {
    this.tabMenu.forEach((tab) => {
      if (tab.path === item) tab.select();
      else tab.deselect();
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
}
