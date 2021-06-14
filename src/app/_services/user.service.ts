import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import * as myGlobals from "../globalPath";
import { IProfile } from "../profile/model/user-profile";

import { IUser } from "../models/user";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {
  public baseurl: any;
  public user: any;
  public IUser: IUser;
  public candidateCareerValueFinder;
  public employerProfile: IProfile;
  private setProfile = new BehaviorSubject<any>([]);
  // Observable
  _setProfileObservable = this.setProfile.asObservable();

  candidateProfileObservable = new Subject();
  candidateProfileObservable$ = this.candidateProfileObservable.asObservable();

  constructor(private http: HttpClient) {
    this.baseurl = myGlobals.baseUrl;
  }
  setUserProfile(userDetails) {
    this.setProfile.next(userDetails);
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
    return this.http.post<any>(this.baseurl + "api/register", info).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  registerCandidate(info: any) {
    return this.http
      .post<any>(this.baseurl + "api/registerCandidate", info)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  registerEnterprise(info: any) {
    return this.http
      .post<any>(this.baseurl + "api/registerEnterprise", info)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  registerEnterpriseEmployer(info: any) {
    return this.http
      .post<any>(this.baseurl + "api/registerEnterpriseEmployer", info)
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

  setCandidateCareerValueFinder(candidateInfo) {
    localStorage.setItem("candidateCareerValueFinder", JSON.stringify(candidateInfo));
  }

  getCandidateCareerValueFinder() {
    this.candidateCareerValueFinder = JSON.parse(localStorage.getItem("candidateCareerValueFinder"));
    if(this.candidateCareerValueFinder){
      return this.candidateCareerValueFinder;
    }else{
      return false;
    }
  }

  removeCandidateCareerValueFinder() {
    localStorage.removeItem('candidateCareerValueFinder');
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

  getUserDetails(obj) {
    return this.http.post(this.baseurl + "api/getUserDetails/", obj);
  }

  getUserNotificationCunt(userRole) {
    return this.http.post(this.baseurl + "api/getUserNotificationCunt/", {userRole : userRole});
  }

  getMultiSharedCandidateProfileCount(userRole) {
    return this.http.post(this.baseurl + "api/get-all-multi-shared-candidate-profile-count/", {userRole : userRole});
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

  addCandidateQuestion(data: any) {
    return this.http.post<any>(this.baseurl + "api/addCandidateQuestion/", data).pipe(
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
  // functions
  numberWithCommas(x) {
    if (x != null) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
}
