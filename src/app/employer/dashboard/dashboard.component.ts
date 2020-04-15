import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  jobListing: any;

  constructor() {
    this.jobListing = [
      {
        id: 1,
        name: 'abcd',
        jobTitle: 'abcd'
      },
      {
        id: 2,
        name: 'kjasdf',
        jobTitle: 'abcd'
      },
      {
        id: 3,
        name: 'ppddj',
        jobTitle: 'abcd'
      },
      {
        id: 4,
        name: 'asdk',
        jobTitle: 'abcd'
      },
      {
        id: 5,
        name: 'pqrs',
        jobTitle: 'abcd'
      }
    ]
  }

  ngOnInit() {
  }

}
