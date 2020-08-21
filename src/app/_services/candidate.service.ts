import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as myGlobals from '../globalPath';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  baseurl: any;

  constructor(
    private http: HttpClient
  ) {
    this.baseurl = myGlobals.baseUrl;
  }
  getCandidateProfile() {
    return this.http.get<any>(this.baseurl + 'api/getCandidateProfile').pipe(map((res: any) => {
      return res;
    }));
  }
  editProfile(payload) {
    return this.http.post<any>(this.baseurl + 'api/editCandidateProfile', payload).pipe(map((res: any) => {
      return res;
    }));
  }
  getAllPostRecruiters() {
    return this.http.get<any>(this.baseurl + 'api/getPostedRecruiters').pipe(map((res: any) => {
      return res;
    }));
  }
}
