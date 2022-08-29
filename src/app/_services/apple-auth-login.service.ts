import { Injectable } from '@angular/core';
import * as myGlobals from '../globalPath';
import {
  SignInWithApple,
  SignInWithAppleResponse,
  SignInWithAppleOptions,
} from '@capacitor-community/apple-sign-in';

const options: SignInWithAppleOptions = {
  clientId: myGlobals.appleUrl,
  redirectURI: myGlobals.redirectAppleUrl,
  scopes: 'name email',
  state : 'init',
  nonce : 'test'
};

@Injectable({
  providedIn: 'root'
})
export class AppleAuthLoginService {

  public serverId: string;
  constructor() {
    this.serverId = myGlobals.appleUrl;
  }

  async appleAuthLogin() {
    await SignInWithApple.authorize(options).then((result: SignInWithAppleResponse) => {
      // Handle user information
      // Validate token with server and create new session
      console.log("result : ",result);
    }).catch(error => {
      // Handle error
      console.log("error : ",error);
    });
  }

  appleSignout(){

  }
}
