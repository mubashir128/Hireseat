import { Component, OnInit } from '@angular/core';
import { App } from '@capacitor/app';
declare var jQuery:any;

@Component({
  selector: 'app-mobile-home',
  templateUrl: './mobile-home.component.html',
  styleUrls: ['./mobile-home.component.css']
})
export class MobileHomeComponent implements OnInit {
  appInfo;
  currVersion = '1.0.0';

  constructor() { }

  async ngOnInit(){
    this.appInfo = await App.getInfo();
    this.currVersion = this.appInfo ? this.appInfo.version : this.currVersion;
  }

}
