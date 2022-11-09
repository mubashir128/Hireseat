import { HttpClient, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import * as myGlobals from "../globalPath";
import { uploadFile } from "../shared/shared-components/components/abstract-dialog.component";
import { PeoplesEvent } from "../shared/shared-components/components/app-list/app-list.component";
import { AbstractService } from "./abstract.service";

export class PeopleEventResponse {
  constructor(public peoplesEvent: PeoplesEvent[]) {}
}

@Injectable({
  providedIn: "root",
})
export class PeopleEventService extends AbstractService {
  public baseurl: any;

  constructor(
    private _http: HttpClient,
    private _abstractService: AbstractService
  ) {
    super();
    this.baseurl = myGlobals.baseUrl;
  }

  save(peopleEvent: PeoplesEvent, imagePath): Observable<any> {
    let hitApi = peopleEvent._id ? "api/edit-people-event" : "api/create-people-event";
    let url = this.baseurl + hitApi;
    let formData = new FormData();
    if (imagePath) {
      formData.append("file", imagePath[0], imagePath[0].name);
    }
    this.toFormData(formData, peopleEvent);
    let req = new HttpRequest("POST", url, formData, { reportProgress: true });
    return this._abstractService.requestProgress(this._http, req);
  }

  delete(eventId) {
    let url = this.baseurl + "api/delete-people-event/" + eventId;
    return this._http.delete<any>(url);
  }

  getEvents(eventId?: any): Observable<any> {
    let url = this.baseurl + "api/get-events";
    let params = new HttpParams();
    if (eventId) {
      params = params.append("eventId", eventId);
    }
    return this._http.get<PeopleEventResponse>(url, { params: params });
  }

  attendEvent(event): Observable<any> {
    let url = this.baseurl + "api/attend-events";
    let params = new HttpParams();
    params = params.append("eventId", event.eventId);
    return this._http.get<PeopleEventResponse>(url, { params: params });
  }

  cancelAttendEvent(event): Observable<any> {
    let url = this.baseurl + "api/cancel-attend-events/" + event.eventId;
    return this._http.delete<any>(url);
  }

  postEventComment(eventId,postData):Observable<any>{
    let url = this.baseurl + "api/post-event-comment/" + eventId;
    return this._http.post<any>(url,postData);
  }

  checkInEvent(event): Observable<any> {
    let url = this.baseurl + "api/check-in-event/"+event.eventId;
    return this._http.get<PeopleEventResponse>(url);
  }

  unCheckInEvent(event): Observable<any> {
    let url = this.baseurl + "api/uncheck-in-event/"+event.eventId;
    return this._http.get<PeopleEventResponse>(url);
  }
}
