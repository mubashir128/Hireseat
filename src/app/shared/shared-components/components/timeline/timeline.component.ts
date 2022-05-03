import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ConstantsService } from 'src/app/_services/constants.service';
import { SubscriberslistService } from 'src/app/_services/subscriberslist.service';
import { UserService } from 'src/app/_services/user.service';
import { WebsocketService } from 'src/app/_services/websocket.service';
import { DialogSelectToAddFriendsComponent } from '../dialog-select-to-add-friends/dialog-select-to-add-friends.component';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  timelines = [];

  // observer
  timelineObserver = new Subject();
  timelineObserver$ = this.timelineObserver.asObservable();

  loggedUser: any;

  constructor(
    private _constants: ConstantsService,
    private _socket: WebsocketService,
    private _router: Router,
    private userService: UserService,
    private _subList: SubscriberslistService,
    public _dialog: MatDialog
  ) {
    this.loggedUser = this.userService.getUserData();
  }

  async ngOnInit(){
    await this._socket.removeListener({ type: this._constants.timelineType });
    this._socket.addListener({
      type: this._constants.timelineType,
      callback: this.timelineObserver,
    });

    this.getAllTimelines();

    this.timelineObserver$.subscribe((res: any) => {
      this.handleTimelineData(res);
    });

    this.checkSelctToAddFriends();
  }

  checkSelctToAddFriends(){
    let status = JSON.parse(this.userService.getSelectToAddFriends());
    if(status){
      const dialogRef = this._dialog.open(DialogSelectToAddFriendsComponent, {
        autoFocus: false,
        width: '45vh',
        data: {
          dialogType : "selectToAddFriend",
          dialogTitle : "Select to add friends..."
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
      });
    }
  }

  getAllTimelines(){
    this._subList.loaderListAfterSearch.next({type : "222"});
    this._socket.sendMessage({
      type: this._constants.timelineType,
      data: {
        subType: this._constants.getTimelinesType,
      },
    });
  }

  handleTimelineData(res){
    switch (res.subType) {
      case this._constants.getTimelinesType:
        if(res.data){
          this.timelines = res.data.reverse();
        }
        this._subList.loaderListAfterSearch.next({type : "000"});
        break ;
      default : 
        break ;
    }
  }

  introProfile(timeline, prop1, prop2){
    let profileId = timeline[prop1]?._id;
    let fullName = timeline[prop2]?.fullName;
    this._router.navigate(["/"+this.loggedUser.userRole+"/all-only-candidate-shared-profile"], {queryParams : {profileId : profileId, fullName : fullName}});
  }

  ngOnDestroy() {
    this._socket.removeListener({ type: this._constants.timelineType });
    this.timelineObserver.unsubscribe();
    this.userService.removeSelectToAddFriends();
  }

}
