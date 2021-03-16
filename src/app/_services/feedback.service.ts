import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as myGlobals from '../globalPath';
import { pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  public baseurl: any;
  constructor(private http: HttpClient) {
    this.baseurl = myGlobals.baseUrl;
  }

  addFeedbackInterview(info) {
    return this.http.post<any>(this.baseurl + 'api/addFeedbackInterview', info).pipe(map((res: any) => {
      return res;
    }));
  }

  addskillsFeed(info: any) {
    return this.http.post<any>(this.baseurl + 'api/addSkillsFeed', info).pipe(map((res: any) => {
      return res;
    }));
  }

  getListOfResumes(token) {
    return this.http.get<any>(this.baseurl + 'api/getResumeList/' + token).pipe(map((res: any) => {
      return res;
    }));
  }

  getFeedJobProfiles() {
    return this.http.get<any>(this.baseurl + 'api/getFeedJobProfiles').pipe(map((res: any) => {
      return res;
    }));
  }

  saveFeedBack(feed: any) {
    return this.http.post<any>(this.baseurl + 'api/saveFeedBack', feed).pipe(map((res: any) => {
      return res;
    }));
  }

  getBidsById(id: string) {
    return this.http.get<any>(this.baseurl + 'api/getBidsById/' + id).pipe(map((res: any) => {
      return res;
    }));
  }
  getBidsByIdCount(id: string) {
    return this.http.get<any>(this.baseurl + 'api/getBidsById/' + id).pipe(map((res: any) => {
      return res.length;
    }));
  }

  getRecrutierCandidateBidsByIdCount(id: string) {
    return this.http.get<any>(this.baseurl + 'api/getRecrutierCandidateBidsByIdCount/' + id).pipe(map((res: any) => {
      return res.length;
    }));
  }

  getBidsByIdForRecruiter(id: string) {
    return this.http.get<any>(this.baseurl + 'api/getBidsByIdForRecruiter/' + id).pipe(map((res: any) => {
      return res;
    }));
  }

  // getting selected resumes for interview

  getInterviewdResume(id: string) {
    return this.http.get(this.baseurl + "api/getInterviewdResume/" + id).pipe(map((result: any) => {
      return result;
    }));
  }
  getInterviewdResumeCount(id: string) {
    return this.http.get(this.baseurl + "api/getInterviewdResume/" + id).pipe(map((result: any) => {
      return result.length;
    }));
  }
  // getting selected resumes for interview (For Recruiter)
  getInterviewdResumeForRecruiter(id: string) {
    return this.http.get(this.baseurl + "api/getInterviewdResumeForRecruiter/" + id).pipe(map((result: any) => {
      return result;
    }));
  }
  // saving resumes which are hired

  saveInterViewFeedBack(feedback: any) {
    return this.http.post(this.baseurl + "api/saveInterViewFeedBack", feedback).pipe(map((result: any) => {
      return result;
    }));
  }

  // get Bid data by BidId to show previous details in popup

  getBidsbyBidId(bidId: any) {
    return this.http.get(this.baseurl + "api/getBidsbyBidId/" + bidId).pipe(map((result: any) => {
      return result;
    }));
  }

  getHiredResume(bidId: any) {
    return this.http.get(this.baseurl + "api/getHiredResume/" + bidId).pipe(map((result: any) => {
      return result;
    }));
  }
  getHiredResumeCount(bidId: any) {
    return this.http.get(this.baseurl + "api/getHiredResume/" + bidId).pipe(map((result: any) => {
      return result.length;
    }));
  }
  // getting job Details To Show in job profile tab
  getJobprofileDetails(bidid) {
    return this.http.get(this.baseurl + "api/getJobprofileDetails/" + bidid).pipe(map((result: any) => {
      return result;
    }))
  }

}
