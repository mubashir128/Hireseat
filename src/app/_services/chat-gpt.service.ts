import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import * as myGlobals from "../globalPath";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ChatGptService {

  baseurl: any;

  constructor(private _http: HttpClient) {
    this.baseurl = myGlobals.baseUrl;
  }
}
