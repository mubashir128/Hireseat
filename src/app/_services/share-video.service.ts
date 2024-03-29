import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import * as myGlobals from "../globalPath";
import { Subject } from 'rxjs';
@Injectable({
  providedIn: "root",
})
export class ShareVideoService {
  public baseurl: any;
  private sharableResumeRecruiter = new Subject();
  _sharableResumeRecruiter = this.sharableResumeRecruiter.asObservable();
  constructor(private http: HttpClient) {
    this.baseurl = myGlobals.baseUrl;
  }
  setResume(resume) {
    this.sharableResumeRecruiter.next(resume);
  }
  shareVideoViaEmail(payload) {
    return this.http
      .post<any>(this.baseurl + "api/shareVideoViaEmail", payload)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  checkSharedToken(token) {
    return this.http
      .get<any>(this.baseurl + "api/checkSharedToken/" + token)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  checkCandidateSharedToken(token) {
    return this.http
      .get<any>(this.baseurl + "api/checkCandidateSharedToken/" + token)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  // Recruiter

  shareVideoViaRecruiterEmail(payload) {
    return this.http
      .post<any>(this.baseurl + "api/shareVideoRecruiterViaEmail", payload)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  sendCandidateMailToUsers(payload) {
    return this.http
      .post<any>(this.baseurl + "api/sendCandidateMailToUsers", payload)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

}
