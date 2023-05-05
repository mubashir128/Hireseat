import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Tab } from "src/app/recruiter/models/tab";
import { Tab2 } from 'src/app/recruiter/models/tab2';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { DataExportsService } from 'src/app/_services/data.exports.service';
import { SuperAdminService } from 'src/app/_services/super-admin.service';
import { UserService } from 'src/app/_services/user.service';
import { App } from '@capacitor/app';
import { SubscriberslistService } from 'src/app/_services/subscriberslist.service';
import { WebsocketService } from 'src/app/_services/websocket.service';
import { ConstantsService } from 'src/app/_services/constants.service';
import { Subject } from 'rxjs';
import { DialogSelectUserToExportComponent } from '../dialog-select-user-to-export/dialog-select-user-to-export.component';
import { DialogDeleteUsersComponent } from '../dialog-delete-users/dialog-delete-users.component';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit {

  tabs2: Tab2[];

  loggedInUser: any;
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  isSuperAdmin: boolean = false;
  isEnterprise: boolean = false;

  appInfo;
  currVersion = '1.0.0';

  notificationLength = 0;

  mobileNotificationIncrementObserver = new Subject();
  mobileNotificationIncrementObserver$ = this.mobileNotificationIncrementObserver.asObservable();

  constructor(private userService: UserService, 
    private authService:AuthenticationService, 
    public supperAdmin: SuperAdminService, 
    private router: Router,
    private _subList : SubscriberslistService,
    private _socket: WebsocketService,
    private _constants : ConstantsService,
    private _exportsService : DataExportsService,
    public _dialog: MatDialog
  ) {
    this.tabs2 = [];
    this.loggedInUser = this.userService.getUserData();
    if (this.loggedInUser != "no") {
      this.isLoggedIn = true;
      if (this.loggedInUser.userRole == "employer") {
        this.employerMenuTabs();
      }else if (this.loggedInUser.userRole == "recruiter") {
        this.recruiterMenuTabs();
      }else if(this.loggedInUser.userRole == "candidate") {
        this.getIAmAsARecruiterOrNot();
        this.candidateMenuTabs();
      }else if(this.loggedInUser.userRole == "admin") {
        this.isAdmin = true;
        this.adminMenuTab();
      }else if(this.loggedInUser.userRole == "super-admin") {
        this.isSuperAdmin = true;
        this.superAdminMenuTab();
      } else if(this.loggedInUser.userRole == "enterprise") {
        this.isEnterprise = true;
        this.enterpriseMenuTab();
      }
    }else{
      this.noUserMenuTabs();
    }
  }

  async ngOnInit(){
    this.getNotificationCount();

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
    this.appInfo = await App.getInfo();
    this.currVersion = this.appInfo ? this.appInfo.version : this.currVersion;
  }

  //handle notifications of user.
  handleNotificationData(res: any) {
    switch (res.subType) {
      case this._constants.getMobileNotificationIncrementType:
        this.notificationLength += 1;
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

  employerMenuTabs(){
    this.tabs2.push(new Tab2("/home", "Home", true, "fas fa-home"));
    this.tabs2.push(new Tab2("/forum", "Ask a Recruiter 24/7", false, "fas fa-network-wired"));
    this.tabs2.push(new Tab2("/blog", "Blog", false, "fas fa-bell"));

    this.tabs2.push(new Tab2("/employer/user-chat", "Employer Chat", false, "fas fa-comment"));

    this.tabs2.push(new Tab2("/employer/job-profile-list", "Job Profile", false, "fas fa-shopping-bag"));
    this.tabs2.push(new Tab2("/employer/video-interview-room", "Video Interview Room", false, "fas fa-shopping-bag"));
    this.tabs2.push(new Tab2("/employer/mycandidates", "My Candidiate", false, "fas fa-plus"));
    this.tabs2.push(new Tab2("/employer/profile", "Profile", false, "fas fa-plus"));

    this.tabs2.push(new Tab2("/home", "Version - " + this.currVersion, false, "fas fa-plus"));

    if(!this.supperAdmin.checkSuperAdminEmail()){
      this.tabs2.push(new Tab2("/home", "Logout", false, "fas fa-plus"));
    }
  }

  recruiterMenuTabs(){
    this.tabs2.push(new Tab2("/home", "Home", true, "fas fa-home"));
    this.tabs2.push(new Tab2("/recruiter/dashboard", "Dashboard", false, "fas fa-network-wired"));
    // this.tabs2.push(new Tab2("/blog", "Blog", false, "fas fa-bell"));
    
    this.tabs2.push(new Tab2("/forum", "Ask a Recruiter 24/7", false, "fas fa-question"));
    
    this.tabs2.push(
      new Tab2("/recruiter/all-recruiters", "Recruiters", true, "fas fa-home")
    );
    this.tabs2.push(new Tab2("/recruiter/job-profile-list", "Job Profile", false, "fas fa-shopping-bag"));
    this.tabs2.push(new Tab2("/recruiter/won-bids", "Selected Candidiate", false, "fas fa-shopping-bag"));
    
    this.tabs2.push(new Tab2("/recruiter/resume-list", "My Candidiate", false, "fas fa-plus"));
    // this.tabs2.push(new Tab2("/recruiter/waiting-list", "Waiting List", false, "fas fa-shopping-bag"));
    // this.tabs2.push(new Tab2("/recruiter/search-resume", "Resume Bank", false, "fas fa-shopping-bag"));
    this.tabs2.push(new Tab2("/recruiter/video-interview-room", "Video Interview Room", false, "fas fa-shopping-bag"));
    // this.tabs2.push(new Tab2("/recruiter/calendar", "Calendar", false, "fas fa-shopping-bag"));
    this.tabs2.push(new Tab2("/recruiter/profile", "Profile", false, "fas fa-plus"));

    this.tabs2.push(new Tab2("/recruiter/settings", "Settings", false, "fas fa-cogs"));
    
    this.tabs2.push(new Tab2("/home", "Version - " + this.currVersion, false, "fas fa-plus"));

    if(!this.supperAdmin.checkSuperAdminEmail()){
      this.tabs2.push(new Tab2("/home", "Logout", false, "fas fa-plus"));
    }
  }
  
  candidateMenuTabs(){
    this.tabs2.push(new Tab2("/candidate/my-posted-profiles", "My Profiles", true, "fas fa-user"));

    // this.tabs2.push(new Tab2("/candidate/my-profile", "Profile", true, "fas fa-user"));
    this.tabs2.push(new Tab2("/Product Walkthrough", "Product Walkthrough", false, "fas fa-info"));
    
    // this.tabs2.push(new Tab2("/candidate/my-profile", "Profile", true, "fas fa-user"));
    // this.tabs2.push(new Tab2("/candidate/user-chat", "Candidate Chat", false, "fas fa-comment"));
    
    this.tabs2.push(
      new Tab2("/candidate/notification", "Notification", false, "fas fa-bell")
    );
    // this.tabs2.push(new Tab2("/candidate/friends-connections", "My Connections", true, "fas fa-user"));
    
    this.tabs2.push(new Tab2("/candidate/fill-form", "Career Value Finder", false, "fas fa-shopping-bag"));
    this.tabs2.push(new Tab2("/forum", "Ask a Recruiter 24/7", false, "fas fa-shopping-bag"));
    this.tabs2.push(new Tab2("/candidate/all-recruiters", "Recruiters", false, "fas fa-user-alt"));
    // this.tabs2.push(new Tab2("/home", "Home", true, "fas fa-home"));

    this.tabs2.push(new Tab2("/candidate/applied-jobs", "Applied jobs", true, "fas fa-user"));

    // this.tabs2.push(new Tab2("/candidate/bidding-event-list", "Jobs", false, "fas fa-search"));
    this.tabs2.push(new Tab2("/candidate/settings", "Settings", false, "fas fa-cogs"));

    this.tabs2.push(new Tab2("/candidate/conference-room", "Conference room", false, "fas fa-cogs"));

    if(!this.supperAdmin.checkSuperAdminEmail()){
      this.tabs2.push(new Tab2("/home", "Logout", false, "fas fa-plus"));
    }
    
    // this.tabs2.push(new Tab2("/blog", "Blog", false, "fas fa-bell"));
    // this.tabs2.push(new Tab2("/candidate/my-reviewed-profiles", "My Reviews Profiles", false, "fas fa-shopping-bag"));
    // this.tabs2.push(new Tab2("/candidate/interview-room", "Interview Room", false, "fas fa-question"));

    this.tabs2.push(new Tab2("/home", "Version - " + this.currVersion, false, "fas fa-plus"));
  }

  superAdminMenuTab(){
    this.tabs2.push(new Tab2("/home", "Home", true, "fas fa-home"));
    this.tabs2.push(new Tab2("/forum", "Ask a Recruiter 24/7", false, "fas fa-network-wired"));
    this.tabs2.push(new Tab2("/blog", "Blog", false, "fas fa-bell"));

    this.tabs2.push(new Tab2("/super-admin/user-list", "Super Admin Dashboard", false, "fas fa-plus"));

    this.tabs2.push(new Tab2("/super-admin/post-job", "Post Job", false, "fas fa-plus"));
    
    this.tabs2.push(new Tab2("/home", "Logout", false, "fas fa-plus"));

    this.tabs2.push(new Tab2("/home", "Version - " + this.currVersion, false, "fas fa-plus"));
    
    this.tabs2.push(new Tab2("api/export-user", "Export User", false, "fas fa-file-export"));

    this.tabs2.push(new Tab2("/super-admin/create-event", "Create event", false, "fas fa-network-wired"));

    this.tabs2.push(new Tab2("api/delete-users", "Delete Users", false, "fas fa-trash"));
  }

  adminMenuTab(){

  }

  enterpriseMenuTab(){

  }

  noUserMenuTabs(){
    this.tabs2.push(new Tab2("/home", "Home", true, "fas fa-home"));
    this.tabs2.push(new Tab2("/forum", "Ask a Recruiter 24/7", false, "fas fa-network-wired"));
    this.tabs2.push(new Tab2("/blog", "Blog", false, "fas fa-bell"));
  }

  //for mobile view
  SelectItem2(item, text) {
    if(text === 'Logout'){
      this.authService.logout();
    }else if(text == 'Product Walkthrough'){
      this.userService.removeBeforeMyProfileWalkthrough();
      this.userService.removeOnlyCandidateWalkthroughWalkthrough();
      this.router.navigate([this.loggedInUser.userRole+'/my-profile']);
    }else if(text == 'Export User'){
      this.selectUserToExport(item);
    }else if(text == 'Delete Users'){
      this.deleteUsers(item);
    }else{
      this.router.navigate([item]);
    }

    // this.tabs2.forEach((tab) => {
    //   if (tab.id === item){
    //     tab.selected = true;
    //   }else{
    //     tab.selected = false;
    //   }
    // });


  }

  selectUserToExport(item){
    const dialogIntroduceRef = this._dialog.open(DialogSelectUserToExportComponent, {
      data: {
        dialogType : "selectUserToExport",
        dialogTitle : "Select User"
      }
    });

    dialogIntroduceRef.afterClosed().subscribe(result => {
      if(result){
        let promises = this._exportsService.exportXlsxData(item, result.type).toPromise();
        promises.then(result=>{
          console.log("result : ",result);
        });
      }
    });
  }

  deleteUsers(item){
    const dialogDeleteUserRef = this._dialog.open(DialogDeleteUsersComponent, {
      data: {
        dialogType : "selectUserToDelete",
        dialogTitle : "Select User"
      }
    });
    dialogDeleteUserRef.afterClosed().subscribe(result => {
      if(result){
        this.router.navigate([this.loggedInUser.userRole+'/all-user-list'], { queryParams: { type: result.type}});
      }
    });
  }

  getIAmAsARecruiterOrNot(){
    let promises = [];
    promises.push(this.userService.getUsersById().toPromise());
    Promise.all(promises).then(result => {
      if(result){
        this.tabs2.splice(7, 0, new Tab2("/candidate/my-post-jobs", "My jobs List", true, "fas fa-user"));
      }
    });
  }

  ngOnDestroy(){
    if(this.mobileNotificationIncrementObserver){
      this.mobileNotificationIncrementObserver.unsubscribe();
    }
  }

}
