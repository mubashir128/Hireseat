import { Component, OnInit, Input } from "@angular/core";
import { SuperAdminService } from "../../_services/super-admin.service";
import { AuthenticationService } from "../../_services/authentication.service";
import { UserService } from "../../_services/user.service";
import { Router } from "@angular/router";
import { EnterpriseService } from "src/app/_services/enterprise.service";
declare var Materialize: any;
@Component({
  selector: "app-enterprise-user-list",
  templateUrl: "./enterprise-user-list.component.html",
  styleUrls: ["./enterprise-user-list.component.css"]
})
export class EnterpriseUserListComponent implements OnInit {
  userList: any[];
  noBiddingEvents: boolean = true;
  public chkLoggedInUser: any;

  constructor(
    private enterprise: EnterpriseService,
    private userAuth: AuthenticationService,
    private userService: UserService,
    private router: Router,
    public supperAdmin: SuperAdminService,
    private _AuthService: AuthenticationService,
  ) {
    this.chkLoggedInUser = this.userService.getUserData();
  }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.enterprise.getAllEnterpriseUsers().subscribe(
      response => {
        if (response) {
          this.noBiddingEvents = false;
          this.userList = response;
        } else {
          this.noBiddingEvents = true;
          console.log("no data received");
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  loginUser(userEmail) {
    localStorage.setItem(
      "enterprise-email",
      this.userService.getUserData().email
    );
    this.userAuth.logoutWithoutNavigate();
    /* localStorage.removeItem('super-admin-email'); */
    this.enterprise
      .unSecureEnterpriseEmployerLogin({ email: userEmail })
      .subscribe(
        response => {
          if (response) {
            if (response.userInfo.userRole == "employer") {
              this.router.navigate(["employer/dashboard"]);
            } else if (response.userInfo.userRole == "recruiter") {
              this.router.navigate(["recruiter/bidding-event-list"]);
            } else if (response.userInfo.userRole == "enterprise") {
              this.router.navigate(["enterprise/user-list"]);
            }
          } else {
            Materialize.toast("Enter valid details", 1000, "rounded");
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  logoutSA() {
    this.supperAdmin
      .unSecureLogin({ email: localStorage.getItem("super-admin-email") })
      .subscribe(
        response => {
          if (response) {
            localStorage.removeItem("super-admin-email");
            this.router.navigate(["super-admin/user-list"]);
          }
        },
        error => {
          this._AuthService.logout();
          console.log(error);
        }
      );
  }

}
