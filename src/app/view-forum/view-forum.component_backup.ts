import { Component, OnInit ,Output,EventEmitter,Input} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormBuilder,FormGroup,Validators,FormArray,FormControl} from '@angular/forms';
import {ForumService} from '../_services/forum.service';
import { stringify } from '@angular/compiler/src/util';
declare var jQuery: any;
import { UserService } from '../_services/user.service';
import { AuthenticationService } from '../_services/authentication.service';
import { SuperAdminService } from '../_services/super-admin.service';




@Component({
  selector: 'app-view-forum',
  templateUrl: './view-forum.component.html',
  styleUrls: ['./view-forum.component.css']
})
export class ViewForumComponent implements OnInit {
  @Input()questData=[] ;  
  public searchText : string;

  loggedInUser:any;
  isLoggedIn:boolean=false;
  isEmployer:boolean=false;
  isRecruiter:boolean=false;
  isAdmin:boolean=false;
  isSuperAdmin:boolean=false;

  getAnswerData=[];
  currUserData:any;
  postAnswer=[] ;
  curerntUserId:String;
  curerntUserName:String;
  postAnswerData:any  ;
  msgForPopup:String;
  submitted=false;
  askusersData:any;
  data=[this.questData,this.postAns]
  answerClick:boolean=false;

  constructor(private _forum:ForumService,private formBuilder: FormBuilder,private userService:UserService,
    private router:Router,
    private authService:AuthenticationService,
    public supperAdmin: SuperAdminService) 
    {
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

  ngOnInit() {
    let askusersDa=this.userService.getaskQuesUserId();
    this.askusersData=JSON.parse(askusersDa);
    


    jQuery('.modal').modal();
    //get all questions
    this._forum.getQuestions().subscribe(
      res=>{ this.questData=res;
        
         this.questData.forEach((x) => {
          this.postAnswer.push(this.formBuilder.group({
            answerPost: this.formBuilder.control('', [Validators.required])
          }))
        })
      },
      err=>console.log(err));
     //get questions with answers
      this._forum.getAnswerData({}).subscribe(
        res=>{ this.getAnswerData=res;},
        err=>console.log(err));
      
      this.currUserData=this._forum.getUserId();
      let CurreUser=JSON.parse(this.currUserData)
      this.curerntUserId=CurreUser.userInfo._id
      this.curerntUserName=CurreUser.userInfo.fullName;

     
  }
  answerPopup(){
    jQuery('#answermsdPop').modal('open');
    
  }
  closeanswerPopup(){
    jQuery('#answermsdPop').modal('close');
  }
  showAnsDiv(){
    if(this.answerClick==false){
  this.answerClick=true;
    }else{
      this.answerClick=false;
    }
  }
  //add answer to question by 
  postAns(ans,id){
    
    let answerD={ans:ans.answerPost,quesUserId:id,answerBy:this.curerntUserId,answerByName:this.curerntUserName}
    
    this._forum.addAnserData(answerD).subscribe(
      res=>{
       
        this.msgForPopup=res.message;
        this.answerPopup();
    //     setTimeout(()=>{ 
    //       window.location.reload();
    //  }, 2000);
    

      },
      err=>{console.log(err)}
    );
   }
}
