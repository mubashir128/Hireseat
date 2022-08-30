import { Injectable } from '@angular/core';
import * as myGlobals from '../globalPath';
import {
  SignInWithApple,
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
    return SignInWithApple.authorize(options);
  }

  appleSignout(){

  }
}
