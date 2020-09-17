import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/_services/user.service';
import { SuperAdminService } from 'src/app/_services/super-admin.service';
import { ForumService } from 'src/app/_services/forum.service';
declare var Materialize: any;

declare var jQuery: any;
declare var $: any;
@Component({
  selector: 'app-candidate-home',
  templateUrl: './candidate-home.component.html',
  styleUrls: ['./candidate-home.component.css']
})
export class CandidateHomeComponent implements OnInit {

  public chkLoggedInUser: any;
  public UserData: any;
  isOnProfile: boolean = false;
  public show: boolean = false;
  public buttonName: any = "Show";
  questData: any;
  questDataLenght: any = [];
  constructor(
    private _AuthService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private userService: UserService,
    public supperAdmin: SuperAdminService,
    private _forum: ForumService
  ) {
    this.chkLoggedInUser = this.userService.getUserData();
    // for live route
    // this.router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    // event.url === "/candidate"
    //   ? this.router.navigate(["candidate/my-profile"])
    //   : this.router.navigate(["/"])

    //   }
    // });
  }

  ngOnInit() {
    const checkSA = this.supperAdmin.checkSuperAdminEmail();

    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 500);

    // jQuery(".dropdown-button").dropdown({
    //   inDuration: 300,
    //   outDuration: 225,
    //   constrainWidth: false, // Does not change width of dropdown to that of the activator
    //   hover: false, // Activate on hover
    //   gutter: 0, // Spacing from edge
    //   belowOrigin: false, // Displays dropdown below the button
    //   alignment: "left", // Displays dropdown with edge aligned to the left of button
    //   stopPropagation: false // Stops event propagation
    // });
    this.UserData = this.userService.getUserData();
    if (this.chkLoggedInUser != "no") {
      if (this.chkLoggedInUser.userRole == "candidate") {
        if (this.router.url == "/candidate") {
          this.router.navigate(["candidate/all-recruiters"]);
        }
      }
    }

    // this._forum.getUnAnsweredData().subscribe(
    //   res => {
    //     this.questDataLenght = res;
    //   },
    //   err => console.log(err)
    // );
  }

  toggle() {
    this.show = !this.show;

    // CHANGE THE NAME OF THE BUTTON.
    if (this.show) this.buttonName = "Hide";
    else this.buttonName = "Show";
  }

  logout() {
    jQuery("body").css({ overflow: "", width: "" });
    jQuery("#sidenav-overlay").css("opacity", "0");
    this._AuthService.logout();
  }

  navigate(path) {
    jQuery(".button-collapse").sideNav("hide");
    jQuery("body").css({ overflow: "", width: "" });
    jQuery("#sidenav-overlay").css("opacity", "0");
    this.router.navigate([path]);
  }

  logoutSA() {
    // logout super admin
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
