import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class EnterpriseGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem("currentUser")) {
      var userRole = JSON.parse(localStorage.getItem("currentUser")).userInfo
        .userRole;
      if (userRole == "employer") {
        this.router.navigate(["employer/bidding-event-list"]);
        return false;
      } else if (userRole == "recruiter") {
        this.router.navigate(["recruiter/share-candidate-profile"]);
        return false;
      } else if (userRole == "admin") {
        this.router.navigate(["user-list"]);
        return false;
      } else if (userRole == "enterprise" || userRole == "super-admin") {
        return true;
      }
    }
    this.router.navigate(["/login"]);
    return true;
  }
}
