import { Injectable } from '@angular/core';
import { MyClient } from '../models/myClient';
import { HttpClient } from "@angular/common/http";
import * as myGlobals from "../globalPath";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MyClientService {
  public baseurl: any;
  constructor(private http: HttpClient) {
    this.baseurl = myGlobals.baseUrl;
  }

  createNewMyClient(client: MyClient) {
    return this.http
      .post<MyClient>(this.baseurl + "api/create-new-client", client)
      .pipe(
        map((res: MyClient) => {
          return res;
        })
      );
  }

  getClients() {
    return this.http.get<MyClient[]>(this.baseurl + "api/get-clients").pipe(
      map((res: MyClient[]) => {
        return res;
      })
    );
  }
}
