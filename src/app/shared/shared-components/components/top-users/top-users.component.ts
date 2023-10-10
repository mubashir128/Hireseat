import { Component, Input, OnInit } from '@angular/core';
import { TimelineService } from 'src/app/_services/timeline.service';

@Component({
  selector: 'app-top-users',
  templateUrl: './top-users.component.html',
  styleUrls: ['./top-users.component.css']
})
export class TopUsersComponent implements OnInit {

  dataSource: any;

  displayedColumns: string[] = ['number', 'fullName', 'weekIntrosCount', 'totalIntrosCount'];
  userList: any[] = [];

  constructor(
    private _timelineService: TimelineService
  ) { }

  ngOnInit(): void {
    this.getTopIntrosUserList();
  }

  getTopIntrosUserList() {
    this._timelineService.allSlotIntrosCount().subscribe(res => {
      this.insertTopIntrosUserList(res);
    });
  }

  insertTopIntrosUserList(data) {
    data?.forEach((item, index) => {
      this.userList.push({
        number: index + 1,
        _id: item?.candidate_id?._id,
        fullName: item?.candidate_id?.fullName,
        profileimage: item?.candidate_id?.profileimage,
        introduceCount : item?.introduceCount,
        count: item?.count
      });
    });
    this.dataSource = this.userList;
  }

}
