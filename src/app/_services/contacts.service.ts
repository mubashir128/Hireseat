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
    this.permissionStatus = await Contacts.getPermissions();
  }

  async getContacts(){
    Contacts.getContacts().then(result => {
      console.log(result);
      for(const contact of result.contacts) {
        Materialize.toast("contact : "+contact, 2000);
      }
  });
  }

}