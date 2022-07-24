import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpClient, HttpParams, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AbstractService {

  constructor() { }

  requestProgress(http: HttpClient, req: any){
    return new Observable<Number>(
       sub => {
         http.request(req).subscribe(event => {
           if (event.type === HttpEventType.UploadProgress) {
             let loaded = event.loaded;
             if (event.loaded === event.total) {
               sub.next(100);
             } else {
               sub.next(Math.round((100 * loaded) / event.total));
             }
           } else if (event instanceof HttpResponse) {
             sub.complete();
           }
         });
       }
     );
   }
   
   handleError(error: any) { 
     return throwError(error);
   }
}
