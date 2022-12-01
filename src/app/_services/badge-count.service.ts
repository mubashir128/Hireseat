import { Injectable } from '@angular/core';
import { Badge } from '@robingenz/capacitor-badge';

@Injectable({
  providedIn: 'root'
})
export class BadgeCountService {

  constructor() { }

  async getCount(){
    const result = await Badge.get();
    // Materialize.toast("--- get Badge count : "+result.count, 2000, "green");
    // console.log("result : ",result.count);
    return result.count;
  }

  async setCount(count: number){
    // Materialize.toast("--- set Badge count : "+count, 2000, "green");
    // console.log("count : ",count);
    await Badge.set({ count });
  }

  async increase(){
    // Materialize.toast("--- increase Badge count : "+this.getCount(), 2000, "green");
    await Badge.increase();
  };
  
  async decrease(){
    // Materialize.toast("--- decrease Badge count : "+this.getCount(), 2000, "green");
    await Badge.decrease();
  };
  
  async clear(){
    // Materialize.toast("--- clear Badge count : "+this.getCount(), 2000, "green");
    await Badge.clear();
  };
  
  async isSupported(){
    const result = await Badge.isSupported();
    // Materialize.toast("--- isSupported Badge count : "+result.isSupported, 2000, "green");
    // console.log("result : ",result);
    return result.isSupported;
  };
  
  async checkPermissions(){
    const result = await Badge.checkPermissions();
    // Materialize.toast("--- checkPermissions Badge count : "+result.display, 2000, "green");
    // console.log("result : ",result);
  };
  
  async requestPermissions(){
    const result = await Badge.requestPermissions();
    // Materialize.toast("--- requestPermissions Badge count : "+result.display, 2000, "green");
    // console.log("result : ",result);
  };
}
