import { Component, OnInit } from '@angular/core';
import { Tab } from "src/app/recruiter/models/tab";
import { Tab2 } from 'src/app/recruiter/models/tab2';
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

  constructor(private userService: UserService) {
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
      }
    }
  }

  ngOnInit(): void {
  }

  employerMenuTabs(){

  }

  recruiterMenuTabs(){
    this.tabs2.push(new Tab2("/home", "Home", true, "fas fa-home"));
    this.tabs2.push(new Tab2("/forum", "Ask a Recruiter  ", false, "fas fa-network-wired"));
    this.tabs2.push(new Tab2("/blog", "Blog", false, "fas fa-bell"));
    
    this.tabs2.push(new Tab2("/recruiter/dashboard", "Dashboard", false, "fas fa-plus"));
    this.tabs2.push(new Tab2("/recruiter/share-candidate-profile", "Shared Profiles", false, "fas fa-shopping-bag"));
    this.tabs2.push(new Tab2("/recruiter/job-profile-list", "Job Profile", false, "fas fa-shopping-bag"));
    this.tabs2.push(new Tab2("/recruiter/won-bids", "Selected Candidiate", false, "fas fa-shopping-bag"));
    
    this.tabs2.push(new Tab2("/recruiter/resume-list", "My Candidiate", false, "fas fa-plus"));
    this.tabs2.push(new Tab2("/recruiter/waiting-list", "Waiting List", false, "fas fa-shopping-bag"));
    this.tabs2.push(new Tab2("/recruiter/search-resume", "Resume Bank", false, "fas fa-shopping-bag"));
    this.tabs2.push(new Tab2("/recruiter/video-interview-room", "Video Interview Room", false, "fas fa-shopping-bag"));
    this.tabs2.push(new Tab2("/recruiter/calendar", "Calendar", false, "fas fa-shopping-bag"));
  }
  
  candidateMenuTabs(){
    this.tabs2.push(new Tab2("/home", "Home", true, "fas fa-home"));
    this.tabs2.push(new Tab2("/forum", "Ask a Recruiter  ", false, "fas fa-network-wired"));
    this.tabs2.push(new Tab2("/blog", "Blog", false, "fas fa-bell"));

    this.tabs2.push(new Tab2("/candidate/all-recruiters", "Candidate", false, "fas fa-plus"));
    this.tabs2.push(new Tab2("/candidate/my-reviewed-profiles", "My Reviews Profiles", false, "fas fa-shopping-bag"));
    this.tabs2.push(new Tab2("/candidate/interview-room", "Interview Room", false, "fas fa-shopping-bag"));
    this.tabs2.push(new Tab2("/candidate/my-posted-profiles", "My Posted Profiles", false, "fas fa-shopping-bag"));
  }

  //for mobile view
  SelectItem2(item) {
    this.tabs2.forEach((tab) => {
      if (tab.id === item){
        tab.selected = true;
      }else{
        tab.selected = false;
      } 
    });
  }

}
