import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";
import * as myGlobals from "../globalPath";
import { IProfile } from "../profile/model/user-profile";

import { IUser } from "../models/user";
import { BehaviorSubject, Subject } from "rxjs";

import { Plugins } from '@capacitor/core';
import * as moment from "moment";
const { Share } = Plugins;

@Injectable({
  providedIn: "root",
})
export class UserService {
  public baseurl: any;
  public user: any;
  public IUser: IUser;
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

  postJob(info: any) {
    let url = this.baseurl + "api/";
    url += (info._id) ? "update-post-job" : "create-post-job";
    return this.http.post<any>(url, info).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getPostJob(jobPost?: any, suggest?, searchFilters?, companyId?) {
    let params = new HttpParams();
    if(jobPost) {
      params = params.append('_id', jobPost._id.toString());
    }

    if(searchFilters) {
      searchFilters.forEach((value, key) => {
        params = params.append(key, value);
      });
    }

    if(companyId) {
      params = params.append('companyId', companyId.toString());
    }

    if(suggest){
      params = params.append('suggest', suggest);
    }
    return this.http.get<any>(this.baseurl + "api/get-post-job", {params :params});
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

  getCandidateUserDetails(obj) {
    return this.http.post(this.baseurl + "api/getCandidateUserDetails/", obj);
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

  updateGroupProfileImg(data: any) {
    return this.http
      .post<any>(this.baseurl + "api/updateGroupProfileImg/", data)
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

  getBeforeMyProfileWalkthrough(){
    return localStorage.getItem("beforeMyProfileWalkthrough");
  }

  setBeforeMyProfileWalkthrough(){
    localStorage.setItem("beforeMyProfileWalkthrough", "true");
  }

  removeBeforeMyProfileWalkthrough(){
    localStorage.removeItem("beforeMyProfileWalkthrough");
  }

  getOnlyCandidateWalkthrough(){
    return localStorage.getItem("onlyCandidateWalkthrough");
  }

  setOnlyCandidateWalkthroughWalkthrough(){
    localStorage.setItem("onlyCandidateWalkthrough", "true");
  }

  removeOnlyCandidateWalkthroughWalkthrough(){
    localStorage.removeItem("onlyCandidateWalkthrough");
  }

  getAllRelatedUsers(payload){
    return this.http
      .post<any>(this.baseurl + "api/getAllRelatedUsers/", payload)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  async shareToMedia(createdUrl){
    await Share.share({
      url: createdUrl,
      dialogTitle: 'Share with'
    });
  }

  backResponseToUser(fromUserId){
    let params = new HttpParams();
    if(fromUserId){
      params = params.append('fromUserId', fromUserId.toString());
    }
    return this.http.get<any>(this.baseurl + "api/backResponseToUser", {params :params});
  }

  deleteUserPermanantly(){
    return this.http.get<any>(this.baseurl + "api/deleteUserPermanantly");
  }
  
  deleteParticularUser(userId){
    return this.http.post<any>(this.baseurl + "api/deleteParticularUser", {userId : userId});
  }

  getTypeUsers(type){
    return this.http.post<any>(this.baseurl + "api/getTypeUsers", {type : type});
  }

  formatDate(now, format){
    return now ? moment(now).format(format) : '';
  }

  getUserObject(friendsConnections, array, userObj, eachEntry, user){
    for (let desireCompany of array){
      let desireCompanyFinal = desireCompany?.trim()?.toLowerCase();
      for (let connection2 of friendsConnections){
        let introCom = connection2?.resumeId?.introduceYouToo?.trim().toLowerCase();
        
        if(introCom && desireCompanyFinal && introCom.indexOf(desireCompanyFinal) !== -1 && userObj?.user?._id !== connection2?.requester?._id){
          userObj.intro.push({
            company : desireCompanyFinal,
            user : connection2?.requester
          });
          eachEntry.push({
            company : desireCompanyFinal,
            desiredUser : user,
            introUser : connection2?.requester
          });
        }
        
        let introCom2 = connection2?.resumeId2?.introduceYouToo?.trim()?.toLowerCase();
        if(introCom2 && desireCompanyFinal && introCom2.indexOf(desireCompanyFinal) !== -1 && userObj?.user?._id !== connection2?.recipient?._id){
          userObj.intro.push({
            company : desireCompanyFinal,
            user : connection2?.recipient
          });
          eachEntry.push({
            company : desireCompanyFinal,
            desiredUser : user,
            introUser : connection2?.recipient
          });
        }
      }
    }
  }
}
