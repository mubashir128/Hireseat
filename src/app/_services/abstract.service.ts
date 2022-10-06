import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpClient, HttpParams, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AbstractService {

  constructor() { }

  requestProgress(http: HttpClient, req: any) {
    return new Observable<any>(sub => {
      http.request(req).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          let loaded = event.loaded;
          if (event.loaded === event.total) {
            sub.next({ percent: 100, completeStatus: false });
          } else {
            let percent = Math.round((100 * loaded) / event.total);
            sub.next({ percent: percent, completeStatus: false });
          }
        } else if (event instanceof HttpResponse) {
          sub.next({ percent: 100, body: event.body, completeStatus: true });
          sub.complete();
        }
      });
    });
  }

  toFormData(formData: any, item) {
    for (var key in item) {
      if (Array.isArray(item[key]))
        formData.append(key, item[key].join(","));
      else {
        switch (typeof item[key]) {
          case "boolean":
          case "number":
            formData.append(key, JSON.stringify(item[key]));
            break;
          default:
            if (item[key] == "{}")
              formData.append(key, null);
            else
              formData.append(key, item[key]);
        }
      }
    }
  }

  handleError(error: any) {
    return throwError(error);
  }
}
