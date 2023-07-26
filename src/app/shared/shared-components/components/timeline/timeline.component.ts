import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ConstantsService } from 'src/app/_services/constants.service';
import { SubscriberslistService } from 'src/app/_services/subscriberslist.service';
import { TimelineService } from 'src/app/_services/timeline.service';
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

  showLoader: boolean = true;
  profileImageLength: number = 5;

  selector: string = ".timelineList";

  pageSize: number = 10;
  pageIndex: number = 0;

  constructor(
    private _constants: ConstantsService,
    private _socket: WebsocketService,
    private _router: Router,
    private userService: UserService,
    private _subList: SubscriberslistService,
    public _dialog: MatDialog,
    private _timelineService: TimelineService
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
    this._subList.loaderListAfterSearch.next({type : "222"});
    this._socket.sendMessage({
      type: this._constants.timelineType,
      data: {
        subType: this._constants.getTimelinesType,
        pageIndex : this.pageIndex,
        pageSize : this.pageSize
      },
    });
  }

  handleTimelineData(res){
    switch (res.subType) {
      case this._constants.getTimelinesType:
        this.showLoader = false;
        if(res.data){
          this.timelines = [...this.timelines, ...res.data];
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

    let url = "/all-only-candidate-shared-profile";
    if(this.loggedUser.userRole == "recruiter"){
      url = "/share-candidate-profile";
    }
    this._router.navigate(["/"+this.loggedUser.userRole + url], {queryParams : {profileId : profileId, fullName : fullName}});
  }
  
  goToPeopleEvent(peopleEventId){
    this._router.navigate(["/" + this.loggedUser.userRole + "/suggest-and-events"], { queryParams: { eventRoute: 1, eventId : peopleEventId._id}});
  }

  goToIntroducePage(timeline){
    let fromId = timeline?.fromId?._id;
    let introduceId = timeline?.introduceId?._id;
    let toId = timeline?.toId?._id;

    let url = "/suggest-connected-friends";
    this._router.navigate(["/"+this.loggedUser.userRole + url], {queryParams : {fromId : fromId, introduceId: introduceId, toId : toId, type: 1}});
  }

  goToJobPosts(timeline){
    let postJobId = timeline?.postJobId?._id;
    let url = "/suggest-introduce";
    this._router.navigate( [ "/" + this.loggedUser.userRole + url ], { queryParams : { postJobId : postJobId } } );
  }

  onLinkedIn(user){
    this.userService.getUserDetails({ receiverId: user._id }).subscribe((res : any)=>{
      let link = res?.data?.candidate_id?.linkedIn;
      if (link.includes("https")) {
        window.open(link, "_blank");
      } else {
        window.open("https://" + link, "_blank");
      }
    });
  }

  checkLikedOrNot(timeline){
    let liked: boolean = false;
    let users = timeline?.liked ? timeline?.liked : [];
    for(let user of users){
      if(user?.userId?._id?.toString() == this.loggedUser?._id){
        liked = true;
      }
    }
    return liked;
  }

  likedUsers(timeline){
    timeline.showLikedUsers = !timeline.showLikedUsers;
  }

  likeTimeline(timeline){
    let liked = this.checkLikedOrNot(timeline);
    if(liked){
      console.log("already liked : ");
      return ;
    }

    this._timelineService.likeTimeline(timeline._id).subscribe(res=>{
      if(res){
        this.addLiketoTimeline(res);
      }
    }, err=>{
      console.log(err);
    });
  }

  addLiketoTimeline(resTimeline){
    this.timelines.filter((timeline) => {
      if (timeline?._id?.toString() === resTimeline?._id?.toString()) {
        timeline.liked = [...resTimeline.liked];
      }
    });
  }

  //when timeline DIV is scrolled, then call to get next limit timelines.
  onScroll() {
    this.pageIndex++;
    this.getAllTimelines();
  }

  ngOnDestroy() {
    this._socket.removeListener({ type: this._constants.timelineType });
    this.timelineObserver.unsubscribe();
  }

}
