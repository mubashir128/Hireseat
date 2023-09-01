import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from "@angular/common/http";
import * as myGlobals from "../globalPath";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JobTitleService {
  public baseurl: any;

  constructor(
    private _http: HttpClient
  ) {
    this.baseurl = myGlobals.baseUrl;
  }

  getJobTitles() {
    return this._http.get<any>(this.baseurl + "api/get-job-title").pipe(map((res: any) => {
      return res;
    }));
  }

  saveJobTitle(jobTitleName) {
    return this._http.post<any>(this.baseurl + "api/save-job-title", { name : jobTitleName}).pipe(map((res: any) => {
      return res;
    }));
  }
}
