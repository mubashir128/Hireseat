
import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {} from '../../recruiter/recruiter-home/recruiter-home.component'
import { AuthenticationService } from '../../_services/authentication.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../../_services/user.service';
import { SuperAdminService } from '../../_services/super-admin.service';
import {ForumService} from '../../_services/forum.service';
import { AdminService } from 'src/app/_services/admin.service';

declare var jQuery: any;

//'../../recruiter/recruiter-home//recruiter-home.component.css'
@Component({
  selector: 'app-blog-main',
  templateUrl: './blog-main.component.html',
  styleUrls: ['./blog-main.component.css','../../recruiter/recruiter-home//recruiter-home.component.css']
})
export class BlogMainComponent implements OnInit {
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
