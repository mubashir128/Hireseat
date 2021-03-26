import { Component, OnInit } from '@angular/core';
import { Tab } from "src/app/recruiter/models/tab";
import { Tab2 } from 'src/app/recruiter/models/tab2';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit {

  tabs2: Tab2[];
  constructor() {
    this.tabs2 = [];
  }

  ngOnInit(): void {
    this.tabs2.push(new Tab2("/home", "Home", true, "fas fa-home"));
    this.tabs2.push(new Tab2("/forum", "Ask a Recruiter  ", false, "fas fa-network-wired"));
    this.tabs2.push(new Tab2("/candidate/all-recruiters", "Candidate", false, "fas fa-plus"));
    this.tabs2.push(new Tab2("/blog", "Blog", false, "fas fa-bell"));
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
