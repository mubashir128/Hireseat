import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import * as myGlobals from "../globalPath";

@Injectable({
  providedIn: "root"
})
export class EnterpriseService {
  constructor(private http: HttpClient) {}
  getAllEnterpriseUsers() {
    return this.http
      .get<any[]>(myGlobals.baseUrl + "api/all-enterprise-users")
      .pipe(
        map((result: any[]) => {
          return result;
        })
      );
  }
  unSecureEnterpriseEmployerLogin(data) {
    return this.http
      .post<any>(myGlobals.baseUrl + "api/unsecure-enterprise-login", data)
      .pipe(
        map((result: any) => {
          localStorage.setItem(
            "currentUser",
            JSON.stringify({ userInfo: result.userInfo, token: result.auth })
          );
          return result;
        })
      );
  }
  checkEnterpriseEmail() {
    if (localStorage.getItem("enterprise-email") != undefined) {
      return true;
    } else {
      return false;
    }
  }
}
