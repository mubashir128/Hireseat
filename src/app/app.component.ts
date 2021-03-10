import { Component } from '@angular/core';
import { ConstantsService } from "src/app/_services/constants.service";
import { Plugins } from '@capacitor/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private _constants : ConstantsService){
    this._constants.getAllConstants();
  }
}
