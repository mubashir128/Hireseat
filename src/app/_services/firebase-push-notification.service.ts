import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import * as myGlobals from "../globalPath";
import { UserService } from "./user.service";
declare var Materialize: any;
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
} from "@capacitor/core";
import { Router } from "@angular/router";
const { PushNotifications } = Plugins;
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

  constructor(private _http: HttpClient, private _userService: UserService, private _router: Router) {
		this.loggedInUser = this._userService.getUser();
	}

  initiate() {
    //for ios.
    this.requestIosDevicePermission();
  }

  requestIosDevicePermission() {
    if (FirebasePushNotificationService.push) {
      return;
    }

    PushNotifications.requestPermission()
      .then((result) => {
        // Materialize.toast("result.granted :  " + result.granted, 2000, "blue");
        if (result.granted) {
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
      (token: PushNotificationToken) => {
        // Materialize.toast("token :  " + token, 2000, "blue");
        this.token = token.value;
        let payload = {
          deviceType: "ios",
          pushToken: this.token,
          userToken: this.loggedInUser.token,
          userRole: this.loggedInUser.userInfo.userRole,
        };
        this.openConnection(payload);
      }
    );

    // Some issue with our setup and push will not work
    PushNotifications.addListener("registrationError", (error: any) => {});

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener(
      "pushNotificationReceived",
      (notification: PushNotification) => {}
    );

    // Method called when tapping on a notification
    PushNotifications.addListener(
      "pushNotificationActionPerformed",
      (notification: PushNotificationActionPerformed) => {
        this.handleData(notification);
      }
    );
  }

  handleData(notification){
    Materialize.toast("--- pushNotificationActionPerformed : " + JSON.stringify(notification), 3000, "blue");
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
