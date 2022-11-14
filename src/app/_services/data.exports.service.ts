import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as myGlobals from '../globalPath';
import { catchError, map } from "rxjs/operators";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataExportsService {

  public baseurl: any;
  constructor(private http: HttpClient) { 
    this.baseurl = myGlobals.baseUrl;
  }

  exportXlsxData(apkUrl) : Observable<any>{
    let url = this.baseurl + apkUrl;
    let params = new HttpParams();
    // params = params.append("role", "candidate");
    // params = params.append("role", "recruiter");
    // params = params.append("role", "employer");

    return this.http.get(url, {params :params, responseType: 'blob'}).pipe(map(data => {
      if(data){
        this.downloadFile(data);
      }
      return data;
    }));
  }

  downloadFile(blob: Blob) {
    // @ts-ignore
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }
}
