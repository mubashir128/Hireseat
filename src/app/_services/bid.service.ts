import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as myGlobals from '../globalPath';
import { IBid } from '../models/bid'
import { IBiddingEvent } from '../models/bidding-event'


@Injectable({
  providedIn: 'root'
})
export class BidService {
  public baseurl: any;
  constructor(private http: HttpClient) {
    this.baseurl = myGlobals.baseUrl;
  }

  createBid(info) {
    return this.http.post<IBid>(this.baseurl + 'api/createBid', info).pipe(map((res: any) => {
      return res;
    }));
  }

  getAllBids(info) {
    return this.http.get<IBid[]>(this.baseurl + 'api/getAllBids/' + info).pipe(map((res: IBid[]) => {
      return res;
    }));
  }

  getBiddingDetails(info) {
    return this.http.get<IBid[]>(this.baseurl + 'api/getBiddingDetails/' + info).pipe(map((res: IBid[]) => {
      return res;
    }));
  }

  getRecruiterBids(recruiterKey, biddingEventKey) {
    return this.http.get<IBid[]>(this.baseurl + 'api/getRecruiterBids/' + recruiterKey + '/' + biddingEventKey).pipe(map((res: IBid[]) => {
      return res;
    }));
  }
  getRecruiterBidsCount(biddingEventKey) {
    return this.http.get<IBid[]>(this.baseurl + 'api/getRecruiterBidsCount/' + biddingEventKey).pipe(map((res: any) => {

      return res;
    }));
  }

  getresumebybiddingevent(biddingEventKey) {
    // console.log(biddingEventKey)
    return this.http.get<IBid[]>(this.baseurl + 'api/getresumebybiddingevent/' + biddingEventKey).pipe(map((res: IBid[]) => {
      return res;
    }));
  }



  getSelectedBids(obj) {
    return this.http.post<IBiddingEvent[]>(this.baseurl + 'api/getSelectedBids/',obj).pipe(map((res: IBiddingEvent[]) => {
      return res;
    }));
  }


  updateResumeStatus(id) {
    return this.http.put<any>(this.baseurl + 'api/updateResumeStatus/', { 'id': id }).pipe(map((res: any) => {
      return res;
    }));
  }


  getRecruiterWonBids(recruiterKey) {
    return this.http.get<IBid[]>(this.baseurl + 'api/getRecruiterWonBids/' + recruiterKey).pipe(map((res: IBid[]) => {
      return res;
    }));
  }

  getJobProfile(jobProfileKey) {
    return this.http.get<any>(this.baseurl + 'api/getJobProfile/' + jobProfileKey).pipe(map((res: any) => {
      return res;
    }));
  }
  getCandidateBidsCount() {
    return this.http.get<IBid[]>(this.baseurl + 'api/getCandidateBidsCount').pipe(map((res: any) => {

      return res;
    }));
  }
  createCandidateBid(info) {
    return this.http.post<IBid>(this.baseurl + 'api/createCandidateBid', info).pipe(map((res: any) => {
      return res;
    }));
  }
  

}
