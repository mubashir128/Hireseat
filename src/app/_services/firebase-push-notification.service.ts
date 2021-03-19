import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs';
import * as myGlobals from "../globalPath";
declare var Materialize: any;
import {Plugins, PushNotification, PushNotificationToken, PushNotificationActionPerformed} from '@capacitor/core';
const { PushNotifications } = Plugins;
@Injectable({
  providedIn: 'root'
})
export class FirebasePushNotificationService {

  token;
  static push = false;
  pushNotifyUrl = "api/firebasePushNotification";
  closePushNotifyUrl = "api/closeFirebasePushNotification"
  currentMessage = new BehaviorSubject({});

  constructor(private angularFireMessaging: AngularFireMessaging, private _http: HttpClient) {
  }
  
  initiate(){
    // this.requestPermission();
    Materialize.toast("--- calling method this.requestAndroidDevicePermission() : ", 3000, "blue");
    this.requestAndroidDevicePermission();
  }

  requestAndroidDevicePermission(){
    if(FirebasePushNotificationService.push){
      return ;
    }
    Materialize.toast("--- PushNotifications.requestPermission() : "+FirebasePushNotificationService.push, 3000, "blue");
    PushNotifications.requestPermission().then( result => {
      Materialize.toast("result.granted : "+result.granted, 3000, "blue");
      if (result.granted) {
        // Register with Apple / Google to receive push via APNS/FCM
        Materialize.toast("true result.granted : "+result.granted, 3000, "blue");
        PushNotifications.register();
      } else {
        // Show some error
        Materialize.toast("false result.granted : "+result.granted, 3000, "blue");
      }
    }).catch(err=>{
      Materialize.toast("error : "+err, 3000, "blue");
    });

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration', (token: PushNotificationToken) => {
      Materialize.toast("Push registration success, token : "+token.value, 3000, "blue");
      let loggedInUser = JSON.parse(localStorage.getItem('currentUser'));
      this.token = token.value;
      let payload = {
        pushToken : this.token,
        userToken : loggedInUser.token,
        userRole : loggedInUser.userInfo.userRole
      }
      this.openConnection(payload);
    });

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError', (error: any) => {
      Materialize.toast("Error on registration : "+JSON.stringify(error), 3000, "blue");
    });

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived', (notification: PushNotification) => {
      Materialize.toast("Error on registration : "+JSON.stringify(notification), 3000, "blue");
    });

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed', (notification: PushNotificationActionPerformed) => {
      Materialize.toast("Push action performed : "+JSON.stringify(notification), 3000, "blue");
    });
  }

  requestPermission(){
    if(FirebasePushNotificationService.push){
      return ;
    }

    let loggedInUser = JSON.parse(localStorage.getItem('currentUser'));
    this.angularFireMessaging.requestToken.subscribe(token=>{
        this.token = token;
        let payload = {
          pushToken : this.token,
          userToken : loggedInUser.token,
          userRole : loggedInUser.userInfo.userRole
        }
        this.receiveMessage();
        this.openConnection(payload);
      },(err)=>{
        console.log("err : ",err);
      });
  }

  receiveMessage() {
    this.angularFireMessaging.messages.subscribe((payload : any) => {
      this.currentMessage.next(payload);
    });
  }

  closeFirebasePushNotification() {
    let loggedInUser = JSON.parse(localStorage.getItem('currentUser'));
    let payload = {
      pushToken : this.token,
      userToken : loggedInUser.token,
      userRole : loggedInUser.userInfo.userRole
    }
    this.closeConnection(payload);
  }

  openConnection(payload){
    this._http.post(myGlobals.baseUrl+""+this.pushNotifyUrl, payload).subscribe(res=>{
      FirebasePushNotificationService.push = true;
    });
  }

  closeConnection(payload){
    FirebasePushNotificationService.push = false;
    //we r closing it with the help of socket.
    // this.angularFireMessaging.deleteToken(this.token).subscribe(res=>{
    //   this.token = '';
    //   this._http.post(myGlobals.baseUrl+""+this.closePushNotifyUrl, payload).subscribe(res=>{
    //     FirebasePushNotificationService.push = false;
    //   });
    // });
  }

}