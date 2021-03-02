import { Component, OnInit, Input } from "@angular/core";
import { AdminService } from "src/app/_services/admin.service";
import { UserService } from "../../_services/user.service";
import { SuperAdminService } from "../../_services/super-admin.service";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../_services/authentication.service";
import { WebsocketService } from "src/app/_services/websocket.service";
import { FirebasePushNotificationService } from "src/app/_services/firebase-push-notification.service";
@Component({
  selector: "app-userlist",
  templateUrl: "./userlist.component.html",
  styleUrls: ["./userlist.component.css"],
})
export class UserlistComponent implements OnInit {
  UserList: any = [];
  p = 1;
  createdAt;
  itemsAre = [1];
  itemsPerPage = 10;
  UserData: any;
  constructor(
    private _AuthService: AuthenticationService,
    private adminService: AdminService,
    private userService: UserService,
    public supperAdmin: SuperAdminService,
    private router: Router,
    private _socket: WebsocketService,
    private _firebasePushNotificationService : FirebasePushNotificationService
  ) {}

  ngOnInit() {
    this.UserData = this.userService.getUserData();
    this.getUsers({
      onLoad: true,
      itemsPerPage: this.itemsPerPage,
    });
  }

  getUsers(obj) {
    this.adminService.getUsersForAdmin(obj).subscribe(
      (data) => {
        if (data.length > 0) {
          this.UserList = [...this.UserList, ...data];
          this.createdAt = this.UserList[
            this.UserList.length - 1
          ].refUserId.createdAt;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  logoutSA() {
    this.supperAdmin
      .unSecureLogin({ email: localStorage.getItem("super-admin-email") })
      .subscribe(
        (response) => {
          if (response) {
            localStorage.removeItem("super-admin-email");
            this.router.navigate(["super-admin/user-list"]);
            this._socket.socketClosed();
            this._firebasePushNotificationService.closeFirebasePushNotification();
          }
        },
        (error) => {
          this._AuthService.logout();
          console.log(error);
        }
      );
  }

  handlePaginator($event) {
    this.p = $event;
    if (this.itemsAre.includes($event)) {
      return;
    }
    this.itemsAre.push($event);
    this.getUsers({
      createdAt: this.createdAt,
      itemsPerPage: this.itemsPerPage,
    });
  }
}
