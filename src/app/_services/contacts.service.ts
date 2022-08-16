import { Injectable } from '@angular/core';
import { Contacts } from '@capacitor-community/contacts'
declare var Materialize: any;

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  permissionStatus: any;
  constructor() {
  }
  
  async getPermission(){
    console.log("getPermission : ");
    Materialize.toast("getPermission : ",1000);
    this.permissionStatus = await Contacts.getPermissions();
    console.log("this.permissionStatus : ",this.permissionStatus);
    Materialize.toast("status : "+this.permissionStatus, 2000);
  }

  async getContacts(){
    console.log("getContacts : ");
    Materialize.toast("getContacts : ",1000);
    Contacts.getContacts().then(result => {
      console.log(result);
      for(const contact of result.contacts) {
        console.log("contact : ",contact);
        Materialize.toast("contact : "+contact, 2000);
      }
  });
  }

}