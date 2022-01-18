import { Component, OnInit ,Output,EventEmitter,Input,ViewEncapsulation, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormBuilder,FormGroup,Validators,FormArray,FormControl} from '@angular/forms';
import {ForumService} from '../_services/forum.service';
import { stringify } from '@angular/compiler/src/util';
declare var jQuery: any;
import { UserService } from '../_services/user.service';
import { AuthenticationService } from '../_services/authentication.service';
import { SuperAdminService } from '../_services/super-admin.service';
import { InteractCompService } from '../_services/interact-comp.service';
import { WebsocketService } from '../_services/websocket.service';
import { Subject } from 'rxjs';
import { ConstantsService } from '../_services/constants.service';

@Component({
  selector: 'app-view-forum',
  templateUrl: './view-forum.component.html',
  styleUrls: ['./view-forum.component.css'],
  
})
export class ViewForumComponent implements OnInit, OnDestroy {
  questData=[];
  public searchText : string;

  p=1;
  createdAt
  itemsAre = [1];
  itemsAnswerAre = [1];
  itemsPerPage=10;
  itemsPerAnswerPage=10;
  loggedInUser:any;
  paginatorMove=true;
  isLoggedIn:boolean=false;
  isEmployer:boolean=false;
  isRecruiter:boolean=false;
  isAdmin:boolean=false;
  isSuperAdmin:boolean=false;

  getAnswerData=[];
  currUserData:any;
  postAnswer:FormGroup ;
  postAnsw : FormGroup;
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

  questionObserver = new Subject();
  questionObserver$ = this.questionObserver.asObservable();

  answerData = [];
  answerQueData = [];

  constructor(private _forum:ForumService,private formBuilder: FormBuilder,private userService:UserService,
    private router:Router,
    private authService:AuthenticationService,
    public supperAdmin: SuperAdminService,
    private _interactComp : InteractCompService,
    private _socket: WebsocketService,
    private _constants : ConstantsService
  ) 
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

    this.postAnswer=this.formBuilder.group({
      answerPost: this.formBuilder.control('', [Validators.required])
    })

    this.searchQues=this.formBuilder.group({
      question: this.formBuilder.control('', [Validators.required])
    })
          
    this.postAnsw=this.formBuilder.group({
      postAnsw1: this.formBuilder.control('', [Validators.required])
    })

    this._interactComp.interact$.subscribe(res=>{
      this.loadDataForQuestions(res);
    });

  }

  async ngOnInit() {

    await this._socket.removeListener({ type: this._constants.askQuestionType });
    this._socket.addListener({
      type: this._constants.askQuestionType,
      callback: this.questionObserver
    });

    this.questionObserver$.subscribe((res: any) => {
      this.handleQuestions(res);
    });

    this.loadDataFromStorage();
    
    jQuery('.modal').modal();

    //get limited questions
    this.getLimitedQuestions({
      onLoad : true,
      itemsPerPage : this.itemsPerPage
    });

     //get questions with answers
    let answerObj={
      onLoad : true,
      limit : this.itemsPerAnswerPage
    };
    this.getQuestionsAndAnswers(answerObj);
      
    this.currUserData=this._forum.getUserId();
    let CurreUser=JSON.parse(this.currUserData)
    if(CurreUser !== null){
      this.curerntUserId=CurreUser.userInfo._id
      this.curerntUserName=CurreUser.userInfo.fullName;
    }
  }

  handleQuestions(res: any) {
    switch (res.subType) {
      case this._constants.addQuestion:
        // add all notifications to list.
        this.questData.unshift(res.result);
        break;
      default:
        break;
    }
  }

  getLimitedQuestions(obj){
    this._forum.getLimitedQuestions(obj).subscribe(res=>{
      this.paginatorMove=true
      this.loadDataFromStorage();
        if(res.length !== 0){
          this.questData=[...this.questData, ...res];
          this.createdAt=res[res.length-1].createdAt;
        }
      },err=>{
        console.log(err);
      }
    );
  }

  getQuestionsAndAnswers(obj){
    this._forum.getAnswerData(obj).subscribe(res=>{
        if(res.length!==0){
          this.getAnswerData=[...this.getAnswerData, ...res];
        }
      },err=>{
        console.log(err);
      }
    );
  }

  loadDataFromStorage(){
    let askusersDa=this.userService.getaskQuesUserId();
    this.askusersData=JSON.parse(askusersDa);
  }

  loadDataForQuestions(obj){
    this.questData.unshift(obj);
  }

  answerPopup(){
    jQuery('#answermsdPop').modal('open');
    
  }
  closeanswerPopup(){
    jQuery('#answermsdPop').modal('close');
  }

  showAnsDiv(id){
    let answerDiv = jQuery("#questionDivTextReplyId_"+id);
    if(answerDiv.css("display") == "block"){
      answerDiv.css("display","none");
    }else{
      jQuery(".questionDivTextReply").css("display","none");
      answerDiv.css("display","block");
    }
  }

  textChanges(data){
    if(data.question != ""){
      return;
    }

    this.p=1;
    this.itemsAre=[1];
    this.questData=[];
    this.getLimitedQuestions({
      onLoad : true,
      itemsPerPage : this.itemsPerPage
    });

  }
  searchQuesData(data){
    this.paginatorMove=false;
    this._forum.searchQuestionData(data).subscribe(res=>{
      this.questData=res.data;
    },err =>{
      console.log(err);
    });
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
    
    this._forum.addAnserData(answerD).subscribe(res=>{
        if(res.data){
          console.log(res.data);
          this.getAnswerData = [res.data, ...this.getAnswerData];
          if(jQuery("#answerQue_"+res.data.questionByUserId._id).css("display") == "block"){
            this.answerQueData = [res.data, ...this.answerQueData];
          }
        }
        this.msgForPopup=res.message;
        this.answerPopup();
        jQuery("#"+id).css("display","none");
        setTimeout(()=>{
          this.closeanswerPopup();
        },2000);
      },err=>{
        console.log(err);
      }
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

   handlePaginator($event){
     this.p = $event;
     if(!this.paginatorMove){
      return ;
     }

     if(this.itemsAre.includes($event)){
      return ;
     }
     this.itemsAre.push($event);
     this.getLimitedQuestions({
        createdAt : this.createdAt,
        itemsPerPage : this.itemsPerPage
     });
   }

  getAnswers(obj){
    this.answerData =  [];
    
    if(jQuery("#answer_"+obj._id).css("display") == "block"){
      jQuery("#answer_"+obj._id).css("display","none");
      return ;
    }
    jQuery(".questionDivTextAnswer").css("display","none");

    this.getAnswerData.forEach(answer => {
      if(answer.questionByUserId._id == obj._id){
        this.answerData.push(answer);
      }
    });
    jQuery("#loader_"+obj._id).css("display","block");
    setTimeout(()=>{
      jQuery("#answer_"+obj._id).css("display","block");
      jQuery("#loader_"+obj._id).css("display","none");
    }, 500);
  }

  getAnswersQue(obj){
    this.answerQueData =  [];
    console.log("obj._id : ",obj._id);
    if(jQuery("#answerQue_"+obj._id).css("display") == "block"){
      jQuery("#answerQue_"+obj._id).css("display","none");
      return ;
    }
    jQuery(".questionDivTextAnswer").css("display","none");

    this.getAnswerData.forEach(answerAre => {
      if(answerAre.questionByUserId._id == obj._id && answerAre.answerByUserId?._id === this.loggedInUser._id){
        this.answerQueData = [...this.answerQueData, answerAre];
      }
    });
    
    jQuery("#loaderQue_"+obj._id).css("display","block");
    setTimeout(()=>{
      jQuery("#answerQue_"+obj._id).css("display","block");
      jQuery("#loaderQue_"+obj._id).css("display","none");
    }, 500);
  }

  getImage(obj){
    obj.showCreatedLogo = true;
  }

  ngOnDestroy() {
    this._socket.removeListener({ type: this._constants.askQuestionType });
    this.questionObserver.unsubscribe();
  }

}
