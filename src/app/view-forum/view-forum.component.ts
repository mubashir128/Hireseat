import { Component, OnInit ,Output,EventEmitter,Input,ViewEncapsulation} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormBuilder,FormGroup,Validators,FormArray,FormControl} from '@angular/forms';
import {ForumService} from '../_services/forum.service';
import { stringify } from '@angular/compiler/src/util';
declare var jQuery: any;
import { UserService } from '../_services/user.service';
import { AuthenticationService } from '../_services/authentication.service';
import { SuperAdminService } from '../_services/super-admin.service';
import { InteractCompService } from '../_services/interact-comp.service';




@Component({
  selector: 'app-view-forum',
  templateUrl: './view-forum.component.html',
  styleUrls: ['./view-forum.component.css'],
  
})
export class ViewForumComponent implements OnInit {
  @Input()questData:any;  
  public searchText : string;

  loggedInUser:any;
  isLoggedIn:boolean=false;
  isEmployer:boolean=false;
  isRecruiter:boolean=false;
  isAdmin:boolean=false;
  isSuperAdmin:boolean=false;

  getAnswerData=[];
  currUserData:any;
  postAnswer:FormGroup ;
  searchQues:FormGroup;
  curerntUserId:String;
  curerntUserName:String;
  postAnswerData:any  ;
  msgForPopup:String;
  submitted=false;
  askusersData:any;
  data=[this.questData,this.postAns]
  answerClick:boolean=false;

  show = false;

  constructor(private _forum:ForumService,private formBuilder: FormBuilder,private userService:UserService,
    private router:Router,
    private authService:AuthenticationService,
    public supperAdmin: SuperAdminService,
    private _interactComp : InteractCompService) 
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

      this._interactComp.interact$.subscribe(res=>{
        this.loadDataForQuestions(res);
      });

     }

  ngOnInit() {
    let askusersDa=this.userService.getaskQuesUserId();
    this.askusersData=JSON.parse(askusersDa);
    
    
    
    jQuery('.modal').modal();

    //get all questions
    this.getAllQuestions();

     //get questions with answers
    this.getQuestionsAndAnswers();

        this.postAnswer=this.formBuilder.group({
              answerPost: this.formBuilder.control('', [Validators.required])
            })
            this.searchQues=this.formBuilder.group({
              question: this.formBuilder.control('', [Validators.required])
            })
                
      
      this.currUserData=this._forum.getUserId();
      let CurreUser=JSON.parse(this.currUserData)
      this.curerntUserId=CurreUser.userInfo._id
      this.curerntUserName=CurreUser.userInfo.fullName;

     
  }

  getAllQuestions(){
    this._forum.getQuestions().subscribe(res=>{
        this.questData=res;
      },err=>{
        console.log(err);
      }
    );
  }

  getQuestionsAndAnswers(){
    this._forum.getAnswerData().subscribe(res=>{
        this.getAnswerData=res;
      },err=>{
        console.log(err);
      }
    );
  }

  loadDataForQuestions(obj){
    this.getAllQuestions();
  }

  answerPopup(){
    jQuery('#answermsdPop').modal('open');
    
  }
  closeanswerPopup(){
    jQuery('#answermsdPop').modal('close');
  }
  showAnsDiv(id){
    let answerDiv=jQuery(".questionDivTextReply#"+id);
    if(answerDiv.css("display") === 'none'){
      answerDiv.css("display","block");
      return;
    }
    answerDiv.css("display","none");
  }

  textChanges(data){
    if(data.question != ""){
      return;
    }
    this.searchQuesData(data);

  }
  searchQuesData(data){
    this._forum.searchQuestionData(data).subscribe(
    res=>{this.questData=res.data;},
    err=>{console.log(err)}
  );
  }
  callback(time){
    // console.log(time)
    var str = time; 
  var res = str.slice(0,19);
  var ress=res.replace('T',' ');

  var today = new Date();
var date1 = today.getUTCFullYear()+'-'+(today.getUTCMonth()+1)+'-'+today.getUTCDate();
var time1= today.getUTCHours() + ":" + today.getUTCMinutes() + ":" + today.getUTCSeconds();
var dateTime = date1+' '+time1;

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
  // return diffDays + " days, " + diffHrs + " hours, " + diffMins + " minutes";
     
  }
  
  //add answer to question by 
  postAns(ans,id,answercount){
    
    let answerD={ans:ans.answerPost,quesUserId:id,answerBy:this.curerntUserId,answerByName:this.curerntUserName,answercount:answercount}
    
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

   handleAnswerPost($event){
     let postBtn=jQuery(jQuery($event.target)).parent().find("button[id='postAnswerBtn']");
    if($event.target.value === ''){
      postBtn.prop("disabled",true);
      return;
    }
    postBtn.prop("disabled",false);
   }

}
