
import { Component, OnInit,Input } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { SuperAdminService } from '../_services/super-admin.service';
import {ForumService} from '../_services/forum.service';
import { BiddingEventService } from 'src/app/_services/bidding-event.service';
import { WebsocketService } from '../websocket.service';
import { Subject } from 'rxjs';

declare var jQuery: any;
declare var $: any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  path:any = "assets/img/navbar-logo.png";
  loggedInUser:any;
  isLoggedIn:boolean=false;
  isEmployer:boolean=false;
  isRecruiter:boolean=false;
  isAdmin:boolean=false;
  isSuperAdmin:boolean=false;
  
status: boolean = false;
  public show:boolean = false;
  public buttonName:any = 'Show';
  url: any;
  questDataLenght: any;
  suggestedQueData: any;
  suggestedQueCount:number=0;
  suggestedQueAnsCount:number = 0;

  notificationObserver =new Subject();
  notificationObserver$=this.notificationObserver.asObservable();

  constructor(
    private userService:UserService,
    private router:Router,
    private authService:AuthenticationService,
    public supperAdmin: SuperAdminService,
    private route:ActivatedRoute,
    private _forum:ForumService,
    private bidEventService :BiddingEventService,
    private _socket : WebsocketService
    ) {
   this.loggedInUser=this.userService.getUserData();
    if(this.loggedInUser != "no"){
      this.isLoggedIn=true;
      if(this.loggedInUser.userRole =="employer"){
        this.isEmployer=true;
      }else if(this.loggedInUser.userRole =="recruiter"){
        this.isRecruiter=true;
      }else if(this.loggedInUser.userRole =="admin"){
        this.isAdmin=true;
      }else if(this.loggedInUser.userRole =="super-admin"){
        this.isSuperAdmin = true;
      }
    }
   }

  async ngOnInit() {
  
    let obj=JSON.parse(localStorage.getItem("currentUser"));
    if(obj !== null){
      await this.initSocket(obj.token);
    }

    this._socket.addListener({
      type : 1,
      callback : this.notificationObserver
    });

    this.notificationObserver$.subscribe((res : any)=>{
      this.handleData(res);
    });

    this._forum.getUnAnsweredData().subscribe(
      res=>{ this.questDataLenght=res;
        
      },
      err=>console.log(err));

   if(this.loggedInUser.userRole == "employer"){
   this._forum.getAllUnAnsQuestionsByEmployerId(this.loggedInUser._id).subscribe(data=>{
      this.suggestedQueData = data;
      this.suggestedQueData.forEach(element => {
        
        if(element.QueAnsStaus == 1){
          this.suggestedQueCount++
        }
      });
      })
   }else if(this.loggedInUser.userRole == "recruiter"){
      this._forum.getAllUnreadAnsQueByRecruiteId(this.loggedInUser._id).subscribe(data=>{
        this.suggestedQueData = data;
        this.suggestedQueData.forEach(element => {
          
          if(element.QueAnsStaus == 2){
            this.suggestedQueAnsCount++
          }
        });
      })
   }
    
  
    jQuery(document).ready(function () {
      jQuery(".button-collapse").sideNav();
    });
  
  }

  async initSocket(token){
    await this._socket.getInstance(token);
  }

  handleData(res : any){
    switch(res.subType){
      case 11 :
        //add notification to list.
        this.questDataLenght.unshift(res.result);
        break;
      default : 
        break;
    }
  }

  updateQueAns(id){
    this._forum.updateQueAnsReadStatus(id).subscribe((data)=>{
    })
  }

  navigate(path){
    jQuery('.button-collapse').sideNav('hide');
    jQuery("body").css({ 'overflow' : '', 'width' : '' });
    jQuery('#sidenav-overlay').css('opacity', '0');
    this.router.navigate([path]);
  }

  logout(){
    this.authService.logout();
    this.isAdmin=false;
    this.isLoggedIn= false;
    this._socket.socketClosed();
  }
  
  toggle() {
    this.show = !this.show;

    // CHANGE THE NAME OF THE BUTTON.
    if(this.show)  
      this.buttonName = "Hide";
    else
      this.buttonName = "Show";
  }
  
}
