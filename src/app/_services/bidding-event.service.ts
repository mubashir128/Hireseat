import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as myGlobals from '../globalPath';
import { IBiddingEvent } from '../models/bidding-event'
import { IJobProfile } from '../models/job-profile';
import { IRecruiterProfile } from '../models/recruiter-profile';

@Injectable({
  providedIn: 'root'
})
export class BiddingEventService {

  public baseurl: any;
  constructor(private http: HttpClient) { 
    this.baseurl = myGlobals.baseUrl;
  }

  updateBiddingEventStatus(info:IBiddingEvent){
    return this.http.put<IBiddingEvent[]>(this.baseurl+'api/updateBiddingEventStatus/',info).pipe(map((res:IBiddingEvent[])=>{
      return res;
    }));
  }

  getMyBids(info){
    return this.http.get<IBiddingEvent[]>(this.baseurl+'api/getMyBids/'+info).pipe(map((res:IBiddingEvent[])=>{
      return res;
    }));
  }
  deletejobPost(id,employerkey){
    return this.http.get<IBiddingEvent>(this.baseurl+'api/deletejobPost/'+id+ '/' + employerkey).pipe(map((res:IBiddingEvent)=>{    
      return res;
    }))
  }
  createBiddingEvent(info:IBiddingEvent){
    return this.http.post<IBiddingEvent>(this.baseurl+'api/createBiddingEvent',info).pipe(map((res:IBiddingEvent)=>{
      return res;
    }))
  }
  addRecruiterCost(info){
    return this.http.post<IBiddingEvent>(this.baseurl+'api/addRecruiterCost',info).pipe(map((res:IBiddingEvent)=>{
      return res;
    }))
  }
  getAllRecruiterCost(id){
    return this.http.get<IBiddingEvent>(this.baseurl+'api/getRecruiterCost/'+id).pipe(map((res:IBiddingEvent)=>{    
      return res;
    }))
  }
  getRecruiterCostById(info){
    return this.http.post<IBiddingEvent>(this.baseurl+'api/getRecruiterCostById',info).pipe(map((res:IBiddingEvent)=>{
      return res;
    })) 
  }
  updateRecruiterCost(info){
    return this.http.post<IBiddingEvent>(this.baseurl+'api/updateRecruiterCost',info).pipe(map((res:IBiddingEvent)=>{
      return res;
    })) 
  }

  getBiddingEvents(obj){
    return this.http.post<IBiddingEvent[]>(this.baseurl+'api/getBiddingEvents',obj).pipe(map((res:IBiddingEvent[])=>{    
      return res;
    }))
  }
  
  getBiddingEventById(id:any){
    return this.http.get<IBiddingEvent>(this.baseurl+'api/getBiddingEventById/'+id).pipe(map((res:IBiddingEvent)=>{    
      return res;
    }))
  }
  getAllJobProfile(obj){
    return this.http.post<IBiddingEvent[]>(this.baseurl+'api/getAllJobProfile/',obj).pipe(map((res:IBiddingEvent[])=>{    
      return res;
    }))
  }
 
  getAllBiddingEvents(info){
    return this.http.get<IBiddingEvent[]>(this.baseurl+'api/getAllBiddingEvents/'+info).pipe(map((res:IBiddingEvent[])=>{    
      return res;
    }))
  }

  createJobProfile(info:IJobProfile){
    return this.http.post<IJobProfile>(this.baseurl+'api/createJobProfile',info).pipe(map((res:IJobProfile)=>{
      return res;
    }))
  }
  
  getJobProfiles(){
    return this.http.get<IJobProfile[]>(this.baseurl+'api/getJobProfiles').pipe(map((res:IJobProfile[])=>{    
      return res;
    }))
  }
  
  getJobProfilesByLimit(obj){
    return this.http.post<IJobProfile[]>(this.baseurl+'api/getJobProfilesByLimit',obj).pipe(map((res:IJobProfile[])=>{    
      return res;
    }))
  }

  getJobProfileById(id:any){
    return this.http.get<IJobProfile>(this.baseurl+'api/getJobProfileById/'+id).pipe(map((res:IJobProfile)=>{    
      return res;
    }))
  }
  
  updateJobProfile(info:IJobProfile){
    return this.http.put<IJobProfile>(this.baseurl+'api/updateJobProfile',info).pipe(map((res:IJobProfile)=>{    
      return res;
    }))
  }

  getRecruiterList(obj){
    return this.http.post<IRecruiterProfile[]>(this.baseurl+'api/getRecruiterList',obj).pipe(map((res:IRecruiterProfile[])=>{
      return res;
    }));
  }

  getTopRecruiterList(){
    return this.http.get<IRecruiterProfile[]>(this.baseurl+'api/getTopRecruiterList').pipe(map((res:IRecruiterProfile[])=>{
      return res;
    }));
  }
  
  createRecruiterBiddingEvent(info:IBiddingEvent){
    return this.http.post<IBiddingEvent>(this.baseurl+'api/createRecruiterBiddingEvent',info).pipe(map((res:IBiddingEvent)=>{
      return res;
    }))
  }
}
