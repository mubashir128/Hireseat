import { Component, OnInit } from '@angular/core';
import { SubscriberslistService } from 'src/app/_services/subscriberslist.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private _subList : SubscriberslistService) {
  }

  ngOnInit() {
    this._subList.activebidEvent.next({});
  }

}
