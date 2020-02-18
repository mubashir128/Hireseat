import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import * as myGlobals from "../globalPath";
import { IProfile } from "../profile/model/user-profile";

import { IUser } from "../models/user";

@Injectable({
  providedIn: "root"
})
export class UserService {
  public baseurl: any;
  public user: any;
  public IUser: IUser;
  public employerProfile: IProfile;

  constructor(private http: HttpClient) {
    this.baseurl = myGlobals.baseUrl;
  }

  getmeetup() {
    return this.http.get<any>(this.baseurl + "api/getMeetupEvent").pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  getTopRecruiter() {
    return this.http.get<any>(this.baseurl + "api/getTopRecruiter").pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  subscribeNewsLetter(email) {
    return this.http
      .get<any>(this.baseurl + "api/subcribe/" + email.email)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  getAllEmailCsv() {
    return this.http.get<any>(this.baseurl + "api/getAllEmailCsv").pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  register(info: any) {
    debugger;

    return this.http.post<any>(this.baseurl + "api/register", info).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  registerEnterprise(info: any) {
    debugger;
    return this.http
      .post<any>(this.baseurl + "api/registerEnterprise", info)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  emailVerification(info: any) {
    return this.http
      .put<any>(this.baseurl + "api/emailVerification", info)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getUserData() {
    this.user = JSON.parse(localStorage.getItem("currentUser"));
    if (this.user) {
      return this.user.userInfo;
    } else {
      return "no";
    }
  }

  getUser() {
    this.user = JSON.parse(localStorage.getItem("currentUser"));
    if (this.user) {
      return this.user;
    } else {
      return "no";
    }
  }

  getIUserData(): IUser {
    this.user = JSON.parse(localStorage.getItem("currentUser"));
    if (this.user) {
      return this.user.userInfo;
    } else {
      return null;
    }
  }

  getUserProfile(userRole) {
    return this.http
      .get<IProfile>(this.baseurl + "api/getUserProfile/" + userRole)
      .pipe(
        map((res: IProfile) => {
          return res;
        })
      );
  }

  updateUserProfile(info: IProfile) {
    return this.http
      .put<IProfile>(this.baseurl + "api/updateUserProfile", info)
      .pipe(
        map((res: IProfile) => {
          return res;
        })
      );
  }

  getEmployerProfile(info: string) {
    return this.http
      .get<IProfile>(this.baseurl + "api/getProfile/" + info)
      .pipe(
        map((res: IProfile) => {
          return res;
        })
      );
  }

  getRecruiterProfile(info: string) {
    return this.http
      .get<IProfile>(this.baseurl + "api/getProfile/" + info)
      .pipe(
        map((res: IProfile) => {
          return res;
        })
      );
  }

  forgotPassword(email: string) {
    return this.http
      .get<any>(this.baseurl + "api/forgotPassword/" + email)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  checkForgotToken(key) {
    return this.http
      .get<any>(this.baseurl + "api/checkForgotToken/" + key)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  resetPassword(data) {
    return this.http.put<any>(this.baseurl + "api/resetPassword", data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getRewardLoosePointsSummary() {
    return this.http
      .get<any>(this.baseurl + "api/getRewardLoosePointsSummary/")
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getEarnreward() {
    return this.http.get<any>(this.baseurl + "api/getEarnreward/").pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  sendEmail(email: any) {
    return this.http.post<any>(this.baseurl + "api/sendOtp/", email).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  checkOtpEm(data: any) {
    return this.http.post<any>(this.baseurl + "api/verifyOtp/", data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  addQuestion(data: any) {
    return this.http.post<any>(this.baseurl + "api/addQuestion/", data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  userverification(data: any) {
    return this.http
      .post<any>(this.baseurl + "api/userVerification/", data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  getaskQuesUserId() {
    return localStorage.getItem("askQuestionUser");
  }
  updateProfileImg(data: any) {
    return this.http
      .post<any>(this.baseurl + "api/updateProfileImg/", data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
}
