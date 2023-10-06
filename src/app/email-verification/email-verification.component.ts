
import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../_services/user.service';
@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {
  public isExpired:boolean=false;
  public isSuccess:boolean=false;
  public isErr:boolean=false;

  key2: any;
  key3: any;

  constructor(
    private route: ActivatedRoute,private userService:UserService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.handleRequest(params['key']);
      this.key2 = params['key2'];
      this.key3 = params['key3'];
    });
  }

  handleRequest(key){
    this.userService.emailVerification({key:key}).subscribe((data)=>{      
      if(data.res == 'not found'){
        this.isExpired=true;
      }else if(data.res== 'success'){
        this.isSuccess=true;
      }else{
        this.isErr=true;
      }
    },(error)=>{
      console.log(error);      
    })
  }

  signIn(){
    this.userService.getDetailsWithKeys( { key2 : this.key2, key3 : this.key3 }).subscribe((data)=>{
      this._router.navigate(["/login"],{queryParams : {email : data.dKey2, pass : data.dKey3, direct : true}});
    });
  }

}
