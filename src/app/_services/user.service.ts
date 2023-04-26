import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";
import * as myGlobals from "../globalPath";
import { IProfile } from "../profile/model/user-profile";

import { IUser } from "../models/user";
import { BehaviorSubject, Subject } from "rxjs";
import { Share } from '@capacitor/share';
import * as moment from "moment";

export enum eUserType {
  employer = "employer", //2
  recruiter = "recruiter", //3
  candidate = "candidate" //4
}

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

  registerMobileCandidate(info: any) {
    return this.http.post<any>(this.baseurl + "api/registerMobileCandidate", info).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  verifyMobileCandidate(info: any) {
    return this.http.post<any>(this.baseurl + "api/verifyMobileCandidate", info).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  checkVerification(info: any) {
    return this.http.post<any>(this.baseurl + "api/checkVerification", info).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  checkEmailMobileCandidate(info: any) {
    return this.http.post<any>(this.baseurl + "api/checkEmailMobileCandidate", info).pipe(
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

  getUsersWithRole(userRole, searchFilters) {
    let params = new HttpParams();
    if (searchFilters) {
      searchFilters.forEach((value, key) => {
        params = params.append(key, value);
      });
    }
    return this.http.get(this.baseurl + "api/get-users/" + userRole, { params: params });
  }

  getUsersWithField(userRole, fieldName, fieldValue) {
    let params = new HttpParams();
    params = params.append('fieldName', fieldName);
    params = params.append('fieldValue', JSON.stringify(fieldValue));
    return this.http.get(this.baseurl + "api/get-users-with-fields/" + userRole, { params: params });
  }

  getUsersById() {
    return this.http.get(this.baseurl + "api/get-users-by-id");
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

  updateAsARecruiter(data: any) {
    return this.http
      .post<any>(this.baseurl + "api/update-as-a-recruiter/", data)
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

  getBeforeSharedWalkthrough(){
    return localStorage.getItem("beforeSharedWalkthrough");
  }

  setBeforeSharedWalkthrough(){
    localStorage.setItem("beforeSharedWalkthrough", "true");
  }

  removeBeforeSharedWalkthrough(){
    localStorage.removeItem("beforeSharedWalkthrough");
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

  setSelectToAddFriends(){
    localStorage.setItem("selectToAddCandidate", "true");
  }

  getSelectToAddFriends(){
    return localStorage.getItem("selectToAddCandidate");
  }

  removeSelectToAddFriends(){
    localStorage.removeItem("selectToAddCandidate");
  }

  setAutoRunValueFinder(){
    localStorage.setItem("autoValueFinder", "true");
  }

  getAutoRunValueFinder(){
    return localStorage.getItem("autoValueFinder");
  }

  removeAutoRunValueFinder(){
    localStorage.removeItem("autoValueFinder");
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

  dateDifference(date1, date2){
    let day1 = moment(date1);
    let day2 = moment(date2);
    return day1.diff(day2, "days");
  }

  timeDifference(time1, date){
    var startTime = moment(time1, 'HH:mm a');
    var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    var am_pm = date.getHours() >= 12 ? "PM" : "AM";
    hours = hours < 10 ? "0" + hours : hours;
    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    
    var endTime = moment(hours + ':' + minutes + ' '+am_pm, 'HH:mm a');

    // calculate total duration
    return endTime.diff(startTime, 'minutes');
    // return endTime.diff(startTime, 'hours');
  }

  getUserObject(friendsConnections, array, userObj, eachEntry, user, loggedUser, allConnectedFriends){
    for (let desireCompany of array){
      let desireCompanyFinal = desireCompany?.trim()?.toLowerCase();
      for (let connection2 of friendsConnections){
        let introCom = connection2?.resumeId?.introduceYouToo?.trim().toLowerCase();
        
        if(connection2?.requester?._id !== loggedUser._id && introCom && desireCompanyFinal && introCom.indexOf(desireCompanyFinal) !== -1 && userObj?.user?._id !== connection2?.requester?._id){
          let status = this.checkConnectedOrNot(allConnectedFriends, user, connection2?.requester);
          if(!status){
            eachEntry.push({
              company : desireCompanyFinal,
              desiredUser : user,
              introUser : connection2?.requester
            });
          }
        }
        
        let introCom2 = connection2?.resumeId2?.introduceYouToo?.trim()?.toLowerCase();
        if(connection2?.recipient?._id !== loggedUser._id && introCom2 && desireCompanyFinal && introCom2.indexOf(desireCompanyFinal) !== -1 && userObj?.user?._id !== connection2?.recipient?._id){
          let status = this.checkConnectedOrNot(allConnectedFriends, user, connection2?.recipient);
          if(!status){
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

  getUserObject2(friendsConnections, array, userObj, eachEntry, user, loggedUser, allConnectedFriends){
    for (let industryName of array){
      let industryFinal = industryName?.trim()?.toLowerCase();
      for (let connection2 of friendsConnections){
        let introCom = connection2?.resumeId?.industries ? connection2?.resumeId?.industries.map((industry)=>industry?.name?.trim().toLowerCase()) : [];
        
        if(connection2?.requester?._id !== loggedUser._id && introCom && industryFinal && introCom.indexOf(industryFinal) !== -1 && userObj?.user?._id !== connection2?.requester?._id){
          let status = this.checkConnectedOrNot(allConnectedFriends, user, connection2?.requester);
          if(!status){
            eachEntry.push({
              company : industryFinal,
              desiredUser : user,
              introUser : connection2?.requester
            });
          }
        }
        
        let introCom2 = connection2?.resumeId2?.industries ? connection2?.resumeId2?.industries.map((industry)=>industry?.name?.trim().toLowerCase()) : [];
        if(connection2?.recipient?._id !== loggedUser._id && introCom2 && industryFinal && introCom2.indexOf(industryFinal) !== -1 && userObj?.user?._id !== connection2?.recipient?._id){
          let status = this.checkConnectedOrNot(allConnectedFriends, user, connection2?.recipient);
          if(!status){
            eachEntry.push({
              company : industryFinal,
              desiredUser : user,
              introUser : connection2?.recipient
            });
          }
        }
      }
    }
  }

  checkConnectedOrNot(allConnectedFriends, user, user2){
    let status = false;
    for(let item of allConnectedFriends){
      if(item?.recipient?._id == user?._id && item?.requester?._id == user2?._id){
        status = true;
        break;
      }else if(item?.requester?._id == user?._id && item?.recipient?._id == user2?._id){
        status = true;
        break;
      }
    }
    return status;
  }
}
