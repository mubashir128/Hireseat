import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as myGlobals from '../globalPath';
@Injectable({
  providedIn: 'root'
})
export class HomeService {
  public baseurl: any;
  constructor(private http: HttpClient) {
    this.baseurl = myGlobals.baseUrl;
  }
  getAllHomeVideos() {
    return this.http.get<any>(this.baseurl + 'api/getHomeVideos').pipe(
      map((res) => {
        return res;
      })
    )
  }
}
