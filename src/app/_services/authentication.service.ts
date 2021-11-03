import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import * as myGlobals from '../globalPath';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public baseurl: any;
  url: string;
  currentUrl: string;
  loggedInUser;

  constructor(private http: HttpClient,private router: Router,private route:ActivatedRoute, 
    private userService: UserService
  ) {
    this.baseurl = myGlobals.baseUrl;
    this.loggedInUser = this.userService.getUser();
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

  async handleLoginSessionLog(){
    this.loggedInUser = this.userService.getUser();
    let info = {
      token : this.loggedInUser.token
    };
    this.manageLoginSessionLogs(info).subscribe((data) => {
    });
  }

  async handleLogoutSessionLog(userId, token){
    let info = {
      token : token,
      userId : userId
    };
    this.manageLogoutSessionLogs(info).subscribe((data) => {
    });
  }

  manageLoginSessionLogs(info){
    return this.http.post<any>(this.baseurl+'api/manageLoginSessionLogs',info).pipe(map((res:any) => {
      return res;
    }));
  }

  manageLogoutSessionLogs(info){
    return this.http.post<any>(this.baseurl+'api/manageLogoutSessionLogs',info).pipe(map((res:any) => {
      return res;
    }));
  }

}
