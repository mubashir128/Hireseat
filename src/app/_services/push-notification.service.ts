import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { HttpClient } from '@angular/common/http';
import * as myGlobals from "../globalPath";

const VAPID_PUBLIC ='BKbeJtJWvlwlD_LHdhPEircqJx55MpR5TAES2swafZV1VojRwsclQ0liF8cpPmoAgW-WiAdxJqHn0zgVmZ5chbo';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {
  static push=false;
  constructor(private _swPush: SwPush,private _http : HttpClient) { }
  pushNotifyUrl = "api/pushNotification";

  pushNotification(){
    if(this._swPush.isEnabled && !PushNotificationService.push){
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
