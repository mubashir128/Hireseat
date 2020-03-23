import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecruiterGuard implements CanActivate {
  videoUrl: any;
  constructor(
    private router: Router
  ) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.videoUrl = val.url;
      }
    });
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('currentUser')) {
      var userRole = JSON.parse(localStorage.getItem('currentUser')).userInfo.userRole;
      if (userRole == 'employer') {
        this.router.navigate(['employer/bidding-event-list']);
        return false;
      } else if (userRole == 'recruiter') {
        return true;
      } else if (userRole == 'admin') {
        this.router.navigate(['/user-list']);
        return false;
      }
      else if (userRole == 'super-admin') {
        this.router.navigate(['/super-admin/user-list']);
        return false;
      } else if (this.videoUrl === '/recruiter/video-interview-room/video-call') {
        return true;
      }
    }
    this.router.navigate(['/login']);
    return true;
  }
}
