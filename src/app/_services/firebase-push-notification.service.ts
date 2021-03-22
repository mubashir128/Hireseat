import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs';
import * as myGlobals from "../globalPath";
declare var Materialize: any;
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
    //for web.
    this.requestPermission();
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