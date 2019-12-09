import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpEvent, HttpErrorResponse, HttpEventType } from  '@angular/common/http';
import { map, tap } from  'rxjs/operators';

import * as myGlobals from '../globalPath';
import { Observable, Subject } from 'rxjs';
import { Resume } from '../models/resume';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }
  public baseurl: any;
  constructor(private http: HttpClient) { 
     this.baseurl = myGlobals.baseUrl;
   }
   
   getpostdata(data){
    return this.http.post<any>(this.baseurl+'api/saveBlogData',data).pipe( map((res:any)=>{    
      return res;
    }))
   }

    //Here updateing skillset by adding new tag
  addNewTag(tag){
    return this.http.post<any>(this.baseurl + "api/addBlogTag",tag).pipe(map((result:any)=>{
      return result;
    }));
  }
  //Here remove tag when user removes he added task
  removeNewTag(tag){
    return this.http.post<any>(this.baseurl + "api/removeBlogTag",tag).pipe(map((result:any)=>{
      return result;
    }));
  }

  addNewCateg(data){
    return this.http.post<any>(this.baseurl + "api/addblogsCategories",data).pipe(tap(() =>  {
      this._refreshNeeded$.next();
    }),map((result:any)=>{
      return result;
    }));
  }
  getTagPost(tag,limit){
    return this.http.post<any>(this.baseurl + "api/getBlogPostByTag",{tag:tag,limit:limit}).pipe(map((result:any)=>{
      return result;
    }));

}
  getBlogCategories(){
    return this.http.get<any>(this.baseurl + "api/getBlogcateg").pipe(map((result:any)=>{
      return result;
    }));
  }

  addBlogPost(data){
    return this.http.post<any>(this.baseurl + "api/addBlogPost",data).pipe(map((result:any)=>{
      return result;
    }));
  }
  uploadFile(data){
    return this.http.post<any>(this.baseurl + "api/uploadFile",data,{reportProgress: true,
      observe: 'events'}).pipe(map((event:any)=>{
        switch(event.type){
          case HttpEventType.UploadProgress: const progress = Math.round(100 * event.loaded / event.total);
          return { status: 'progress', message: progress };
          case HttpEventType.Response:
          return event.body;
        default:
          return `Unhandled event: ${event.type}`;
        }
 
    }));
  }

  getAllBlogPost(limit){
    
    return this.http.get<any>(this.baseurl + "api/getAllBlog/" +limit ).pipe(map((result:any)=>{
      return result;
    }));
  }
  getSinglePost(data){
    return this.http.get<any>(this.baseurl + "api/getSingleBlog/"+data ).pipe(map((result:any)=>{
      return result;
    }));
  }
  getPostById(data){
    return this.http.get<any>(this.baseurl + "api/getBlogPostById/"+data).pipe(map((result:any)=>{
      return result;
    }));
  }
  getBlogByCategory(data,limit){
    return this.http.post<any>(this.baseurl + "api/getBlogByCateagory",{data,limit}).pipe(map((result:any)=>{
      return result;
    }));
  }
  editBlogPost(data){
    return this.http.post<any>(this.baseurl + "api/editBlogPost",data).pipe(map((result:any)=>{
      return result;
    }));
  }
  addComment(data){
    return this.http.post<any>(this.baseurl + "api/addcomment",data).pipe(map((result:any)=>{
      return result;
    }));
  }
  searchByCategory(data){
    return this.http.post<any>(this.baseurl+"api/searchCategory",data).pipe(map((result:any)=>{
      return result;
    }))
  }
  searchblogByCategory(data){
    return this.http.post<any>(this.baseurl+"api/searchblogByCategory",data).pipe(map((result:any)=>{
      return result;
    }))
  }
  addReplay(data){
    return this.http.post<any>(this.baseurl + "api/addreplay",data).pipe(map((result:any)=>{
      return result;
    }));
  }
  
  removeCategory(id){
    return this.http.delete<any>(this.baseurl + "api/remove-category/"+id)
    .pipe(map((result:any)=>{
      return result;
    }))
  }

  editCategory(data){
    return this.http.put<any>(this.baseurl + "api/edit-category",data)
    .pipe(map((result:any)=>{
      return result;
    }))
  }
  deleteBlog(id){
    return this.http.delete<any>(this.baseurl + "api/remove-blog/" + id)
    .pipe(map((result:any)=>{
      return result;
    }))
  }
  


}
