import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ConstantsService } from 'src/app/_services/constants.service';
import { UserService } from 'src/app/_services/user.service';
import { WebsocketService } from 'src/app/_services/websocket.service';

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
    private userService: UserService
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
  }

  getAllTimelines(){
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
        break ;
      default : 
        break ;
    }
  }

  introProfile(profileId){
    this._router.navigate(["/"+this.loggedUser.userRole+"/all-only-candidate-shared-profile"], {queryParams : {profileId : profileId}});
  }

  ngOnDestroy() {
    this._socket.removeListener({ type: this._constants.timelineType });
    this.timelineObserver.unsubscribe();
  }

}
