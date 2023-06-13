import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";
import * as myGlobals from "../globalPath";
import { Observable } from 'rxjs';

export enum eTypes {
  apply = "apply",
  refer = "refer"
}

@Injectable({
  providedIn: 'root'
})
export class PostJobService {
  public baseurl: any;

  constructor(private _http: HttpClient) {
    this.baseurl = myGlobals.baseUrl;
  }

  postJob(info: any) {
    let url = this.baseurl + "api/";
    url += (info._id) ? "update-post-job" : "create-post-job";
    return this._http.post<any>(url, info).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getPostJob(jobPost?: any, suggest?, searchFilters?, companyId?) {
    let params = new HttpParams();
    if (jobPost) {
      params = params.append('_id', jobPost._id.toString());
    }

    if (searchFilters) {
      searchFilters.forEach((value, key) => {
        params = params.append(key, value);
      });
    }

    if (companyId) {
      params = params.append('companyId', companyId.toString());
    }

    if (suggest) {
      params = params.append('suggest', suggest);
    }
    return this._http.get<any>(this.baseurl + "api/get-post-job", { params: params });
  }

  applyPostJob(info: any) {
    let url = this.baseurl + "api/apply-post-job/" + info.postJobId;
    return this._http.post<any>(url, info).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  referPostJob(info: any) {
    let url = this.baseurl + "api/refer-post-job/" + info.postJobId;
    return this._http.post<any>(url, info).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getApplyPostJob(jobPost?: any, searchFilters?) {
    let params = new HttpParams();
    if (jobPost) {
      params = params.append('_id', jobPost._id.toString());
    }

    if (searchFilters) {
      searchFilters.forEach((value, key) => {
        params = params.append(key, value);
      });
    }

    return this._http.get<any>(this.baseurl + "api/get-apply-post-job", { params: params });
  }

  getMyPostJob(jobPost?: any, searchFilters?) {
    let params = new HttpParams();
    if (jobPost) {
      params = params.append('_id', jobPost._id.toString());
    }

    if (searchFilters) {
      searchFilters.forEach((value, key) => {
        params = params.append(key, value);
      });
    }

    return this._http.get<any>(this.baseurl + "api/get-my-post-job", { params: params });
  }

  annoucPostJob(jobData):Observable<any>{
    let url = this.baseurl + "api/annouce-post-job";
    return this._http.post<any>(url, jobData);
  }
}
