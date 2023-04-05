import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as myGlobals from "../globalPath";
import { AbstractService } from './abstract.service';

export class ConferenceRoom {
  _id: string;
  conferenceFromId: any;
  conferenceToIds: any[];
  candidate_id: any;

  constructor();
  constructor(_id?: string, conferenceFromId?: any, conferenceToIds?: any[], candidate_id?: any){
    this._id = _id;
    this.conferenceFromId = conferenceFromId;
    this.conferenceToIds = conferenceToIds;
    this.candidate_id = candidate_id;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ConferenceRoomService {
  public baseurl: any;

  constructor(
    private _http: HttpClient,
    private _abstractService: AbstractService
  ){
    this.baseurl = myGlobals.baseUrl;
  }

  save(conferenceToId, profileId): Observable<any> {
    let url = this.baseurl + "api/create-conference-room";
    let req = new HttpRequest("POST", url, {conferenceToId : conferenceToId, profileId : profileId}, { reportProgress: true });
    return this._abstractService.requestProgress(this._http, req);
  }

  saveMultiple(conferenceToIds, profileId): Observable<any> {
    let url = this.baseurl + "api/multiple-create-conference-room";
    let req = new HttpRequest("POST", url, {conferenceToIds : conferenceToIds, profileId : profileId}, { reportProgress: true });
    return this._abstractService.requestProgress(this._http, req);
  }

  getConferenceRooms(): Observable<any> {
    let url = this.baseurl + "api/get-conference-room";
    let params = new HttpParams();
    return this._http.get<any>(url, { params: params });
  }

  postMyComment(payload) {
    return this._http.post<any>(this.baseurl + "api/conference-post-comment", payload);
  }

}
