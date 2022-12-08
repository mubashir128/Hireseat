import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from "@angular/common/http";
import * as myGlobals from "../globalPath";
import { map } from 'rxjs/operators';
import { AbstractService } from './abstract.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public baseurl: any;

  constructor(
    private _http: HttpClient,
    private _abstractService : AbstractService
  ) {
    this.baseurl = myGlobals.baseUrl;
  }

  uploadChatFile(data: any) {
    return this._http.post<any>(this.baseurl + "api/uploadChatFile/", data).pipe(map((res: any) => {
      return res;
    }));
  }

  downloadChatFile(filePath, message): Observable<Number> {
    let url = this.baseurl + "api/downloadChatFile/";
    let req = new HttpRequest("POST", url, { fileName: message, filePath: filePath }, {
      reportProgress: true,
      responseType: "blob",
      headers: new HttpHeaders().append("Content-Type", "application/json")
    });
    let result = this._abstractService.requestProgress(this._http, req);
    return result;
  }

  download(blob, fileName) {
    const aElement = document.createElement('a');
    const objectUrl = window.URL.createObjectURL(blob);
    aElement.href = objectUrl;
    aElement.download = fileName;
    aElement.click();
    window.URL.revokeObjectURL(objectUrl);
  }
}
