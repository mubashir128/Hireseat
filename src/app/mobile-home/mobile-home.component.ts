import { Component, OnInit } from '@angular/core';
import { App } from '@capacitor/app';
import { UserService } from "../_services/user.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ConstantsService } from '../_services/constants.service';

declare var jQuery:any;

@Component({
  selector: 'app-mobile-home',
  templateUrl: './mobile-home.component.html',
  styleUrls: ['./mobile-home.component.css']
})
export class MobileHomeComponent implements OnInit {
  appInfo;
  currVersion = '1.0.0';
  currIosAppVersion;

  loggedInUser : any;
  btnName = "Login";

  constructor(private _userservice: UserService, private router: Router, private _constants : ConstantsService) {
    this.loggedInUser = this._userservice.getUserData();
    if (this.loggedInUser != "no") {
      this.btnName = "Enter";
    }
  }

  goToLogin() {
    this.router.navigate(["/login"]);
  }

  async ngOnInit(){
    this.appInfo = await App.getInfo();
    this.currVersion = this.appInfo ? this.appInfo.version : this.currVersion;
    this.currIosAppVersion = this._constants.currIosAppVersion;
  }

  iosPlayStore(){
    window.open("https://apps.apple.com/us/app/hireseat/id1558475792", "_blank");
  }

}
