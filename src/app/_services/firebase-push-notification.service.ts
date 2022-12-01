import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import * as myGlobals from "../globalPath";
import { UserService } from "./user.service";
import { Router } from "@angular/router";
import { PushNotifications, Token, ActionPerformed, PushNotificationSchema, } from "@capacitor/push-notifications";
import { ConstantsService } from "./constants.service";
import { BadgeCountService } from "./badge-count.service";

declare var Materialize: any;

@Injectable({
  providedIn: "root",
})
export class FirebasePushNotificationService {
  token;
  static push = false;
  pushNotifyUrl = "api/firebasePushNotification";
  closePushNotifyUrl = "api/closeFirebasePushNotification";
  currentMessage = new BehaviorSubject({});

  loggedInUser : any;

  constructor(private _http: HttpClient, private _userService: UserService, private _router: Router, private _constants : ConstantsService, 
    private _badgeCountService : BadgeCountService
  ) {
		this.loggedInUser = this._userService.getUser();
	}

  initiate() {
    this.loggedInUser = this._userService.getUser();
    //for ios.
    this.requestIosDevicePermission();
  }

  requestIosDevicePermission() {
    if (FirebasePushNotificationService.push) {
      return;
    }

    PushNotifications.requestPermissions()
      .then((result) => {
        // Materialize.toast("result.receive :  " + result.receive, 2000, "blue");
        if (result.receive === "granted") {
          // Register with Apple / Google to receive push via APNS/FCM
          PushNotifications.register();
        } else {
          // Show some error
        }
      })
      .catch((err) => {
        // Materialize.toast("--- error is : " + err, 3000, "blue");
      });

    // On success, we should be able to receive notifications
    PushNotifications.addListener(
      "registration",
      (token: Token) => {
        // Materialize.toast("token :  " + token, 2000, "blue");
        console.log("token : ",token)
        this.token = token.value;
        console.log("this.token : ",this.token)
        let payload = {
          deviceType: "ios",
          pushToken: this.token,
          userToken: this.loggedInUser.token,
          userRole: this.loggedInUser.userInfo.userRole,
        };
        this._badgeCountService.setCount(1);
        this.openConnection(payload);
      }
    );

    // Some issue with our setup and push will not work
    PushNotifications.addListener("registrationError", (error: any) => {});

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener(
      "pushNotificationReceived",
      (notification: PushNotificationSchema) => {
        this._badgeCountService.increase();
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener(
      "pushNotificationActionPerformed",
      (notification: ActionPerformed) => {
        this.handleData(notification);
      }
    );
  }

  handleData(notification){
    let url = notification.notification.data.url;
    let redirectId = notification.notification.data.redirectId;
    let redirectId2 = notification.notification.data.redirectId2;
    switch(url){
      case "userChat" : 
        this._router.navigate(["/"+this.loggedInUser.userInfo.userRole+"/user-chat"]);
        break;
      case "askQuestion" : 
        this._router.navigate(["/question-details/", redirectId]);
        break;
      case "profileQuestion" : 
        this._router.navigate(["/bidding-events/details/", redirectId], { queryParams: { queid: redirectId2}});
        break;
      case "profileAnswer" : 
        this._router.navigate(["bidding-events/details/", redirectId], { queryParams: { queid: redirectId2}});
        break;
      case "shareCandidateProfile" : 
        let pageUrl = "share-candidate-profile";
        if(this.loggedInUser.userInfo.userRole == "candidate"){
          pageUrl = "my-posted-profiles";
        }
        this._router.navigate(["/"+this.loggedInUser.userInfo.userRole+"/"+pageUrl]);
        break;
      case "multiShareCandidateProfile" : 
        this._router.navigate(["/"+this.loggedInUser.userInfo.userRole+"/multi-share-candidate-profile"]);
        break;
      case "forum" : 
        this._router.navigate(["/forum"]);
        break;
      case "chatNotification" : 
        this._router.navigate(["/"+this.loggedInUser.userInfo.userRole+"/chat-record", redirectId], { queryParams: { groupChat: redirectId2}});
        break;
      case this._constants.swapChatNotification : 
        this._router.navigate(["/"+this.loggedInUser.userInfo.userRole+"/chat-record", redirectId]);
        break;
      case this._constants.connectFriend : 
        this._router.navigate(["/"+this.loggedInUser.userInfo.userRole+"/friends-connections"], { queryParams: {redirectId : redirectId}});
        break;
      default : 
        break;
    }

  }

  closeFirebasePushNotification() {
    let payload = {
      pushToken: this.token,
      userToken: this.loggedInUser.token,
      userRole: this.loggedInUser.userInfo.userRole,
    };
    this.closeConnection(payload);
  }

  openConnection(payload) {
    this._http
      .post(myGlobals.baseUrl + "" + this.pushNotifyUrl, payload)
      .subscribe((res) => {
        FirebasePushNotificationService.push = true;
        // Materialize.toast("added a token to server :  " + res, 2000, "blue");
      });
  }

  closeConnection(payload) {
    FirebasePushNotificationService.push = false;
  }
}
