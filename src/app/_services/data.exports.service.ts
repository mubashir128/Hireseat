import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as myGlobals from '../globalPath';
import { catchError, map } from "rxjs/operators";
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class DataExportsService {

  public baseurl: any;
  constructor(private http: HttpClient, 
    private _userService : UserService
  ) {
    this.baseurl = myGlobals.baseUrl;
  }

  exportXlsxData(apkUrl, type?) : Observable<any>{
    let url = this.baseurl + apkUrl;
    let params = new HttpParams();
    if(type){
      params = params.append("role", type);
    }

    return this.http.get(url, {params :params, responseType: 'blob'}).pipe(map(data => {
      if(data){
        this.downloadFile(data, type);
      }
      return data;
    }));
  }

  downloadFile(blob, fileName) {
    const aElement = document.createElement('a');
    const objectUrl = window.URL.createObjectURL(blob);
    aElement.href = objectUrl;
    aElement.download = fileName + '-' + this._userService.formatDate(new Date(), "DD-MM-YYYY") + ".xlsx";
    aElement.click();
    window.URL.revokeObjectURL(objectUrl);
  }
}
