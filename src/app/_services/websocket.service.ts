import { Injectable } from "@angular/core";
import * as io from "socket.io-client";
import * as myGlobals from "../globalPath";
import { FirebasePushNotificationService } from "src/app/_services/firebase-push-notification.service";
import { AuthenticationService } from "src/app/_services/authentication.service";
import { UserService } from "./user.service";

@Injectable({
  providedIn: "root",
})
export class WebsocketService {
  socket: any;
  listeners = [];
  socketUrl: any;
  socketClose = true;
  user;

  constructor(private _firebasePushNotificationService : FirebasePushNotificationService, 
    private _userAuth: AuthenticationService, 
    private userService: UserService
  ) {
    this.socketUrl = myGlobals.socketUrl;
  }

  async getInstance(token: any, userRole: string) {
    if (this.socketClose) {
      // console.log("calling an instance");
      this.socket = await io(
        this.socketUrl + "?token=" + token + "&userRole=" + userRole,
        {
          reconnect: false,
        }
      );
      this.socketClose = false;
      this.handleWebSocket();
    }
    return this.socket;
  }

  private handleWebSocket() {
    this.socket.on("open", (data: any) => {
      this.onOpen(data);
    });

    this.socket.on("message", (data: any) => {
      this.onMessage(data);
    });

    this.socket.on("disconnect", (data: any) => {
      this.onClose(data);
    });
  }

  private onOpen(obj: any) {
    // console.log("connection opend : ", obj);
    //for firebasePushNotification open connection.
    this._firebasePushNotificationService.initiate();
    this.user = this.userService.getUser();
    this._userAuth.handleLoginSessionLog();
  }

  sendMessage(obj: any) {
    if (this.socket !== undefined) {
      // console.log("sending a msg", obj);
      this.socket.emit("message", JSON.stringify(obj));
    }
  }

  private onMessage(obj: string) {
    let res = JSON.parse(obj);
    // console.log("message received : ", res);
    this.listeners.forEach((key, index) => {
      if (res.type === key.type) {
        key.callback.next(res.data);
      }
    });
  }
  
  private onClose(obj: any) {
    //  console.log("connection closed : ",obj);
    //for firebasePushNotification close connection.
    this._firebasePushNotificationService.closeFirebasePushNotification();
    this._userAuth.handleLogoutSessionLog(this.user.userInfo._id, this.user.token);
  }

  socketClosed() {
    console.log("closing socket");
    this.socketClose = true;
    this.socket.disconnect();
    this.socket = undefined;
  }

  addListener(obj) {
    this.listeners.push(obj);
  }

  async removeListener(obj) {
    for (let i = 0; i < this.listeners.length; i++) {
      if (this.listeners[i].type === obj.type) {
        this.listeners.splice(i, 1);
      }
    }
  }
}
