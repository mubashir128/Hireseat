import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as myGlobals from '../globalPath';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public baseurl: any;
  constructor(private http: HttpClient) { 
    this.baseurl = myGlobals.baseUrl;
  }

  getAllUsers(){
    return this.http.get<any[]>(this.baseurl+'api/getAllUsers').pipe(map((res:any[])=>{
      return res;
    }));
  }
}
