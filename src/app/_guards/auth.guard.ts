import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      if(localStorage.getItem('currentUser')){
        var userRole = JSON.parse(localStorage.getItem('currentUser')).userInfo.userRole;
        if(userRole == 'employer'){
          return true;
        }else if(userRole=='recruiter'){
          return true;
        }else if(userRole=='admin'){
          this.router.navigate(['/user-list'])
          return false;
        }
        else if(userRole=='super-admin'){
          this.router.navigate(['/super-admin/user-list']);
          return false;
        }
      }
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});     
       return true;
  }

}
