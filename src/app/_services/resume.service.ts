import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as myGlobals from '../globalPath';
import { IResume,Resume } from '../models/resume'
import { IResumeBank } from '../models/resumebank';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  public baseurl: any;
  constructor(private http: HttpClient) { 
    this.baseurl = myGlobals.baseUrl;
  }

  uploadResume(info){
    return this.http.post<any>(this.baseurl+'api/uploadResume',info).pipe(map((res:any)=>{
      return res;
    }));
  }

  uploadResumeInBank(info){
    return this.http.post<any>(this.baseurl+'api/uploadResumeInBank',info).pipe(map((res:any)=>{
      return res;
    }));
  }

  createResume(info:IResume){
    return this.http.post<IResume>(this.baseurl+'api/createResume',info).pipe(map((res:IResume)=>{
      return res;
    }));
  }

  addToResumeBank(info:IResumeBank){
    return this.http.post<IResumeBank>(this.baseurl+'api/addToResumeBank',info).pipe(map((res:IResumeBank)=>{
      return res;
    }));
  }

  getAllResume(){
    return this.http.get<IResume[]>(this.baseurl+'api/getAllResume').pipe(map((res:IResume[])=>{
      return res;
    }))
  }
 
  
  getsuggestedresume(info:any){

    return this.http.get<IResume>(this.baseurl+'api/getsuggestedresume/'+info).pipe(map((res:IResume)=>{
      return res;
    }))
  }
  updateResume(info:IResume){
    return this.http.put<IResume>(this.baseurl+'api/updateResume',info).pipe(map((res:IResume)=>{
      return res;
    }));
  }
  updateResumeBankBidStatus(info:IResume){
    return this.http.put<IResume>(this.baseurl+'api/updateResumeBankBidStatus',info).pipe(map((res:IResume)=>{
      return res;
    }));
  }

  removeResume(info:any,type:string){
    return this.http.delete<any>(this.baseurl+'api/removeResume/'+'?id='+info+'&type='+type).pipe(map((res:any)=>{
      return res;
    }));
  }

  getResumeById(info:any){
    return this.http.get<IResume>(this.baseurl+'api/getResumeById/'+info).pipe(map((res:IResume)=>{
      return res;
    }))
  }

  getSkillSets(){
    return this.http.get<any>(this.baseurl+'api/getSkillSets').pipe(map((res:any)=>{
      return res;
    }))
  }

  getResumeBySkillSets(skillsets){
    return this.http.post<any>(this.baseurl+'api/getResumeBySkillSets',{skillsets:skillsets}).pipe(map((res:any)=>{
      return res;
    }))
  }

  addToResumeRepo(resumebank_id){
    return this.http.post<any>(this.baseurl+'api/addToResumeRepo',{resumebank_id:resumebank_id}).pipe(map((res:any)=>{
      return res;
    }))
  }

  //Here updateing skillset by adding new tag
  addNewTag(tag){
    return this.http.post<any>(this.baseurl + "api/add-new-tag",tag).pipe(map((result:any)=>{
      return result;
    }));
  }
  //Here remove tag when user removes he added task
  removeNewTag(tag){
    return this.http.post<any>(this.baseurl + "api/remove-new-tag",tag).pipe(map((result:any)=>{
      return result;
    }));
  }

}
