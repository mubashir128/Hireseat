import { Component, OnInit, Input, ElementRef, OnDestroy } from "@angular/core";
import { UserService } from "../_services/user.service";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { AuthenticationService } from "../_services/authentication.service";
import { SuperAdminService } from "../_services/super-admin.service";
import { ForumService } from "../_services/forum.service";
import { BiddingEventService } from "src/app/_services/bidding-event.service";
import { EnterpriseService } from "../_services/enterprise.service";

import { WebsocketService } from "../_services/websocket.service";
import { Subject } from "rxjs";
import { PushNotificationService } from "../_services/push-notification.service";
import { SubscriberslistService } from "../_services/subscriberslist.service";
import { ConstantsService } from "../_services/constants.service";

import { FirebasePushNotificationService } from "src/app/_services/firebase-push-notification.service";

declare var Materialize: any;
declare var jQuery: any;
declare var $: any;
@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit, OnDestroy {
  path: any = "assets/img/navbar-logo.png";
  loggedInUser: any;
  commets = [];
  isLoggedIn: boolean = false;
  isEmployer: boolean = false;
  isRecruiter: boolean = false;
  isAdmin: boolean = false;
  isSuperAdmin: boolean = false;
  isEnterprise: boolean = false;
  isCandidate: boolean = false;
  status: boolean = false;
  url: any;

  showAdminDashboardButton: boolean = false;
  showEnterpriseDashboardButton: boolean = false;
  permaLink: any;
  candidate = false;

  userProfile: any;

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthenticationService,
    public supperAdmin: SuperAdminService,
    private route: ActivatedRoute,
    private _forum: ForumService,
    private bidEventService: BiddingEventService,
    private _socket: WebsocketService,
    private _eref: ElementRef,
    public enterpriseService: EnterpriseService,
    private _pushNotify: PushNotificationService,
    private _constants : ConstantsService,
    private _subList : SubscriberslistService,
    private _firebasePushNotificationService : FirebasePushNotificationService
  ) {
    this.permaLink = window.location.href;
    this.loggedInUser = this.userService.getUserData();
    if (this.loggedInUser != "no") {
      this.isLoggedIn = true;
      if (this.loggedInUser.userRole == "employer") {
        this.isEmployer = true;
        this._pushNotify.pushNotification();
      } else if (this.loggedInUser.userRole == "recruiter") {
        this.isRecruiter = true;
        this._pushNotify.pushNotification();
      } else if (this.loggedInUser.userRole == "admin") {
        this.isAdmin = true;
      } else if (this.loggedInUser.userRole == "super-admin") {
        this.isSuperAdmin = true;
      } else if (this.loggedInUser.userRole == "enterprise") {
        this.isEnterprise = true;
      } else if (this.loggedInUser.userRole == "candidate") {
        this.isCandidate = true;
        this._pushNotify.pushNotification();
      }
    }

    router.events.subscribe((val) => {
      // see also
      if (val instanceof NavigationEnd) {
        // hiding notification while changes in route

        if (val.url === "/video-call") {
          // console.log('On video call');
          if (!localStorage.getItem("currentUser")) {
            // console.log('****there is no user show candidates window');
            this.candidate = true;
          } else {
            // console.log('recruiter on video call');
            this.candidate = false;
          }
        }
      }
    });

    this.userService._setProfileObservable.subscribe((data) => {
      this.userProfile = data;
    });

  }

  async ngOnInit() {
    this.showAdminDashboardButton = false;
    this.showEnterpriseDashboardButton = false;

    //initiate a connection of socket at once when navbar is loaded.
    let obj = JSON.parse(localStorage.getItem("currentUser"));
    if (obj !== null) {
      await this.initSocket(obj.token, obj.userInfo.userRole);
    }

    //increse a points of user.
    this.userService.candidateProfileObservable$.subscribe((res: any) => {
      this.handleCandidateProfile(res);
    });

    if (this.loggedInUser.userRole == "employer") {
      this.showAdminDashboardButton = false;
      this.showEnterpriseDashboardButton = false;
      this.getUsersProfile();
    } else if (this.loggedInUser.userRole == "recruiter") {
      this.showAdminDashboardButton = false;
      this.showEnterpriseDashboardButton = false;
      this.getUsersProfile();
    } else if (this.loggedInUser.userRole == "super-admin") {
      this.showAdminDashboardButton = true;
      this.showEnterpriseDashboardButton = false;
    } else if (this.loggedInUser.userRole == "enterprise") {
      this.showEnterpriseDashboardButton = true;
      this.showAdminDashboardButton = false;
    } else {
      this.showAdminDashboardButton = false;
      this.showEnterpriseDashboardButton = false;
    }

    jQuery(document).ready(function () {
      jQuery(".button-collapse").sideNav();
    });
  }

  //initiate a connection through socket.
  async initSocket(token, userRole) {
    await this._socket.getInstance(token, userRole);
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
          // this.spinner.hide();
        },
        (error) => {
          console.log(error);
          // this.spinner.hide();
        }
      );
  }

  //increse points of user.
  handleCandidateProfile(obj){
    this.userProfile[obj.pointer] = obj.increseCount;
  }

  updateQueAns(id) {
    this._forum.updateQueAnsReadStatus(id).subscribe((data) => {});
  }

  navigate(path) {
    jQuery(".button-collapse").sideNav("hide");
    jQuery("body").css({ overflow: "", width: "" });
    jQuery("#sidenav-overlay").css("opacity", "0");
    this.router.navigate([path]);
  }

  logout() {
    if (this.loggedInUser.userRole == "candidate"){
    }
    this.authService.logout();
    this.isAdmin = false;
    this.isLoggedIn = false;
    this._socket.socketClosed();
  }
  
  //unscubscribe the subscribed variables.
  ngOnDestroy() {
  }

}
