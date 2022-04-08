import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriberslistService {
  
  activeDashboard = new Subject();
  activeDashboard$ = this.activeDashboard.asObservable();

  activebidEvent = new Subject();
  activebidEvent$ = this.activebidEvent.asObservable();

  recruiterPoints = new Subject();
  recruiterPoints$ = this.recruiterPoints.asObservable();

  recruiterPointsForDoughnutChart = new Subject();
  recruiterPointsForDoughnutChart$ = this.recruiterPointsForDoughnutChart.asObservable();

  activeCandidateNavBar = new Subject();
  activeCandidateNavBar$ = this.activeCandidateNavBar.asObservable();

  loaderList = new Subject();
  loaderList$ = this.loaderList.asObservable();

  loaderListAfterSearch = new Subject();
  loaderListAfterSearch$ = this.loaderListAfterSearch.asObservable();

  mobileMenuTabSub = new Subject();
  mobileMenuTabSub$ = this.mobileMenuTabSub.asObservable();

  constructor() { }
}
