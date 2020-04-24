import { Component, OnInit,Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormBuilder,FormGroup,Validators,FormArray,FormControl} from '@angular/forms';
import {ForumService} from '../../_services/forum.service';
import { stringify } from '@angular/compiler/src/util';
import { UserService } from '../../_services/user.service';
import {} from '../view-forum.component';
declare var jQuery: any;


@Component({
  selector: 'app-answerlists',
  templateUrl: './answerlists.component.html',
  styleUrls: ['./answerlists.component.css','.././view-forum.component.css']
})
export class AnswerlistsComponent implements OnInit {
  questData=[] ;  
  id:any;
  questionData:any;
  answerData=[];
  
  postAnsw:FormGroup;
  currUserData:any;
  curerntUserId:string;
  msgForPopup:string;
  loggedInUser:any;
  isLoggedIn:boolean=false;
  isEmployer:boolean=false;
  isRecruiter:boolean=false;
  isAdmin:boolean=false;
  isSuperAdmin:boolean=false;



  answerClick:boolean=false;
  constructor(private _forum:ForumService,private formBuilder: FormBuilder,private userService:UserService,
    private router:Router,private route:ActivatedRoute) { 
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    }
 
  ngOnInit() {
    //console.log(this.questData)
    
    this.route.params.subscribe(params=>{this.id=params});
    jQuery('.modal').modal();
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

    this._forum.getQuestions().subscribe(res=>{
      this.questData=res;
    },err => {
      console.log(err);
    });

    //get question
    this._forum.getQuestionById(this.id.id).subscribe(res=>{
      this.questionData=res.data; 
    },err=>{
      console.log(err);
    });

    //get all answers of particular question
    this._forum.getMulipleAnsByQuesId(this.id.id).subscribe(res=>{
      this.answerData=res.data;
    },err=>{
      console.log(err);
    });

    this.postAnsw = this.formBuilder.group({
      ans:['', [Validators.required]]
    });  

    this.currUserData=this._forum.getUserId();
    let CurreUser=JSON.parse(this.currUserData)
    this.curerntUserId=CurreUser.userInfo._id

  }

  showAnsDiv(){
    if(this.answerClick==false){
      this.answerClick=true;
    }else{
      this.answerClick=false;
    }
  }
  
  callback(time){
   
  let str = time; 
  let res = str.slice(0,19);
  let ress=res.replace('T',' ');

  let today = new Date();
  let date1 = today.getUTCFullYear()+'-'+(today.getUTCMonth()+1)+'-'+today.getUTCDate();
  let time1= today.getUTCHours() + ":" + today.getUTCMinutes() + ":" + today.getUTCSeconds();
  let dateTime = date1+' '+time1;

  let endDate:any = new Date(ress);
  let purchaseDate:any = new Date(dateTime);
  let diffMs = (purchaseDate - endDate); // milliseconds
  let diffDays = Math.floor(diffMs / 86400000); // days
  let diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
  let diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
  if(diffDays > 0 && diffHrs < 24 && diffMins < 60   ){ //10 160 24
    return diffDays + " days";
  }else if(diffDays < 1 && diffHrs > 0   ){
    return diffHrs + " hours ";
  }else if(diffDays < 1 && diffHrs < 24 && diffMins < 60 ){
    return diffMins + " minutes "
  }
     
  }
  
  answerPopup(){
    jQuery('#answermsdPop').modal('open');
    
  }
  closeanswerPopup(){
    jQuery('#answermsdPop').modal('close');
  }
  postAns(){
     
    this.postAnsw.value['quesUserId']= this.questionData._id;
    this.postAnsw.value['answerBy']=  this.curerntUserId
   
    let answerD=this.postAnsw.value;
    if( this.curerntUserId){
      this._forum.addAnserData(answerD).subscribe(
        res=>{
         
           this.msgForPopup=res.message;
           this.answerPopup();
          setTimeout(()=>{ 
            window.location.reload();
       }, 2000);
      },
        err=>{console.log(err)}
      );
    }
    else{
      console.log('your a re not logged in');
    }
    
    
  }

}
