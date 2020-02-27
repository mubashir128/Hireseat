import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import * as myGlobals from "../globalPath";

@Injectable({
  providedIn: "root"
})
export class SuperAdminService {
  constructor(private http: HttpClient) {}
  getAllUsers() {
    return this.http.get<any[]>(myGlobals.baseUrl + "api/all-users").pipe(
      map((result: any[]) => {
        return result;
      })
    );
  }

  unSecureLogin(data) {
    return this.http
      .post<any>(myGlobals.baseUrl + "api/unsecure-login", data)
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

  checkSuperAdminEmail() {
    if (localStorage.getItem("super-admin-email") != undefined) {
      return true;
    } else {
      return false;
    }
  }
}
