
import { Component, OnInit,Input } from '@angular/core';
import { UserService } from '../_services/user.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
declare var jQuery:any;
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  loggedInUser: any;
  isLoggedIn: boolean;
  isEmployer: boolean;
  isRecruiter: boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  Email: FormGroup;
 
  constructor( private userService:UserService,private formBuilder: FormBuilder,) { }
  
  ngOnInit() {
    jQuery('.modal').modal();
    jQuery('select').material_select();
    this.Email = this.formBuilder.group({
      email:['', [Validators.required, Validators.email]]
      
    });
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


formSubmit(){

    if(this.Email.invalid){
      return
    }
    this.userService.subscribeNewsLetter(this.Email.value).subscribe((res)=>{
      console.log(res);
      if(res.result == 'already in db'){
        alert('you are already subscribe');
      }else{
        jQuery('#registerMsg').modal('open');

      }
    })
    }
goHome(){
  
  jQuery('#registerMsg').modal('close');
    
 }    
}

