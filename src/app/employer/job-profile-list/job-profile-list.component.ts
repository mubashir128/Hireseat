import { Component, OnInit, Input } from "@angular/core";
import { JobProfile, IJobProfile } from "../../models/job-profile";
import { UserService } from "../../_services/user.service";
import { AuthenticationService } from "../../_services/authentication.service";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { BiddingEventService } from "../../_services/bidding-event.service";

declare var jQuery: any;
declare var Materialize: any;
@Component({
  selector: "app-job-profile-list",
  templateUrl: "./job-profile-list.component.html",
  styleUrls: ["./job-profile-list.component.css"]
})
export class JobProfileListComponent implements OnInit {
  public loggedUser: any;
  public jp: JobProfile[];
  public noJp: boolean = true;
  constructor(
    private userService: UserService,
    private authService: AuthenticationService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private bidEventService: BiddingEventService
  ) {
    this.loggedUser = this.userService.getUserData();
    if (this.loggedUser != "no") {
      this.getJobProfile();
    } else {
      this.authService.logout();
      this.router.navigate(["login"]);
    }
  }

  ngOnInit() {
    this.spinner.show();
  }

  getJobProfile() {
    this.spinner.show();
    this.bidEventService.getJobProfiles().subscribe(
      (data: JobProfile[]) => {
        if (data.length > 0) {
          this.jp = data;
          this.spinner.hide();
          this.noJp = false;
        } else {
          this.spinner.hide();
          this.noJp = true;
        }
      },
      error => {
        this.spinner.hide();
        console.log(error);
      }
    );
  }

  select(item) {
    // console.log(item);
    localStorage.setItem("jp_id", item);
    this.router.navigate(["employer/edit-job-profile"]);
  }

  onSelected(jobProfile: IJobProfile) {
    //console.log(jobProfile);
  }
}
