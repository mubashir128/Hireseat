import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from "@angular/common/http";
import * as myGlobals from "../globalPath";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DesiredCompaniesService {

  public baseurl: any;

  constructor(
    private _http: HttpClient
  ) {
    this.baseurl = myGlobals.baseUrl;
  }

  getDesiredCompanies() {
    return this._http.get<any>(this.baseurl + "api/get-desired-companies").pipe(map((res: any) => {
      return res;
    }));
  }

  saveDesiredCompanies(desirecCompaniesName) {
    return this._http.post<any>(this.baseurl + "api/save-desired-companies", { name: desirecCompaniesName }).pipe(map((res: any) => {
      return res;
    }));
  }
}
