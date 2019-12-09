
import { Component, OnInit,Input } from '@angular/core';
import { SuperAdminService } from '../../_services/super-admin.service';
import { AuthenticationService } from '../../_services/authentication.service';
import { UserService } from '../../_services/user.service';
import {  Router } from '@angular/router'
declare var Materialize:any;
@Component({
  selector: 'app-sa-user-list',
  templateUrl: './sa-user-list.component.html',
  styleUrls: ['./sa-user-list.component.css']
})
export class SAUserListComponent implements OnInit {
  userList:any[];
  constructor(
    private superAdmin:SuperAdminService,
    private userAuth:AuthenticationService,
    private userService:UserService,
    private router:Router
  ) { }

  ngOnInit() {
    this.getAllUsers();
  }
 
  getAllUsers(){
    this.superAdmin.getAllUsers().subscribe((response)=>{
      if(response){
        this.userList = response;
      }
    },(error)=>{
      console.log(error);
    })
  }
  loginUser(userEmail){
    localStorage.setItem('super-admin-email',this.userService.getUserData().email);
    this.userAuth.logoutWithoutNavigate();
     /* localStorage.removeItem('super-admin-email'); */
    this.superAdmin.unSecureLogin({email:userEmail}).subscribe((response)=>{
     if(response){
      if(response.userInfo.userRole  == 'employer'){
        this.router.navigate(['employer/bidding-event-list']);
      }else if(response.userInfo.userRole =='recruiter'){
        this.router.navigate(['recruiter/bidding-event-list']);
      }else if(response.userInfo.userRole =='admin'){
        this.router.navigate(['user-list']);
      }
      else if(response.userInfo.userRole =='super-admin'){
          this.router.navigate(['super-admin/user-list']);
      }
    }else{
      Materialize.toast('Enter valid details',1000,'rounded'); 
    }
    },(error)=>{
      console.log(error)
    })
    
  }

}
