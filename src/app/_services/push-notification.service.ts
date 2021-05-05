import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { HttpClient } from '@angular/common/http';
import * as myGlobals from "../globalPath";

const VAPID_PUBLIC ='BLkgf3mxi9c852pFmh7BRJJ2J6YB4jwJ9u-cfZW8eL_y5LJnFwi3AGR9m4-Y9E0a_2UotO66RYeB7HVhHuR1XDQ';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {
  static push=false;
  constructor(private _swPush: SwPush,private _http : HttpClient) { }
  pushNotifyUrl = "api/pushNotification";
  pushNotification(){
    if(this._swPush.isEnabled && !PushNotificationService.push){
      return ;
      this._swPush.requestSubscription({
        serverPublicKey: VAPID_PUBLIC,
      })
      .then(subscription => {
        // send subscription to the server
        this._http.post(myGlobals.baseUrl+""+this.pushNotifyUrl,subscription).subscribe(res=>{
          PushNotificationService.push=true;
        });
      })
      .catch((err)=>{
        console.log("--- err : ",err);
      });
    }

  }

}
