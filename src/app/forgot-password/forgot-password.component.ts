
import { Component, OnInit,Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { error } from 'protractor';
declare var Materialize:any;
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})

export class ForgotPasswordComponent implements OnInit {
  public forgotPassfrm: FormGroup;
  public isLinkSend:boolean=false;
  constructor(private formBuilder: FormBuilder,private userService:UserService) { }

  ngOnInit() {
    this.forgotPassfrm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required,Validators.email])]
    });
  }

  get f() { return this.forgotPassfrm.controls; }

  onSubmit(){
    if(this.forgotPassfrm.valid){
      this.userService.forgotPassword(this.forgotPassfrm.value.email.toLowerCase()).subscribe((data:any)=>{
        if(data.result == "email id not present"){
          Materialize.toast('Email id is not Register',1000,'rounded');
        }else if(data.result == "present"){
          this.isLinkSend=true;
        }
      },(error)=>{
        console.log(error);
      });
    }
  }
}
