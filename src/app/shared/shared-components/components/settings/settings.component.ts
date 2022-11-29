import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Tab2 } from 'src/app/recruiter/models/tab2';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { UserService } from 'src/app/_services/user.service';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';

export enum eMenuType {
  deleteAccountUrl = '/deleteAccount',
  deleteAccount = 'Delete Account',
  fas_fa_trash = "fas fa-trash"
}

export interface SubMenuType {
  url : eMenuType;
  text : eMenuType;
  status : boolean;
  icon : eMenuType;
}

const candidateMenuTypes : SubMenuType[] = [
  {url : eMenuType.deleteAccountUrl, text : eMenuType.deleteAccount, status : true, icon : eMenuType.fas_fa_trash}
];

const recruiterMenuTypes : SubMenuType[] = [
  {url : eMenuType.deleteAccountUrl, text : eMenuType.deleteAccount, status : true, icon : eMenuType.fas_fa_trash}
];

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  tabs2: Tab2[];

  loggedInUser: any;
  isLoggedIn: boolean = false;

  constructor(private _userService: UserService, 
    protected _dialog: MatDialog, 
    private userService: UserService, 
    private _authService: AuthenticationService
  ) {
    this.tabs2 = [];
    this.loggedInUser = this._userService.getUserData();
    if (this.loggedInUser != "no") {
      this.isLoggedIn = true;
      if(this.loggedInUser.userRole == "candidate") {
        this.candidateMenuTabs();
      }

      if(this.loggedInUser.userRole == "recruiter") {
        this.recruiterMenuTabs();
      }

    }else{
      this.noUserMenuTabs();
    }
  }

  ngOnInit(): void {
  }

  candidateMenuTabs(){
    candidateMenuTypes.forEach((menu)=>{
      this.tabs2.push(new Tab2(menu.url, menu.text, menu.status, menu.icon));
    });
  }

  recruiterMenuTabs(){
    recruiterMenuTypes.forEach((menu)=>{
      this.tabs2.push(new Tab2(menu.url, menu.text, menu.status, menu.icon));
    });
  }

  noUserMenuTabs(){
  }

  SelectItem2(item : eMenuType, text : eMenuType) {
    if(text === eMenuType.deleteAccount){
      this.deleteProfile();
    }
  }

  deleteProfile(){
    const dialogDeleteRef = this._dialog.open(DialogDeleteComponent,{
      data: {
        dialogType : "ConfirmDeleteAction",
        dialogTitle : "Confirm Delete Action",
        dialogText : "Are want to sure delete this accout permanently ?"
      }
    });

    dialogDeleteRef.afterClosed().subscribe(result => {
      if(result && result.process){
        this.confirmDelete();
      }
    });
    
  }

  confirmDelete(){
    this.userService.deleteUserPermanantly().subscribe(res=>{
      if(res){  
        this._authService.logout();
      }
    });
  }
}
