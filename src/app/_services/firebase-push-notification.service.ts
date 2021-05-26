import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import * as myGlobals from "../globalPath";
declare var Materialize: any;
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
} from "@capacitor/core";
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

  constructor(private _http: HttpClient) {}

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
        Materialize.toast("result.granted :  " + result.granted, 2000, "blue");
        if (result.granted) {
          // Register with Apple / Google to receive push via APNS/FCM
          PushNotifications.register();
        } else {
          // Show some error
        }
      })
      .catch((err) => {
        Materialize.toast("--- error is : " + err, 3000, "blue");
      });

    // On success, we should be able to receive notifications
    PushNotifications.addListener(
      "registration",
      (token: PushNotificationToken) => {
        Materialize.toast("token :  " + token, 2000, "blue");
        let loggedInUser = JSON.parse(localStorage.getItem("currentUser"));
        this.token = token.value;
        let payload = {
          deviceType: "ios",
          pushToken: this.token,
          userToken: loggedInUser.token,
          userRole: loggedInUser.userInfo.userRole,
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
      (notification: PushNotificationActionPerformed) => {}
    );
  }

  closeFirebasePushNotification() {
    let loggedInUser = JSON.parse(localStorage.getItem("currentUser"));
    let payload = {
      pushToken: this.token,
      userToken: loggedInUser.token,
      userRole: loggedInUser.userInfo.userRole,
    };
    this.closeConnection(payload);
  }

  openConnection(payload) {
    this._http
      .post(myGlobals.baseUrl + "" + this.pushNotifyUrl, payload)
      .subscribe((res) => {
        FirebasePushNotificationService.push = true;
        Materialize.toast("added a token to server :  " + res, 2000, "blue");
      });
  }

  closeConnection(payload) {
    FirebasePushNotificationService.push = false;
  }
}
