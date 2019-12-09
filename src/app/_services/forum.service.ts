import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as myGlobals from '../globalPath';

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  public baseurl: any;
 constructor(private http: HttpClient) { 
    this.baseurl = myGlobals.baseUrl;
  }
  
  getQuestions(){
    return this.http.get<any>(this.baseurl+'api/getQuestionData').pipe(map((res:any)=>{    
      return res;
    }))
  }
  getUserId(){
    return localStorage.getItem('currentUser');
  }
  
  addAnserData(data:any){
    return this.http.post<any>(this.baseurl+'api/saveAnswerData',data).pipe(map((res:any)=>{    
      return res;
    }))
  }
  getAnswerData(){
    return this.http.get<any>(this.baseurl+'api/getanswerData').pipe(map((res:any)=>{
      return res;
    }))
  }
  getUnAnsweredData(){
    return this.http.get<any>(this.baseurl+'api/getUnAnsweredData').pipe(map((res:any)=>{
      return res;
    }))
  }
  getQuestionById(id:any){
    return this.http.get<any>(this.baseurl+'api/getQuestionById/'+id).pipe(map((res:any)=>{
      return res;
    }))
  }
  updateQueAnsReadStatus(id:any){
    return this.http.get<any>(this.baseurl+'api/updateQueAnsReadStatus/'+id).pipe(map((res:any)=>{
      return res;
    }))
  }
  
  getMulipleAnsByQuesId(id:any){
    return this.http.get<any>(this.baseurl+'api/getMulipleAnsByQuesId/'+id).pipe(map((res:any)=>{
      return res;
    }))
  }
  searchQuestionData(data:any){
    return this.http.post<any>(this.baseurl+'api/searchQuestionData/',data).pipe(map((res:any)=>{
      return res;
    }))
  }
  getAllUnAnsQuestionsByEmployerId(id:any){
    return this.http.get<any>(this.baseurl+'api/getAllUnAnsQuestionsByEmployerId/'+id).pipe(map((res:any)=>{
      return res;
    }))
  }
  getAllUnreadAnsQueByRecruiteId(id:any){
    return this.http.get<any>(this.baseurl+'api/getAllUnreadAnsQueByRecruiteId/'+id).pipe(map((res:any)=>{
      return res;
    }))
  }
  
   

  
}
