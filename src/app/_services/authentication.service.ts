import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import * as myGlobals from '../globalPath';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public baseurl: any;
  url: string;
  currentUrl: string;
  constructor(private http: HttpClient,private router: Router,private route:ActivatedRoute) { 
    this.baseurl = myGlobals.baseUrl;
    
  }  

  login(info:any) {
    return this.http.post<any>(this.baseurl+'api/login',info)
        .pipe(map((res:any) => {   
            // login successful if there's a jwt token in the response         
            if (res.result && res.result.auth) {
                // store username and jwt token in local storage to keep user logged in between page refreshes           
                localStorage.setItem('currentUser', JSON.stringify({ userInfo:res.result.userInfo, token: res.result.auth }));
                return "success";
            }else if(res.result == "Wrong Password"){
              return "wrongpass";
              // if(res.error == "Wrong Password"){
              //   return "worngpass";
              // }else{
              //   return "fail";
              // }
        
            }else if(res.result == "email not found"){
              return "emailnotfound"
            }
            else{
                return "fail";
               
            }
        }));
}

logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.clear();
    this.router.navigate(['/home']);
    this.router.events.subscribe((res) => { 
      // console.log(res);
      if (res instanceof NavigationEnd ) {
        this.url = res.url;
        // console.log(this.url);

      }
  })
   
  }
  logoutWithoutNavigate(){
    localStorage.removeItem('currentUser');
    /* localStorage.clear(); */
  }
}
