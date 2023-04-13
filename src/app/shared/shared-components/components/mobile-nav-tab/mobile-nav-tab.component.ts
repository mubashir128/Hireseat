import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Tab2 } from 'src/app/recruiter/models/tab2';
import { ConstantsService } from 'src/app/_services/constants.service';
import { SubscriberslistService } from 'src/app/_services/subscriberslist.service';
import { UserService } from 'src/app/_services/user.service';
import { WebsocketService } from 'src/app/_services/websocket.service';

@Component({
  selector: 'app-mobile-nav-tab',
  templateUrl: './mobile-nav-tab.component.html',
  styleUrls: ['./mobile-nav-tab.component.css']
})
export class MobileNavTabComponent implements OnInit, OnDestroy {

  tabs2: Tab2[];

  loggedInUser: any;
  isLoggedIn: boolean = false;
  isEmployer: boolean = false;
  isRecruiter: boolean = false;
  isCandidate: boolean = false;
  isAdmin: boolean = false;
  isSuperAdmin: boolean = false;
  isEnterprise: boolean = false;

  notificationLength = 0;
  multiSharedCandidateProfileCount = 0;

  pendingIntroduceCount = 0;

  mobileNotificationIncrementObserver = new Subject();
  mobileNotificationIncrementObserver$ = this.mobileNotificationIncrementObserver.asObservable();

  multiSharedCandidateProfileCountObserver = new Subject();
  multiSharedCandidateProfileCountObserver$ = this.multiSharedCandidateProfileCountObserver.asObservable();

  constructor(private userService: UserService, private router: Router, private _subList : SubscriberslistService, private _socket: WebsocketService, private _constants : ConstantsService) {
    this.tabs2 = [];
    this.loggedInUser = this.userService.getUserData();
    if(this.loggedInUser != "no"){
      this.isLoggedIn = true;
      if(this.loggedInUser.userRole == "employer"){
        this.isEmployer = true;
        this.forEmploerMobileTab();
      }else if (this.loggedInUser.userRole == "recruiter"){
        this.isRecruiter = true;
        this.forRecrutierMobileTab();
      }else if (this.loggedInUser.userRole == "candidate"){
        this.isCandidate = true;
        this.forCandidateMobileTab();
      }else if(this.loggedInUser.userRole == "admin") {
        this.isAdmin = true;
      }else if(this.loggedInUser.userRole == "super-admin") {
        this.isSuperAdmin = true;
        this.forSuperAdminMobileTab();
      } else if(this.loggedInUser.userRole == "enterprise") {
        this.isEnterprise = true;
        this.forAdminMobileTab();
      }
    }else{
      this.forNoUserMobileTab();
    }
  }

  async ngOnInit(){
    if(this.loggedInUser != "no" && !this.isSuperAdmin){
      this.getNotificationCount();
      this.getMultiSharedCandidateProfileCount();
    }

    this.SelectItem2(this.router.url);
    this._subList.decreaseNotificationCountObj$.subscribe((res : any)=>{
      this.notificationLength = res.notificationLength;
    });

    //add a observable for notificaton
    await this._socket.removeListener({ type: this._constants.mobileNotificationIncrementType });
    this._socket.addListener({
      type: this._constants.mobileNotificationIncrementType,
      callback: this.mobileNotificationIncrementObserver,
    });

    //when any activity of notification is happened, then this observable is called.
    this.mobileNotificationIncrementObserver$.subscribe((res: any) => {
      this.handleNotificationData(res);
    });

    //add a observable for multiSharedCandidateProfileCount
    await this._socket.removeListener({ type: this._constants.multiSharedCandidateProfileCount });
    this._socket.addListener({
      type: this._constants.multiSharedCandidateProfileCount,
      callback: this.multiSharedCandidateProfileCountObserver,
    });

    //when any activity of multi shared candidate profile is happened, then this observable is called.
    this.multiSharedCandidateProfileCountObserver$.subscribe((res: any) => {
      this.handleMultiSharedCandidateProfileCountData(res);
    });

  }

  //handle notifications of user.
  handleNotificationData(res: any) {
    switch (res.subType) {
      case this._constants.getMobileNotificationIncrementType:
        this.notificationLength += 1;
        break;
      case this._constants.pendintIntroduceCount:
        this.pendingIntroduceCount += 1;
        break;
      default:
        break;
    }
  }

  handleMultiSharedCandidateProfileCountData(res){
    switch (res.subType) {
      case this._constants.multiSharedCandidateProfileCountType:
        this.multiSharedCandidateProfileCount += 1;
        break;
      default:
        break;
    }
  }

  getNotificationCount(){
    this.userService.getUserNotificationCunt(this.userService.getUserData().userRole).subscribe((res: any) => {
      this.notificationLength = res.count;
    });
  }

  getMultiSharedCandidateProfileCount(){
    this.userService.getMultiSharedCandidateProfileCount(this.userService.getUserData().userRole).subscribe((res: any) => {
      this.multiSharedCandidateProfileCount = res.count;
    });
  }

  forEmploerMobileTab(){
    //for mobile view
    this.tabs2.push(new Tab2("/employer/share-candidate-profile", "Shared Profile", false, "fas fa-users"));

    this.tabs2.push(
      new Tab2("/employer/multi-share-candidate-profile", "Multi Shared Candidate Profile", true, "fas fa-user-friends")
    );

    this.tabs2.push(
      new Tab2("/employer/bidding-event-list", "Jobs", false, "fas fa-search")
    );
    
    this.tabs2.push(
      new Tab2("/employer/notification", "Notification", false, "fas fa-bell")
    );
    
    this.tabs2.push(
      new Tab2("/employer/menus", "Menu", false, "fas fa-bars")
    );
  }

  forRecrutierMobileTab(){
    //for mobile view
    this.tabs2.push(
      new Tab2("/recruiter/share-candidate-profile", "Candidates", true, "fas fa-users")
    );

    this.tabs2.push(
      new Tab2("/recruiter/multi-share-candidate-profile", "Multi Shared Candidate Profile", true, "fas fa-user-friends")
    );

    this.tabs2.push(
      new Tab2("/recruiter/bidding-event-list", "Jobs", false, "fas fa-search")
    );
    this.tabs2.push(
      new Tab2("/recruiter/notification", "Notification", false, "fas fa-bell")
    );
    this.tabs2.push(new Tab2("/recruiter/menus", "Menu", false, "fas fa-bars"));
  }

  forCandidateMobileTab(){
    //for mobile view
    this.tabs2.push(
      new Tab2(
        "/candidate/my-posted-profiles",
        "My Posted Profiles",
        true,
        "fas fa-user"
      )
    );
    
    this.tabs2.push(
      new Tab2("/candidate/all-only-candidate-shared-profile", "OnlyCandidateSharedProfile", false, "fas fa-user-friends")
    );

    this.tabs2.push(
      new Tab2("/candidate/bidding-event-list", "Jobs", false, "fas fa-search")
    );
    this.tabs2.push(
      new Tab2("/candidate/notification", "Notification", false, "fas fa-bell")
    );
    this.tabs2.push(
      new Tab2("/candidate/menus", "Menu", false, "fas fa-user")
    );
  }

  forSuperAdminMobileTab(){
    this.tabs2.push(
      new Tab2("/super-admin/user-list", "Jobs", false, "fas fa-home")
    );
    this.tabs2.push(
      new Tab2("/super-admin/create-admin", "Create Admin", false, "fas fa-plus")
    );
    this.tabs2.push(
      new Tab2("/super-admin/create-enterprise", "Menu", false, "fas fa-network-wired")
    );

    this.tabs2.push(
      new Tab2("/super-admin/notification", "Notification", false, "fas fa-bell")
    );
    this.tabs2.push(
      new Tab2("/super-admin/menus", "Menu", false, "fas fa-bars")
    );
  }

  forAdminMobileTab(){
    console.log("forAdminMobileTab : ");
  }

  forNoUserMobileTab(){
    // this.tabs2.push(
    //   new Tab2("/login", "Sign Up", false, "fas fa-home")
    // );
    // this.tabs2.push(
    //   new Tab2("/login", "Login", false, "fas fa-bell")
    // );

    // this.tabs2.push(
    //   new Tab2("/menus", "Menu", false, "fas fa-bars")
    // );
  }

  SelectItem2(item) {
    this.tabs2.forEach((tab) => {
      if (tab.id === item) {
        tab.selected = true;
      } else {
        tab.selected = false;
      }
    });
  }

  ngOnDestroy(){
    if(this.mobileNotificationIncrementObserver){
      this.mobileNotificationIncrementObserver.unsubscribe();
    }
  }

  changeLogo(tab){
    tab.showCreatedLogo = true;
  }

}
