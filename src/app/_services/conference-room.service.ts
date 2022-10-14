import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as myGlobals from "../globalPath";
import { AbstractService } from './abstract.service';

export class ConferenceRoom {
  _id: string;
  conferenceFromId: any;
  conferenceToId: any;

  constructor();
  constructor(_id?: string, conferenceFromId?: string, conferenceToId?: Date){
    this._id = _id;
    this.conferenceFromId = conferenceFromId;
    this.conferenceToId = conferenceToId;
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

  save(conferenceToId): Observable<any> {
    let url = this.baseurl + "api/create-conference-room";
    let req = new HttpRequest("POST", url, {conferenceToId : conferenceToId}, { reportProgress: true });
    return this._abstractService.requestProgress(this._http, req);
  }

  getConferenceRooms(): Observable<any> {
    let url = this.baseurl + "api/get-conference-room";
    let params = new HttpParams();
    return this._http.get<any>(url, { params: params });
  }

}
