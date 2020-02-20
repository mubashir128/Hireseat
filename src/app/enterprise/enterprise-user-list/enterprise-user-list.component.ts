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
  constructor(
    private enterprise: EnterpriseService,
    private userAuth: AuthenticationService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.enterprise.getAllEnterpriseUsers().subscribe(
      response => {
        if (response) {
          this.noBiddingEvents = false;
          console.log(response);
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
              this.router.navigate(["employer/bidding-event-list"]);
            } else if (response.userInfo.userRole == "recruiter") {
              this.router.navigate(["recruiter/bidding-event-list"]);
            } else if (response.userInfo.userRole == "admin") {
              // this.router.navigate(["user-list"]);
              // enterprise won't get this user
            } else if (response.userInfo.userRole == "super-admin") {
              // this.router.navigate(["super-admin/user-list"]);
              // enterprise won't get this user
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
}
