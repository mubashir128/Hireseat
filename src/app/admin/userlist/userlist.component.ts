
import { Component, OnInit,Input } from '@angular/core';
import { AdminService } from 'src/app/_services/admin.service';
import { UserService } from '../../_services/user.service';
import { SuperAdminService } from '../../_services/super-admin.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../_services/authentication.service';
@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css'],
  
})
export class UserlistComponent implements OnInit {
  UserList:any=[];
  p:any;
  UserData:any;
  constructor(
    private _AuthService: AuthenticationService, 
    private adminService:AdminService,
    private userService: UserService,
    public supperAdmin: SuperAdminService,
    private router:Router
    ) { }

  ngOnInit() {
    this.UserData = this.userService.getUserData();
    this.adminService.getAllUsers().subscribe((data)=>{
      if(data.length > 0 ){
        this.UserList=data;
      }    
    },(error)=>{
      console.log(error);
    })
  }
  logoutSA(){
    this.supperAdmin.unSecureLogin({email:localStorage.getItem('super-admin-email')}).subscribe((response)=>{
      if(response){
        localStorage.removeItem('super-admin-email');
        this.router.navigate(['super-admin/user-list']);
      }
    },(error)=>{
      this._AuthService.logout();
      console.log(error)
    })
  }
}
