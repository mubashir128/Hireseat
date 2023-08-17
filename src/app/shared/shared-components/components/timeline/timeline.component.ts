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
import { DialogSelectToAddFriendsComponent } from '../dialog-select-to-add-friends/dialog-select-to-add-friends.component';
import { CandidateService } from 'src/app/_services/candidate.service';
import { ResumeService } from 'src/app/_services/resume.service';
import { ReadResumeService } from 'src/app/_services/read-resume.service';
import { FormGroup } from '@angular/forms';
import { AccomplishmentType } from '../edit-highlights/edit-highlights.component';

declare var Materialize: any;

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

  tagsBind = [];
  skillSets = [];
  resumeData: string = "";
  candidateProfile: any = {};
  finalSkillSets = [];

  comments : string = "";
  comment2 : string = "";
  comment3 : string = "";

  accomplishmentTabFrm: FormGroup;
  accomplishmentArray : Array<AccomplishmentType>;

  educationBindArray = [];
  educationBind: string = "";

  techMajorArray = [];
  techMajor: string = ""

  degreeArray = [];
  degree: string = "";

  industryBind = [];
  mainIndustriesAre = [];
  finalIndustriesAre = [];
  industriesAre = [];

  profileImageLength: number = 5;

  selector: string = ".timelineList";

  pageSize: number = 10;
  pageIndex: number = 0;

  itemsIs: number = 0;
  introsMadeCount: number = 0;
  myNetworkCount: number = 0;

  constructor(
    private _constants: ConstantsService,
    private _socket: WebsocketService,
    private _router: Router,
    private userService: UserService,
    private _subList: SubscriberslistService,
    public _dialog: MatDialog,
    private resumeService: ResumeService,
    private candidateService: CandidateService,
    private _readResume : ReadResumeService,
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

    this.checkSelctToAddFriends();
  }

  checkSelctToAddFriends(){
    let status = JSON.parse(this.userService.getSelectToAddFriends());
    let autoValueFinder = JSON.parse(this.userService.getAutoRunValueFinder());
    if(status){
      // this._router.navigate(["/"+this.loggedUser.userRole+"/friends-connections"]);
      this._router.navigate(["/"+this.loggedUser.userRole+"/my-profile"]);
      const dialogRef = this._dialog.open(DialogSelectToAddFriendsComponent, {
        autoFocus: false,
        width: '45vh',
        data: {
          dialogType : "selectToAddFriend",
          dialogTitle : "Select to add friends..."
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.showSkills();
        this.showIndustries();
      });
    }else if(autoValueFinder){
      this.showSkills();
      this.showIndustries();
    }
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

    this._socket.sendMessage({
      type: this._constants.timelineType,
      data: {
        subType: this._constants.getTimelinesTabsCount
      }
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
      case this._constants.getTimelinesTabsCount:
        this.introsMadeCount = res?.data?.introsMadeCount;
        this.myNetworkCount = res?.data?.myNetworkCount;
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
      url = "/candidate-profile";
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
    let url = "/suggest-and-events";
    this._router.navigate( [ "/" + this.loggedUser.userRole + url ], { queryParams : { postJobId : postJobId } } );
  }

  showSkills(){
    this.tagsBind = [];
    let promiseAll = [];
    promiseAll.push(this.resumeService.getSkillSets().toPromise());
    promiseAll.push(this.candidateService.getCandidateProfile().toPromise());
    Promise.all(promiseAll).then(result=>{
      this.skillSets = result[0];
      this.resumeData = result[1].resumeDataIs ? result[1].resumeDataIs.toLowerCase() : "";
      this.getEducation();
      this.expBoxValues();
      this.candidateProfile = result[1] ? result[1] : {};
      this.skillSets.forEach((item, index)=>{
        if(this.resumeData && this.resumeData.indexOf(item.value.toLowerCase()) !== -1){
          this.tagsBind.push(item);
          this.finalSkillSets.push(item.value.toLowerCase());
        }
      });
      this.tagsBind = this._readResume.getSortSkillsResult2(this.tagsBind);
      this.finalSkillSets = this._readResume.getSortSkillsResult(this.finalSkillSets);
    });

  }

  getEducation(){
    this.educationBind = "";
    this.educationBindArray.forEach((edu, index)=>{
      if(this.resumeData.indexOf(edu.toLowerCase()) !== -1){
        this.educationBind = edu;
      }
    });

    this.techMajor = "";
    this.techMajorArray.forEach((techMaj, index)=>{
      if(this.resumeData.indexOf(techMaj.toLowerCase()) !== -1){
        this.techMajor = techMaj;
      }
    });
    
    this.degree = "";
    this.degreeArray.forEach((degreeA, index)=>{
      if(this.resumeData.indexOf(degreeA.toLowerCase()) !== -1){
        this.degree = degreeA;
      }
    });
  }

  async expBoxValues(){
    let finalStatementsArr = [];
    finalStatementsArr = await this._readResume.readResume({resumeDataIs : this.resumeData});
    //combine first three statements.
    finalStatementsArr.forEach((val ,index)=>{
      switch(index){
        case 0 : 
          this.comments = val.stm;
          break;
        case 1 : 
          this.comment2 = val.stm;
          break;
        case 2 : 
          this.comment3 = val.stm;
          break;
        default : 
          break;
      }
    });
  }

  showIndustries(){
    this.industryBind = [];
    let promiseAll = [];
    promiseAll.push(this.candidateService.getCandidateExperienceIndustries().toPromise());
    promiseAll.push(this.candidateService.getCandidateProfile().toPromise());
    Promise.all(promiseAll).then(result=>{
      this.mainIndustriesAre = result[0].industries;
      this.resumeData = result[1].resumeDataIs ? result[1].resumeDataIs.toLowerCase() : "";
      this.mainIndustriesAre.forEach((item)=>{
        this.industriesAre.push({
          display : item.name,
          value : item.name.toLowerCase()
        });
        if(this.resumeData.indexOf(item.name.toLowerCase()) !== -1){
          this.industryBind.push({
            display : item.name,
            value : item.name.toLowerCase()
          });
          this.finalIndustriesAre.push(item);
        }
      });
      this.industryBind = this._readResume.getSortIndustriesResult2(this.industryBind);
      this.finalIndustriesAre = this._readResume.getSortIndustriesResult(this.finalIndustriesAre);
      this.save();
    });
  }
  
  save(){
    this._readResume.removeDuplicateSkills(this.finalSkillSets);
    this._readResume.removeDuplicateIndustries(this.finalIndustriesAre);
    let userInfo = {
      education : this.educationBind,
      skills : this.finalSkillSets.join(","),
      industries : this.finalIndustriesAre,
      comments : this.comments,
      comment2 : this.comment2,
      comment3 : this.comment3
    }

    let progress2 = this.candidateService.saveCandidateProfileDuringHighlightsData(userInfo);
    progress2.subscribe(progress => {
      console.log(`Upload ${progress.percent}% completed`);
      if(progress.completeStatus && progress.body){
        }
      }, error => {;
        Materialize.toast("Something Went Wrong !", 1000);
      },() => {
        console.log("completed : ");
    });
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
    this.userService.removeSelectToAddFriends();
  }

}
