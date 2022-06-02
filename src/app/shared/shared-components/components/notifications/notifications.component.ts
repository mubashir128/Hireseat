import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ConstantsService } from 'src/app/_services/constants.service';
import { SubscriberslistService } from 'src/app/_services/subscriberslist.service';
import { UserService } from 'src/app/_services/user.service';
import { WebsocketService } from 'src/app/_services/websocket.service';
declare var jQuery;

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  host: {
    "(document:click)": "onClick($event)",
  },
})
export class NotificationsComponent implements OnInit {

  notificationLength: any = 0;
  notificationAre : any = [];

  notificationObserver = new Subject();
  notificationObserver$ = this.notificationObserver.asObservable();

  limit = this._constants.notificationLimit;
  createdAt;
  selector: string = ".scrollNotification";
  public show: boolean = false;
  public buttonName: any = "Show";

  loggedInUser: any;
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor(
    private userService: UserService,
    private _subList : SubscriberslistService,
    private _eref: ElementRef,
    private _socket: WebsocketService,
    private _constants : ConstantsService,
    private router: Router,
  ) { }

  async ngOnInit(){
    this.loggedInUser = this.userService.getUserData();
    if (this.loggedInUser != "no") {
      this.isLoggedIn = true;
      if (this.loggedInUser.userRole == "admin") {
        this.isAdmin = true;
      }
    }

    //add a observable for notificaton
    await this._socket.removeListener({ type: this._constants.notificationType });
    this._socket.addListener({
      type: this._constants.notificationType,
      callback: this.notificationObserver,
    });

    //when any activity of notification is happened, then this observable is called.
    this.notificationObserver$.subscribe((res: any) => {
      this.handleNotificationData(res);
    });

    //call to get all notification of user.
    this._socket.sendMessage({
      type: this._constants.notificationType,
      data: {
        subType: this._constants.getAllNotifications,
        onLoad: true,
        limit: this.limit,
      },
    });

  }

  //reduce the notification length.
  truncateHTML(text, name): string {
    return this.getText(text, name);
  }

  getText(text, name){
    name = (name == undefined) ? "Anonymous user" : name;
    let charlimit = 60;
    if (!text || text.length <= charlimit) {
      return name + " : " + text;
    }

    let without_html = text.replace(/<(?:.|\n)*?>/gm, "");
    let trim_space = without_html.trim().replace(/&nbsp;/g, "");
    let shortened = trim_space.substring(0, charlimit) + " .";
    return name + " : " + shortened;
  }

  exapndText(notify){
    if(notify.expanded){
      jQuery("#text_"+notify._id).html(this.getText(notify.notification.message, notify.senderName));
      notify.expanded = false;
    }else{
      jQuery("#text_"+notify._id).html(notify.senderName + " : " + notify.notification.message);
      notify.expanded = true;
    }
  }

  //handle notifications of user.
  handleNotificationData(res: any) {
    console.log("res : ",res);
    switch (res.subType) {
      case this._constants.getAllNotifications:
        // add all notifications to list.
        if (res.data.length !== 0) {
          res.data.forEach((item, index) => {
            item.notification = JSON.parse(item.notification);
          });
          this.notificationAre = [...this.notificationAre, ...res.data];
          this.createdAt = this.notificationAre[this.notificationAre.length - 1].createdAt;
          if(res.count){
            this.notificationLength = res.count;
          }
        }
        break;
      case this._constants.newNotification:
        //add notification to start of list.
        if (res.data) {
          res.data.notification = JSON.parse(res.data.notification);
          this.notificationAre.length !== 0 ? this.notificationAre.unshift(res.data) : this.notificationAre.push(res.data);
          this.incrementNotificationCount();
        }
        break;
      default:
        break;
    }
  }

  //increase notification count by one.
  incrementNotificationCount() {
    this.notificationLength += 1;
  }

  //toggle notification DIV.
  toggle() {
    this.show = !this.show;

    // CHANGE THE NAME OF THE BUTTON.
    if (this.show) this.buttonName = "Hide";
    else this.buttonName = "Show";
  }

  onClick(event) {
    if($(event.target).attr("noClose")){
      return ;
    }

    if (!this._eref.nativeElement.contains(event.target)) {
      // or some similar check
      this.show = false;
    }
    this.buttonName = "Hide";
  }

  //when notification DIV is scrolled, then call to get next limit notifications.
  onScroll() {
    this._socket.sendMessage({
      type: this._constants.notificationType,
      data: {
        subType: this._constants.getAllNotifications,
        createdAt: this.createdAt,
        limit: this.limit,
      },
    });
  }

  //when cliking on notification, then it will redired to respected route.
  getToQuestion(id?, type?, redirectId?, redirectId2?, message?) {
    this.toggle();
    this.decreaseNotification(id);
    switch(type){
      case "askQuestion" : 
        this.router.navigate(["/question-details/", redirectId]);
        break;
      case "profileQuestion" : 
        this.router.navigate(["/bidding-events/details/", redirectId], { queryParams: { queid: redirectId2}});
        break;
      case "profileAnswer" : 
        this.router.navigate(["bidding-events/details/", redirectId], { queryParams: { queid: redirectId2}});
        break;
      case "comment" : 
        this._subList.activeCandidateNavBar.next({profileName : "My Posted Profiles"});
        this.router.navigate(["/candidate/my-posted-profiles"]);
        break;
      case "reply" : 
        this.router.navigate(["/recruiter/share-candidate-profile"]);
        break;
      case "like" : 
        this.router.navigate(["/recruiter/share-candidate-profile"]);
        break;
      case "shareCandidateProfile" : 
        this.router.navigate(["/recruiter/share-candidate-profile"]);
        break;
      case "multiShareCandidateProfile" : 
        this.router.navigate(["/recruiter/multi-share-candidate-profile"]);
        break;
      case "chatNotification" : 
        this.router.navigate(["/"+this.loggedInUser.userRole+"/chat-record", redirectId], { queryParams: { groupChat: redirectId2, message: message}});
        break;
      default : 
        break;
    }
  }
  
  //reduce the count of notication, remove the notification from array and make isRead flag to true for clicked notification.
  decreaseNotification(id){
    this.notificationLength--;
    this._subList.decreaseNotificationCountObj.next({notificationLength : this.notificationLength});
    this.notificationAre.forEach((notification, index) => {
      if(notification._id === id){
        this.notificationAre.splice(index, 1);
        return ;
      }
    });

    this._socket.sendMessage({
      type: this._constants.notificationType,
      data: {
        subType : this._constants.decreaseNotificationCount,
        _id : id,
      },
    });
  }

  //make perticular notification isRead flag to true of user.
  deleteNotification(id){
    this.decreaseNotification(id);
  }

  //make isRead to true of all notifications of user.
  deleteAllNotification(){
    this.notificationLength = 0;
    this._subList.decreaseNotificationCountObj.next({notificationLength : this.notificationLength});
    this.notificationAre = [];
    this._socket.sendMessage({
      type: this._constants.notificationType,
      data: {
        subType : this._constants.decreaseNotificationCount,
        clear : true,
      },
    });
  }

  changeLogo(notify){
    notify.showCreatedLogo = true;
  }

  //unscubscribe the subscribed variables.
  ngOnDestroy() {
    this.notificationObserver.unsubscribe();
  }

}
