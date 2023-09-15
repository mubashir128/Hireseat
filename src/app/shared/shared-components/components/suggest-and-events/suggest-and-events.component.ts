import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidateService } from 'src/app/_services/candidate.service';
import { ConstantsService } from 'src/app/_services/constants.service';
import { IntroduceService } from 'src/app/_services/introduce.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-suggest-and-events',
  templateUrl: './suggest-and-events.component.html',
  styleUrls: ['./suggest-and-events.component.css']
})
export class SuggestAndEventsComponent implements OnInit {

  itemsIs = 0;
  showEvents: boolean = true;
  showNewIntro: boolean = false;
  showIntro: boolean = false;
  showJobs: boolean = false;
  showRequest: boolean = false;

  pendingIntroduceCount = 0;
  introsToCompaniesCount: number = 0;

  companiesUsresAre = [];
  loggedUser: any;

  constructor(
    private _route: ActivatedRoute,
    private _introduceService: IntroduceService,
    protected _userService: UserService,
    private _constants: ConstantsService,
    protected _candidateService: CandidateService,
    private _router: Router
  ){
    this.itemsIs = this._route.snapshot.queryParams["eventRoute"] ? this._route.snapshot.queryParams["eventRoute"] : this.itemsIs;
    let eventRoute = this._route.snapshot.queryParams["eventRoute"];
    let eventId = this._route.snapshot.queryParams["eventId"];

    let postJobId = this._route.snapshot.queryParams["postJobId"];
    
    if(eventRoute){
      this.itemsIs = eventRoute;
      this.activeEventstab();
    }

    if(postJobId){
      this.itemsIs = 3;
      this.activeJobs();
    }
    this.loggedUser = this._userService.getUserData();
  }

  ngOnInit(): void {
    // this.getReadIntroduceCount();
    this.getFriendConnections();
  }

  switchPage(page){
    jQuery("#switch" + this.itemsIs).css("background-color", "#33aaff");
    this.itemsIs = page;
    jQuery("#switch" + page).css("background-color", "#27B1BD");
    
    if(this.itemsIs == 0){
      this.activeEventstab();
    }else if(this.itemsIs == 1){
      this.activeNewIntros();
    }else if(this.itemsIs == 2){
      this.activeIntrotab();
    }else if(this.itemsIs == 3){
      this.activeJobs();
    }else if(this.itemsIs == 4){
      this.activeIntrosToCompanies();
    }
  }

  activeEventstab(){
    this.showEvents = true;
    this.showNewIntro = false;
    this.showIntro = false;
    this.showJobs = false;
    this.showRequest = false;
  }

  activeIntrotab(){
    this.showIntro = true;
    this.showEvents = false;
    this.showNewIntro = false;
    this.showJobs = false;
    this.showRequest = false;
  }

  activeNewIntros(){
    // this.updateReadIntroduceCount();
    this.showNewIntro = true;
    this.showEvents = false;
    this.showIntro = false;
    this.showJobs = false;
    this.showRequest = false;
  }

  activeJobs(){
    this.showJobs = true;
    this.showEvents = false;
    this.showNewIntro = false;
    this.showIntro = false;
    this.showRequest = false;
  }

  activeIntrosToCompanies(){
    this.showJobs = false;
    this.showEvents = false;
    this.showNewIntro = false;
    this.showIntro = false;
    this.showRequest = true;
  }

  // getReadIntroduceCount(){
  //   this._introduceService.getReadIntroduceCount().subscribe((res) => {
  //     if(res){
  //       this.pendingIntroduceCount = res.count;
  //     }
  //   }, (err) => {
  //     console.log(err);
  //   });
  // }

  // updateReadIntroduceCount(){
  //   this._introduceService.updateReadIntroduceCount().subscribe((res) => {
  //     this.pendingIntroduceCount = 0;
  //   }, (err) => {
  //     console.log(err);
  //   });
  // }

  getFriendConnections(){
    let payload = {};
    this._candidateService.getAllConnectedUsers(payload).subscribe((res) => {
      this.sortBasedOnStatusAsFriend(res.data);
    }, (err) => {
      console.log(err);
    });
  }

  sortBasedOnStatusAsFriend(data){
    data.forEach((friend, index) => {
      if(friend.status === this._constants.asAFriend){
        this.getUserWithRespectCompanies(friend);
      }
    });
    this.increseCount();
  }

  increseCount(){
    this.introsToCompaniesCount = this.companiesUsresAre.length;
  }

  getUserWithRespectCompanies(friend){
    let obj; // for resume data
    let obj2; //for user data
    if(friend.recipient._id == this.loggedUser._id){
      obj = friend.resumeId;
      obj2 = friend.requester;
    }else if(friend.requester._id == this.loggedUser._id){
      obj = friend.resumeId2;
      obj2 = friend.recipient;
    }

    obj.introduceYouToo?.split(",").forEach((company)=>{
      let str = company.toUpperCase().trim();
      let temp = this.companiesUsresAre.filter((com)=>{
        if(com.companyName === str){
          return true;
        }
      });

      //if temp lenght 0 then company not exists in array so insert into companiesUsresAre array
      if(temp.length == 0 && str !== ""){
        this.companiesUsresAre.push({companyName : str, users : [{user : obj2, resume : obj}]});
      }else{
        this.companiesUsresAre.forEach((item)=>{
          if(item.companyName == str){
            item.users.push({user : obj2, resume : obj});
          }
        });
      }
    });
  }

  gotoUser(userId){
    this._router.navigate(["/"+this.loggedUser.userRole+"/friends-connections"], { queryParams: { userId: userId, pageNumber: 1}});
  }
}
