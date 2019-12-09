
import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  constructor(private route: ActivatedRoute,private userService:UserService) { }

  ngOnInit() {
    this.route.params.subscribe(params => { this.handleRequest(params['key']); });
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

}
