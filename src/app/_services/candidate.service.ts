import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import * as myGlobals from "../globalPath";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class CandidateService {
  baseurl: any;

  constructor(private http: HttpClient) {
    this.baseurl = myGlobals.baseUrl;
  }
  // auth : candidate
  getCandidateProfile() {
    return this.http.get<any>(this.baseurl + "api/getCandidateProfile").pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getCandidateIndustries() {
    return this.http.get<any>(this.baseurl + "api/getCandidateIndustries").pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  // auth : candidate
  editProfile(payload) {
    return this.http
      .post<any>(this.baseurl + "api/editCandidateProfile", payload)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  // auth : candidate
  getAllPostRecruiters() {
    return this.http.get<any>(this.baseurl + "api/getPostedRecruiters").pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  // auth : candidate
  reqCoaching(payload) {
    return this.http
      .post<any>(this.baseurl + "api/request-coaching", payload)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  // auth : candidate
  getMyAcceptedProfiles() {
    return this.http
      .get<any>(this.baseurl + "api/get-my-accepted-profiles")
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  sharewithRecruiter(payload) {
    return this.http
      .put<any>(this.baseurl + "api/share-with-recruiter", payload)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  //
  myProfileStatus(payload) {
    return this.http
      .post<any>(this.baseurl + "api/my-profile-status", payload)
      .pipe(
        map((result: any) => {
          return result;
        })
      );
  }
  uploadVideo(payload) {
    return this.http
      .post<any>(this.baseurl + "api/upload-my-video", payload)
      .pipe(
        map((result: any) => {
          return result;
        })
      );
  }
  
  getPostedRecruiter(payload) {
    return this.http
      .post<any>(this.baseurl + "api/get-posted-recruiter", payload)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getSortByIndustries(payload) {
    return this.http
      .post<any>(this.baseurl + "api/getSortByIndustries", payload)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
}
