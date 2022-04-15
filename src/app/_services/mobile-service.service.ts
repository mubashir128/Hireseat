import { Injectable } from '@angular/core';
import { Clipboard } from '@capacitor/clipboard';

declare var jQuery;
declare var Materialize;

@Injectable({
  providedIn: 'root'
})
export class MobileServiceService {

  constructor() { }

  copyLinkViaClipbord(copyData : string, msg : string) {
    const writeToClipboard = async () => {
      await Clipboard.write({
        string: copyData
      });
    };
    Materialize.toast(msg, 1000, "green");

    const checkClipboard = async () => {
      const { type, value } = await Clipboard.read();
    };

  }
}
