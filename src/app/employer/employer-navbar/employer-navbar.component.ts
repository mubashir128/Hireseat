
import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { Tab } from '../models/tab';
import { UserService } from 'src/app/_services/user.service';
import { IProfile } from 'src/app/profile/model/user-profile';
import { NgxSpinnerService } from 'ngx-spinner';
declare var jQuery: any;
declare var Materialize: any;
@Component({
  selector: 'app-employer-navbar',
  templateUrl: './employer-navbar.component.html',
  styleUrls: ['./employer-navbar.component.css']
})
export class EmployerNavbarComponent implements OnInit {
  public userProfile: IProfile;
  public type: number = 0;
  public tabs1: Tab[];
  constructor(private router: Router,private spinner: NgxSpinnerService,private userService: UserService) {
    this.tabs1 = [];
    this.tabs1.push(new Tab('/employer/job-profile-list', 'Job Profiles', false));
    this.tabs1.push(new Tab('/employer/bidding-event-list', 'Job Postings', false));
    /*  this.tabs1.push(new Tab('/employer/feedback-list', 'Active Job Postings Feedback',false)); */
  }

  ngOnInit() {
    this.getUsersProfile();
    jQuery('.button-collapse').sideNav({
      menuWidth: 300, // Default is 240
      closeOnClick: false // Closes side-nav on <a> clicks, useful for Angular/Meteor
    });

    this.SelectItem(this.router.url);
  }


  SelectItem(item) {
    this.tabs1.forEach(tab => {
      if (tab.id === item)
        tab.selected = true;
      else
        tab.selected = false;
    });

  }
  getUsersProfile() {
    this.userService.getUserProfile(this.userService.getUserData().userRole).subscribe((data: any) => {
      if (data != null && data != undefined && data != "") {
        this.userProfile = data.res;
      } else {
        Materialize.toast('Something went wrong', 1000)
      }
      this.spinner.hide();
    }, (error) => {
      console.log(error);
      this.spinner.hide();
    });
  }


}
