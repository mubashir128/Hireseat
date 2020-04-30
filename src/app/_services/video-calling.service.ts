import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as myGlobals from '../globalPath';
import { IProfile } from '../profile/model/user-profile'; @Injectable({
  providedIn: 'root'
})
export class VideoCallingService {
  public baseurl: any;
  constructor(private http: HttpClient) {
    this.baseurl = myGlobals.baseUrl;

  }
  addToVideoInterviewRoomRecruiter(payload) {
    return this.http.post<any>(this.baseurl + 'api/addCandidateToRecruitersList', payload).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  getAllRecruitersCandidates(recruiterId) {
    return this.http.post<any>(this.baseurl + 'api/getAllRecruitersCandidatesList', recruiterId).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  storeArchive(payload) {
    return this.http.post<any>(this.baseurl + 'api/storeArchive', payload).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  getArchivedVideo(payload) {
    return this.http.post<any>(this.baseurl + 'api/getArchivedVideo', payload).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  traashCandidateFromInterviewList(payload) {
    return this.http.post<any>(this.baseurl + 'api/trashCandidate', payload).pipe(map((res: any) => {
      return res;
    })
    );
  }
  getCandidatesInfoById(payload) {
    return this.http.post<any>(this.baseurl + 'api/getCandidatesInfo', payload).pipe(map((res: any) => {
      return res;
    })
    );
  }
  submitRecruitersReview(payload) {
    return this.http.post<any>(this.baseurl + 'api/recruiterReview', payload).pipe(map((res: any) => {
      return res;
    })
    );
  }
  bookmarkCandidate(payload) {
    return this.http.post<any>(this.baseurl + 'api/bookmarkCandidate', payload).pipe(map((res: any) => {
      return res;
    })
    );
  }
}
