import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractCompService {

  interact=new Subject<any>();
  interact$=this.interact.asObservable();

  constructor() { }

  loadData(obj){
    this.interact.next(obj);
  }

}
