import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriberslistService {
  
  activeDashboard = new Subject();
  activeDashboard$ = this.activeDashboard.asObservable();

  constructor() { }
}
