
import { Component, OnInit,Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';

import {UserService } from '../_services/user.service';
declare var Materialize:any;
declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  public signin:any;
  public abc:any;
  public userInfo:any = [];
  public UserRoleSet:boolean;
  public chkLoggedInUser:any;
  acceptedTermsCond;
  public localRole:any;
  public suBtnActive:boolean=true;
  public imagePath;
  userroledata:any;
  filepath:any;
  imgURL: any;
  public message: string;
  value: string | number | string[];

  constructor(private http:HttpClient,private userService: UserService,private router: Router) {
            this.signin = new FormGroup({
              fullname:new FormControl(),
              phoneNo:new FormControl(),
              email:new FormControl(),
              password:new FormControl(),
              webSiteLink:new FormControl(),
              companyName:new FormControl(),
              file:new FormControl(),
                                          
             });

          this.localRole=localStorage.getItem("Role");
            if( this.localRole == 'employer'){
              this.UserRoleSet=true;
            }else if(this.localRole == 'recruiter'){
              this.UserRoleSet=true;
            }else{
              this.UserRoleSet=false;
            }

            this.chkLoggedInUser=this.userService.getUserData();
            if(this.chkLoggedInUser != "no"){
               if(this.chkLoggedInUser.userRole=="employer"){
                 this.router.navigate(['employer']);
               }
               if(this.chkLoggedInUser.userRole=="recruiter"){
                this.router.navigate(['recruiter']);
              }
            } 
    }

  ngOnInit() { 
    jQuery('.modal').modal();
    jQuery('select').material_select();
    // this.formSubmit()
  }
 
  formSubmit(){

   this.value = $('#acceptTerms').is(":checked");
// console.log(this.value);
    this.suBtnActive=true;
    //this.signin.value['file']=this.imagePath[0];
    var res = this.signin.value;
    //console.log(res);
   
    this.signin = new FormGroup({
      fullname : new FormControl(res.fullname,[Validators.required]),
      phoneNo : new FormControl(res.phoneNo,Validators.required),
      email : new FormControl(res.email,[Validators.required,Validators.email] ),
      companyName : new FormControl(res.companyName,[Validators.required] ),
      webSiteLink : new FormControl(res.webSiteLink,[Validators.required] ),   
      password : new FormControl(res.password,[Validators.required,Validators.minLength(5)]),
      file:new FormControl(res.file,[Validators.required]),
  
                                
  });   
  const fd=new FormData();
  // fd.userRole=this.localRole;   
  // fd.role=this.localRole == "employer" ? 2 : 3;
     this.userroledata=this.localRole == "employer" ? 2 : 3
  fd.append('userRole',this.localRole);
  fd.append('role',this.userroledata);
         fd.append('file',this.imagePath[0],this.imagePath[0].name);
         fd.append('fullname',this.signin.controls.fullname.value);
         fd.append('phoneNo',this.signin.controls.phoneNo.value);

         
          fd.append('email',this.signin.controls.email.value);

          fd.append('companyName',this.signin.controls.companyName.value);
          fd.append('webSiteLink',this.signin.controls.webSiteLink.value);
          fd.append('password',this.signin.controls.password.value);

          



    if(this.signin.valid){ 
       if(this.acceptedTermsCond){
          this.userService.register(fd).subscribe((data)=>{        
            if(data.statustxt == "success"){
              localStorage.removeItem('Role');
              //Materialize.toast('Registered Successfully Please check the e-mail !',5000);
              this.suBtnActive=true;
              //this.router.navigate(['login']);   
              jQuery('#registerMsg').modal('open');
                       
            }
          },
          error=>{
            console.log(error);
            if(error=="Conflict"){
              Materialize.toast('Email Id / Phone Number Already Registered !',1000)
            } 
            this.suBtnActive=true;
          });
       }else{
        this.suBtnActive=true;
        Materialize.toast('Please accept the terms and conditions',5000);
       }
    }
    else{
      this.suBtnActive=true;
    }  
  }
  
  showTermsAndCond(){
    jQuery('#TermsAndCond').modal('open');
  }
  
  goHome(){
    this.router.navigate(['login'])
  }
  preview(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
    this.filepath=<File>files[0];

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
    // console.log(this.imagePath[0]['File'])
    // console.log(this.filepath)
    

  }


}
