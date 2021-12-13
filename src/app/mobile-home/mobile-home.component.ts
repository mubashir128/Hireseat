import { Component, OnInit } from '@angular/core';
import { App } from '@capacitor/app';
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

  constructor(private _constants : ConstantsService){
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
