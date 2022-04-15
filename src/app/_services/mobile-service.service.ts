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
    Materialize.toast("copyLinkViaClipbord : ", 700, "green");
    const writeToClipboard = async () => {
      Materialize.toast("copying data : ", 700, "green");
      await Clipboard.write({
        string: copyData
      });
    };
    Materialize.toast(msg, 1000, "green");

    const checkClipboard = async () => {
      Materialize.toast("writing data : ", 700, "green");
      const { type, value } = await Clipboard.read();
      Materialize.toast(`Got ${type} from clipboard: ${value}`, 700, "green");
    };

  }
}
