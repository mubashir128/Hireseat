import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import * as myGlobals from "../globalPath";

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(private http: HttpClient) { }

  topRecruitersRatingPoints(){
    return this.http
      .get<any>(myGlobals.baseUrl + "api/topRecruitersRatingPoints");
  }

}
