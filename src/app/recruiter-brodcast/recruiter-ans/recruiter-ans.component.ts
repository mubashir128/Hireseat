import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { IBiddingEvent } from 'src/app/models/bidding-event';
import { Router, ActivatedRoute } from '@angular/router';
import { BiddingEventService } from 'src/app/_services/bidding-event.service';
import { count } from 'rxjs/operators';
import { WebsocketService } from 'src/app/_services/websocket.service';
import { Subject } from 'rxjs';
import { isNgTemplate } from '@angular/compiler';
import { ConstantsService } from 'src/app/_services/constants.service';
declare var Materialize;

@Component({
  selector: 'app-recruiter-ans',
  templateUrl: './recruiter-ans.component.html',
  styleUrls: ['./recruiter-ans.component.css']
})
export class RecruiterAnsComponent implements  OnInit, OnDestroy {
  @Input() public biddingEvent: IBiddingEvent;
  user: any;
  id: any;
  question: any;
  quetionsData = [];
  selectedId = -1;
  answer;
  show:boolean = false;
  showdata:boolean = true;
  count:number = 0;
  queid: any;
  queDetails: any;
  shownotification = false;
  questionObserver = new Subject();
  questionObserver$ = this.questionObserver.asObservable();
  canId;
  recId;

  postAnswer = "postAnswer";

  constructor(private router: Router, private route: ActivatedRoute,private bidEventService:BiddingEventService, private _socket: WebsocketService, private _constants : ConstantsService) {
  }

  async ngOnInit() {

    this.user = JSON.parse(localStorage.getItem('currentUser')).userInfo
    this.id = this.route.snapshot.paramMap.get('key');

    await this._socket.removeListener({ type: this._constants.candidateJobQuestionType });
    this._socket.addListener({
      type: this._constants.candidateJobQuestionType,
      callback: this.questionObserver
    });

    this.questionObserver$.subscribe((res: any) => {
      this.handleQuestionData(res);
    });

    this._socket.sendMessage({
      type: this._constants.candidateJobQuestionType,
      data: {
        _id : this.id,
        subType: this._constants.getAllQuestions
      }
    });
    
  }

  handleQuestionData(res: any) {
    if(res.data.biddingEventId !== this.id && res.subType !== this._constants.getAllQuestions){
      return ;
    }

    switch (res.subType) {
      case this._constants.getAllQuestions :
        // add all questions to list.
        if(res.data.length > 0){
          this.quetionsData = res.data;
          this.countQuestions();
          this.doWork();
        }
        break;
      case this._constants.question :
        // add question to list.
        if(res.result){
          Materialize.toast('New Question asked', 1000);
          this.quetionsData.push(res.data);
          this.count++;
        }
        break;
      case this._constants.answer :
          // add answer to list.
          if(this.count > 0){
            this.count--;
          }
          this.answer='';
          this.show=false;
          this.updateElement(res.data);
          Materialize.toast('Answer posted', 1000);
          break;
      default:
        break;
    }
  }  

  doWork(){
    this.route.queryParams.subscribe(params =>{
      this.queid = params['queid'];
      this.queDetails = this.quetionsData.find(que => que._id === params['queid']);
      this.shownotification = true;
    });
  }

  updateElement(obj){
    for(let i=0;i<this.quetionsData.length;i++){
        if(this.quetionsData[i]._id === obj._id){
          this.quetionsData[i].Ans=obj.Ans;
          break;
        }
    }
  }

  countQuestions(){
    this.quetionsData.forEach(element => {
      if(!element.Ans){
        this.count++;
      }
    });
  }

  showpostAns(evt,_id,recId,canId){
    this.selectedId = evt;
    this.show = true;
    this.shownotification = false;
    this.recId=recId;
    this.canId=canId;
  }

  showDiv(){
    this.showdata = !this.showdata;
  }

  postAns(selectedId){
    var ans ={
      id : selectedId,
      Ans : this.answer,
      recId : this.recId,
      canId : this.recId
    }

    this._socket.sendMessage({
      type: this._constants.candidateJobQuestionType,
      data: {
        info : ans,
        subType: this.postAnswer
      }
    });

  }

  ngOnDestroy() {
    this._socket.removeListener({ type: this._constants.candidateJobQuestionType });
    this.questionObserver.unsubscribe();
  }

}
