import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import * as myGlobals from "../globalPath";
import { BehaviorSubject, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  public baseurl: any;
  constructor(private http: HttpClient) {
    this.baseurl = myGlobals.baseUrl;
  }

  createEvent(payload) {
    return this.http.post<any>(this.baseurl + 'api/create-event', payload).pipe(map((res: any) => {
      return res;
    }));
  }
  getAllEvents() {
    return this.http.get<any>(this.baseurl + 'api/get-all-events').pipe(map((res: any) => {
      return res;
    }));
  }
  editEvent(payload) {
    return this.http.put<any>(this.baseurl + 'api/edit-event', payload).pipe(map((res: any) => {
      return res;
    }));
  };
  deleteEvent(payload) {
    return this.http.post<any>(this.baseurl + 'api/delete-event', payload).pipe(map((res: any) => {
      return res;
    }));
  }
}
