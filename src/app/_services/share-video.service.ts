import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as myGlobals from '../globalPath';
@Injectable({
  providedIn: 'root'
})
export class ShareVideoService {
  public baseurl: any;
  constructor(private http: HttpClient) {
    this.baseurl = myGlobals.baseUrl;

  }
  shareVideoViaEmail(payload) {
    return this.http.post<any>(this.baseurl + 'api/shareVideoViaEmail', payload).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  checkSharedToken(token) {
    return this.http.get<any>(this.baseurl + 'api/checkSharedToken/' + token).pipe(map((res) => {
      return res;
    }));
  }
}
