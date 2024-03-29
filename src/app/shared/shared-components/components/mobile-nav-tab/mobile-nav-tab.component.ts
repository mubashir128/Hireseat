import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Tab2 } from 'src/app/recruiter/models/tab2';
import { ConstantsService } from 'src/app/_services/constants.service';
import { SubscriberslistService } from 'src/app/_services/subscriberslist.service';
import { UserService } from 'src/app/_services/user.service';
import { WebsocketService } from 'src/app/_services/websocket.service';
import { IntroduceService } from 'src/app/_services/introduce.service';
import { ChatService } from 'src/app/_services/chat.service';

@Component({
  selector: 'app-mobile-nav-tab',
  templateUrl: './mobile-nav-tab.component.html',
  styleUrls: ['./mobile-nav-tab.component.css']
})
export class MobileNavTabComponent implements OnInit, OnDestroy {

  tabs2: Tab2[];

  loggedInUser: any;
  isLoggedIn: boolean = false;
  isEmployer: boolean = false;
  isRecruiter: boolean = false;
  isCandidate: boolean = false;
  isAdmin: boolean = false;
  isSuperAdmin: boolean = false;
  isEnterprise: boolean = false;

  notificationLength = 0;
  multiSharedCandidateProfileCount = 0;

  pendingIntroduceCount = 0;
  chatUnreadUserCounts: number = 0;

  mobileNotificationIncrementObserver = new Subject();
  mobileNotificationIncrementObserver$ = this.mobileNotificationIncrementObserver.asObservable();

  multiSharedCandidateProfileCountObserver = new Subject();
  multiSharedCandidateProfileCountObserver$ = this.multiSharedCandidateProfileCountObserver.asObservable();

  constructor(private userService: UserService, private router: Router, private _socket: WebsocketService, private _constants : ConstantsService, 
    protected _introduceService: IntroduceService,
    protected _chatService: ChatService
  ) {
    this.tabs2 = [];
    this.loggedInUser = this.userService.getUserData();
    if(this.loggedInUser != "no"){
      this.isLoggedIn = true;
      if(this.loggedInUser.userRole == "employer"){
        this.isEmployer = true;
        this.forEmploerMobileTab();
      }else if (this.loggedInUser.userRole == "recruiter"){
        this.isRecruiter = true;
        this.forRecrutierMobileTab();
      }else if (this.loggedInUser.userRole == "candidate"){
        this.isCandidate = true;
        this.forCandidateMobileTab();
      }else if(this.loggedInUser.userRole == "admin") {
        this.isAdmin = true;
      }else if(this.loggedInUser.userRole == "super-admin") {
        this.isSuperAdmin = true;
        this.forSuperAdminMobileTab();
      } else if(this.loggedInUser.userRole == "enterprise") {
        this.isEnterprise = true;
        this.forAdminMobileTab();
      }
    }else{
      this.forNoUserMobileTab();
    }
  }

  async ngOnInit(){
    if(this.loggedInUser != "no" && !this.isSuperAdmin){
      this.getMultiSharedCandidateProfileCount();
      this.getOnlyUsersUnreadChatCounts();
    }

    this.SelectItem2(this.router.url);

    //add a observable for notificaton
    await this._socket.removeListener({ type: this._constants.mobileNotificationIncrementType });
    this._socket.addListener({
      type: this._constants.mobileNotificationIncrementType,
      callback: this.mobileNotificationIncrementObserver,
    });

    //when any activity of notification is happened, then this observable is called.
    this.mobileNotificationIncrementObserver$.subscribe((res: any) => {
      this.handleNotificationData(res);
    });

    //add a observable for multiSharedCandidateProfileCount
    await this._socket.removeListener({ type: this._constants.multiSharedCandidateProfileCount });
    this._socket.addListener({
      type: this._constants.multiSharedCandidateProfileCount,
      callback: this.multiSharedCandidateProfileCountObserver,
    });

    //when any activity of multi shared candidate profile is happened, then this observable is called.
    this.multiSharedCandidateProfileCountObserver$.subscribe((res: any) => {
      this.handleMultiSharedCandidateProfileCountData(res);
    });
  }

  //handle notifications of user.
  handleNotificationData(res: any) {
    switch (res.subType) {
      case this._constants.pendintIntroduceCount:
        this.pendingIntroduceCount = res.data;
        break;
      default:
        break;
    }
  }

  getOnlyUsersUnreadChatCounts(){
    //call to get all only chats.
    this._chatService.getOnlyUsersUnreadChatCounts().subscribe(res=>{
      this.setReadCount(res);
    });
  }

  setReadCount(res){
    res?.forEach((user)=>{
      this.getUnreadMessageCount(user);
      if(user.count !== 0){
        this.chatUnreadUserCounts++;
      }
    });
  }

  getUnreadMessageCount(user){
    let count = 0;
    user?.message.forEach((message)=>{
      if(message.is_read){
      }else if(message.senderId !== this.loggedInUser._id){
        count++;
      }
    });
    user.count = count;
  }

  handleMultiSharedCandidateProfileCountData(res){
    switch (res.subType) {
      case this._constants.multiSharedCandidateProfileCountType:
        this.multiSharedCandidateProfileCount += 1;
        break;
      default:
        break;
    }
  }

  getMultiSharedCandidateProfileCount(){
    this.userService.getMultiSharedCandidateProfileCount(this.userService.getUserData().userRole).subscribe((res: any) => {
      this.multiSharedCandidateProfileCount = res.count;
    });
  }

  forEmploerMobileTab(){
    //for mobile view
    this.tabs2.push(new Tab2("/employer/share-candidate-profile", "Shared Profile", false, "fas fa-users"));

    this.tabs2.push(
      new Tab2("/employer/multi-share-candidate-profile", "Multi Shared Candidate Profile", true, "fas fa-user-friends")
    );

    this.tabs2.push(
      new Tab2("/employer/bidding-event-list", "Jobs", false, "fas fa-search")
    );
    
    this.tabs2.push(
      new Tab2("/employer/notification", "Notification", false, "fas fa-bell")
    );
    
    this.tabs2.push(
      new Tab2("/employer/menus", "Menu", false, "fas fa-bars")
    );
  }

  forRecrutierMobileTab(){
    //for mobile view
    this.tabs2.push(
      new Tab2("/recruiter/timeline", "Timelines", false, "fas fa-home")
    );

    this.tabs2.push(
      new Tab2("/recruiter/candidate-profile", "Candidate Profile", true, "fas fa-user-friends")
    );

    this.tabs2.push(
      new Tab2("/recruiter/bidding-event-list", "Jobs", false, "fas fa-search")
    );
    this.tabs2.push(
      new Tab2("/recruiter/notification", "Notification", false, "fas fa-bell")
    );
    this.tabs2.push(new Tab2("/recruiter/menus", "Menu", false, "fas fa-bars"));
  }

  forCandidateMobileTab(){
    this.getReadIntroduceCount();

    //for mobile view
    
    this.tabs2.push(
      new Tab2("/candidate/timeline", "Timelines", false, "fas fa-home")
    );

    this.tabs2.push(new Tab2("/candidate/suggest-and-events", "Suggest And Events", true, "fas fa-shopping-bag"));

    this.tabs2.push(new Tab2("/candidate/friends-connections", "My Connections", true, "fas fa-user-friends"));

    this.tabs2.push(
      new Tab2("/candidate/user-chat", "Candidate Chat", false, "fas fa-comment")
    );

    // this.tabs2.push(
    //   new Tab2("/candidate/notification", "Notification", false, "fas fa-bell")
    // );

    this.tabs2.push(
      new Tab2("/candidate/menus", "Menu", false, "fas fa-user")
    );
  }

  forSuperAdminMobileTab(){
    this.tabs2.push(
      new Tab2("/super-admin/user-list", "Jobs", false, "fas fa-home")
    );
    this.tabs2.push(
      new Tab2("/super-admin/create-admin", "Create Admin", false, "fas fa-plus")
    );
    this.tabs2.push(
      new Tab2("/super-admin/create-enterprise", "Menu", false, "fas fa-network-wired")
    );

    this.tabs2.push(
      new Tab2("/super-admin/notification", "Notification", false, "fas fa-bell")
    );
    this.tabs2.push(
      new Tab2("/super-admin/menus", "Menu", false, "fas fa-bars")
    );
  }

  forAdminMobileTab(){
    console.log("forAdminMobileTab : ");
  }

  forNoUserMobileTab(){
    // this.tabs2.push(
    //   new Tab2("/login", "Sign Up", false, "fas fa-home")
    // );
    // this.tabs2.push(
    //   new Tab2("/login", "Login", false, "fas fa-bell")
    // );

    // this.tabs2.push(
    //   new Tab2("/menus", "Menu", false, "fas fa-bars")
    // );
  }

  SelectItem2(item) {
    this.tabs2.forEach((tab) => {
      if (tab.id === item) {
        tab.selected = true;
      } else {
        tab.selected = false;
      }
    });
  }

  ngOnDestroy(){
    if(this.mobileNotificationIncrementObserver){
      this.mobileNotificationIncrementObserver.unsubscribe();
    }
    if(this.multiSharedCandidateProfileCountObserver){
      this.multiSharedCandidateProfileCountObserver.unsubscribe();
    }
  }

  changeLogo(tab){
    tab.showCreatedLogo = true;
  }

  getReadIntroduceCount(){
    this._introduceService.getReadIntroduceCount().subscribe((res) => {
      if(res){
        this.pendingIntroduceCount = res.count;
      }
    }, (err) => {
      console.log(err);
    });
  }

}
