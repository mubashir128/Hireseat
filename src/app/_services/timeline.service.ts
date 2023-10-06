import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";
import * as myGlobals from "../globalPath";

@Injectable({
  providedIn: 'root'
})
export class TimelineService {

  public baseurl: any;
  constructor(private http: HttpClient) {
    this.baseurl = myGlobals.baseUrl;
  }

  likeTimeline(timelineId) {
    return this.http.post<any>(this.baseurl + "api/like-timeline", { timelineId : timelineId } ).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getTimelineComments(timelineId) {
    return this.http.get<any>(this.baseurl + "api/get-timeline-comments/" + timelineId).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
