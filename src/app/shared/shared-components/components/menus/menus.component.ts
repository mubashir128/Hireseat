import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tab } from "src/app/recruiter/models/tab";
import { Tab2 } from 'src/app/recruiter/models/tab2';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { SuperAdminService } from 'src/app/_services/super-admin.service';
import { UserService } from 'src/app/_services/user.service';

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

  constructor(private userService: UserService, private authService:AuthenticationService, public supperAdmin: SuperAdminService, private router: Router) {
    this.tabs2 = [];
    this.loggedInUser = this.userService.getUserData();
    if (this.loggedInUser != "no") {
      this.isLoggedIn = true;
      if (this.loggedInUser.userRole == "employer") {
        this.employerMenuTabs();
      }else if (this.loggedInUser.userRole == "recruiter") {
        this.recruiterMenuTabs();
      }else if(this.loggedInUser.userRole == "candidate") {
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

  ngOnInit(): void {
  }

  employerMenuTabs(){
    this.tabs2.push(new Tab2("/home", "Home", true, "fas fa-home"));
    this.tabs2.push(new Tab2("/forum", "Ask a Recruiter", false, "fas fa-network-wired"));
    this.tabs2.push(new Tab2("/blog", "Blog", false, "fas fa-bell"));

    this.tabs2.push(new Tab2("/employer/user-chat", "Employer Chat", false, "fas fa-comment"));

    this.tabs2.push(new Tab2("/employer/job-profile-list", "Job Profile", false, "fas fa-shopping-bag"));
    this.tabs2.push(new Tab2("/employer/video-interview-room", "Video Interview Room", false, "fas fa-shopping-bag"));
    this.tabs2.push(new Tab2("/employer/mycandidates", "My Candidiate", false, "fas fa-plus"));
    this.tabs2.push(new Tab2("/employer/profile", "Profile", false, "fas fa-plus"));

    if(!this.supperAdmin.checkSuperAdminEmail()){
      this.tabs2.push(new Tab2("/home", "Logout", false, "fas fa-plus"));
    }
  }

  recruiterMenuTabs(){
    this.tabs2.push(new Tab2("/home", "Home", true, "fas fa-home"));
    this.tabs2.push(new Tab2("/recruiter/dashboard", "Dashboard", false, "fas fa-network-wired"));
    // this.tabs2.push(new Tab2("/blog", "Blog", false, "fas fa-bell"));
    
    this.tabs2.push(new Tab2("/forum", "Ask a Recruiter", false, "fas fa-question"));
    
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

    if(!this.supperAdmin.checkSuperAdminEmail()){
      this.tabs2.push(new Tab2("/home", "Logout", false, "fas fa-plus"));
    }
  }
  
  candidateMenuTabs(){
    this.tabs2.push(new Tab2("/candidate/my-profile", "Profile", true, "fas fa-user"));
    this.tabs2.push(new Tab2("/candidate/friends-connections", "My Connections", true, "fas fa-user"));
    this.tabs2.push(new Tab2("/candidate/user-chat", "Candidate Chat", false, "fas fa-comment"));
    this.tabs2.push(new Tab2("/candidate/fill-form", "Career Value Finder", false, "fas fa-shopping-bag"));
    this.tabs2.push(new Tab2("/forum", "Ask a Recruiter", false, "fas fa-shopping-bag"));
    this.tabs2.push(new Tab2("/candidate/all-recruiters", "Recruiters", false, "fas fa-user-alt"));
    this.tabs2.push(new Tab2("/home", "Home", true, "fas fa-home"));

    if(!this.supperAdmin.checkSuperAdminEmail()){
      // this.tabs2.push(new Tab2("/home", "Logout", false, "fas fa-plus"));
      this.tabs2.push(new Tab2("/home", "Version 11:11:1111", false, "fas fa-plus"));
    }
    
    // this.tabs2.push(new Tab2("/blog", "Blog", false, "fas fa-bell"));
    // this.tabs2.push(new Tab2("/candidate/my-reviewed-profiles", "My Reviews Profiles", false, "fas fa-shopping-bag"));
    this.tabs2.push(new Tab2("/candidate/interview-room", "Interview Room", false, "fas fa-question"));

    this.tabs2.push(new Tab2("/candidate/bidding-event-list", "Jobs", false, "fas fa-search"));
  }

  superAdminMenuTab(){
    this.tabs2.push(new Tab2("/home", "Home", true, "fas fa-home"));
    this.tabs2.push(new Tab2("/forum", "Ask a Recruiter", false, "fas fa-network-wired"));
    this.tabs2.push(new Tab2("/blog", "Blog", false, "fas fa-bell"));

    this.tabs2.push(new Tab2("/super-admin/user-list", "Super Admin Dashboard", false, "fas fa-plus"));
    this.tabs2.push(new Tab2("/home", "Logout", false, "fas fa-plus"));
  }

  adminMenuTab(){

  }

  enterpriseMenuTab(){

  }

  noUserMenuTabs(){
    this.tabs2.push(new Tab2("/home", "Home", true, "fas fa-home"));
    this.tabs2.push(new Tab2("/forum", "Ask a Recruiter", false, "fas fa-network-wired"));
    this.tabs2.push(new Tab2("/blog", "Blog", false, "fas fa-bell"));
  }

  //for mobile view
  SelectItem2(item, text) {
    if(text === 'Logout'){
      this.authService.logout();
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

}
