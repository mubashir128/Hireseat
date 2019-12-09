
import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../_services/authentication.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../../_services/user.service';
import { SuperAdminService } from '../../_services/super-admin.service';
import {ForumService} from '../../_services/forum.service';
declare var jQuery: any;
@Component({
  selector: 'app-employer-home',
  templateUrl: './employer-home.component.html',
  styleUrls: ['./employer-home.component.css']
})
export class EmployerHomeComponent implements OnInit {
  public chkLoggedInUser: any;
  public UserData: any;

  public show:boolean = false;
  public buttonName:any = 'Show';
  questData:any;
  questDataLenght:any=[];
  constructor(
    private _AuthService: AuthenticationService, 
    private router: Router, 
    private spinner:NgxSpinnerService, 
    private userService: UserService,
    public supperAdmin: SuperAdminService,
    private _forum:ForumService
    ) {
    this.chkLoggedInUser = this.userService.getUserData();
    if (this.chkLoggedInUser != "no") {
      if (this.chkLoggedInUser.userRole == "employer") {
        if (this.router.url == "/employer") {
          this.router.navigate(['employer/bidding-event-list']);
        }
      } else if (this.chkLoggedInUser.userRole == "recruiter") {
          this.router.navigate(['recruiter/bidding-event-list']);
      }
    }
  }

  ngOnInit() {

    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 500);

    jQuery('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: false, // Does not change width of dropdown to that of the activator
      hover: false, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: false, // Displays dropdown below the button
      alignment: 'left', // Displays dropdown with edge aligned to the left of button
      stopPropagation: false // Stops event propagation
    });

    this.UserData = this.userService.getUserData();
    this._forum.getUnAnsweredData().subscribe(
      res=>{ this.questDataLenght=res;
        
      },
      err=>console.log(err));
  }
  logout() {
    jQuery("body").css({ 'overflow': '', 'width': '' });
    jQuery('#sidenav-overlay').css('opacity', '0');
    this._AuthService.logout();
  }
  navigate(path) {
    jQuery('.button-collapse').sideNav('hide');
    jQuery("body").css({ 'overflow': '', 'width': '' });
    jQuery('#sidenav-overlay').css('opacity', '0');
    this.router.navigate([path]);
  }
  toggle() {
    this.show = !this.show;

    // CHANGE THE NAME OF THE BUTTON.
    if(this.show)  
      this.buttonName = "Hide";
    else
      this.buttonName = "Show";
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
