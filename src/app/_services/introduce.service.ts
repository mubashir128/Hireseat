import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import * as myGlobals from "../globalPath";
import { map } from "rxjs/operators";

export enum tabTypes {
  companiesTab = "companiesTab",
  industriesTab = "industriesTab",
  desireRolesTab = "desireRolesTab"
}

@Injectable({
  providedIn: 'root'
})
export class IntroduceService {
  public baseurl: any;

  constructor(private _http: HttpClient) {
    this.baseurl = myGlobals.baseUrl;
  }

  introduce(info: any) {
    return this._http.post<any>(this.baseurl + "api/introduce", info).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  multipleIntroduce(info: any) {
    return this._http.post<any>(this.baseurl + "api/multiple-introduce", info).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getIntroduce() {
    return this._http.get<any>(this.baseurl + "api/get-introduce").pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getReadIntroduceCount() {
    return this._http.get<any>(this.baseurl + "api/get-read-introduce-count").pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  updateReadIntroduceCount() {
    return this._http.put<any>(this.baseurl + "api/update-read-introduce-count", {}).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  updateStatus(payload: any) {
    return this._http.post<any>(this.baseurl + "api/update-status", payload).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
