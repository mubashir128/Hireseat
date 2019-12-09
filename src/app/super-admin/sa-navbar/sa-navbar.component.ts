
import { Component, OnInit,Input } from '@angular/core';
import { Tab } from '../../employer/models/tab';
import { Router } from '@angular/router';
declare var jQuery: any;
@Component({
  selector: 'app-sa-navbar',
  templateUrl: './sa-navbar.component.html',
  styleUrls: ['./sa-navbar.component.css']
})
export class SANavbarComponent implements OnInit {

  public type: number = 0;
  public tabs1: Tab[];
  constructor(private router: Router) {
    this.tabs1 = [];
    /* this.tabs1.push(new Tab('/employer/job-profile-list', 'Tab 1', false)); */
    this.tabs1.push(new Tab('/super-admin/user-list', 'User List', true));
    /*  this.tabs1.push(new Tab('/employer/feedback-list', 'Active Job Postings Feedback',false)); */
  }

  ngOnInit() {
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

}
