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

  getCandidateExperienceIndustries() {
    return this.http.get<any>(this.baseurl + "api/getCandidateExperienceIndustries").pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  saveCandidateProfileData(payload) {
    return this.http
      .post<any>(this.baseurl + "api/saveCandidateProfileData", payload)
      .pipe(
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

  sharedCandidateProfile(payload) {
    return this.http
      .post<any>(this.baseurl + "api/sharedCandidateProfile", payload)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  sharePreviewEmail(payload) {
    return this.http
      .post<any>(this.baseurl + "api/sharePreviewEmail", payload)
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

  uploadCanResume(fData) {
    return this.http
      .post<any>(this.baseurl + "api/uploadCanResume", fData)
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

  getMultiSortByIndustries(payload) {
    return this.http
      .post<any>(this.baseurl + "api/getMultiSortByIndustries", payload)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getCandidateProfileBid(id) {
    return this.http.get<any>(this.baseurl + "api/getCandidateProfileBid/"+ id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getRecruiterCandidateBids(id) {
    return this.http.get<any>(this.baseurl + "api/getRecruiterCandidateBids/"+ id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  shareWithUsers(payload) {
    return this.http.post<any>(this.baseurl + "api/shareWithUsers", payload).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  connectWithUsers(payload) {
    return this.http.post<any>(this.baseurl + "api/connectWithUsers", payload).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  connectWithMultipleUsers(payload) {
    let params = [];
    if(payload){
      payload.forEach((value, key) => {
        if(value){
          params.push(key);
        }
      });
    }
    
    return this.http.post<any>(this.baseurl + "api/connectWithMultipleUsers", {recipients : params}).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  
  getAllConnectedUsers(payload) {
    return this.http.post<any>(this.baseurl + "api/getAllConnectedUsers", payload).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  acceptFriendRequest(payload) {
    return this.http.post<any>(this.baseurl + "api/acceptFriendRequest", payload).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  cancelFriendRequest(payload) {
    return this.http.post<any>(this.baseurl + "api/cancelFriendRequest", payload).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  sayThxLetter(payload) {
    return this.http.post<any>(this.baseurl + "api/sayThxLetter", payload).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getCandidateSharedProfiles() {
    return this.http.get<any>(this.baseurl + "api/getCandidateSharedProfiles").pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
