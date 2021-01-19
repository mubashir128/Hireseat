import { Component, OnInit } from "@angular/core";
import { Tab } from "src/app/recruiter/models/tab";
import { IProfile, Profile } from "src/app/profile/model/user-profile";
import { NgxSpinnerService } from "ngx-spinner";
import { Router, NavigationEnd } from "@angular/router";
import { UserService } from "src/app/_services/user.service";
declare var Materialize: any;

declare var jQuery: any;
declare var $: any;
@Component({
  selector: "app-candidate-navbar",
  templateUrl: "./candidate-navbar.component.html",
  styleUrls: ["./candidate-navbar.component.css"],
})
export class CandidateNavbarComponent implements OnInit {
  tabs1: Tab[];
  public userProfile: IProfile;
  // public PointsSummary = new RewardSummary();
  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private userService: UserService,
  ) {
    this.tabs1 = [];
  }

  ngOnInit() {
    this.userProfile = new Profile();
    this.tabs1.push(
      new Tab("/candidate/all-recruiters", "Recruiters Market Place", true)
    );
    this.tabs1.push(new Tab("/candidate/my-profile", "My Profile", false));
    this.tabs1.push(
      new Tab("/candidate/my-reviewed-profiles", "My Reviewed Profiles", false)
    );
    this.tabs1.push(
      new Tab("/candidate/interview-room", "Interview Room", false)
    );
    this.tabs1.push(
      new Tab("/candidate/my-posted-profiles", "My Posted Profiles", false)
    );

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === "/candidate/all-recruiters") {
          this.SelectItem(event.url);
        }
      }
    });
    jQuery(".modal").modal();
    jQuery(".button-collapse").sideNav({
      menuWidth: 300, // Default is 240
      closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
    });
    // console.log(this.router.url);

    // this.showSummary();
    this.SelectItem(this.router.url);
    // this.getUsersProfile();
  }

  handleActiveList(obj) {
    this.tabs1.forEach((tab) => {
      if (tab.displayText === "My Profile") {
        tab.selected = true;
      } else {
        tab.selected = false;
      }
    });
  }

  SelectItem(item) {
    this.tabs1.forEach((tab) => {
      if (tab.id === item) tab.selected = true;
      else tab.selected = false;
    });
  }

  // getUsersProfile() {
  //   this.userService.getUserProfile(this.userService.getUserData().userRole).subscribe((data: any) => {
  //     if (data != null && data != undefined && data != "") {
  //       this.userProfile = data.res;
  //     } else {
  //       Materialize.toast('Something went wrong', 1000)
  //     }
  //     this.spinner.hide();
  //   }, (error) => {
  //     console.log(error);
  //     this.spinner.hide();
  //   });
  // }
}
