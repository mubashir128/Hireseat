import { Injectable } from '@angular/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import * as myGlobals from '../globalPath';

declare var Materialize: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthLoginService {
  public serverId: string;
  constructor() {
    this.serverId = myGlobals.serverId;
  }

  initialize(){
    GoogleAuth.initialize({
      clientId : this.serverId,
      scopes: ['profile', 'email'],
      grantOfflineAccess: true,
    });
  }

  async googleAuthLogin() {
    return GoogleAuth.signIn();
  }

  googleSignout(){
    GoogleAuth.signOut().then(res=>{
      console.log("++++++++++++++++ googleSignout : ",res);
    }).catch(err=>{
      console.log("++++++++++++++++ googleSignout err : ",err);
    });
  }

}
