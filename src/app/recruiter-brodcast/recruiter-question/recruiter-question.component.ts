import { Component, OnInit, Input, Pipe, PipeTransform } from '@angular/core';
import { IBiddingEvent, BiddingEvent } from 'src/app/models/bidding-event';
import { Router, ActivatedRoute } from '@angular/router';
import { BiddingEventService } from 'src/app/_services/bidding-event.service';
import { CompleterService, CompleterData } from 'ng2-completer';
import { DomSanitizer} from '@angular/platform-browser'
import { WebsocketService } from 'src/app/_services/websocket.service';
import { Subject } from 'rxjs';

declare var Materialize;
@Component({
  selector: 'app-recruiter-question',
  templateUrl: './recruiter-question.component.html',
  styleUrls: ['./recruiter-question.component.css']
})
export class RecruiterQuestionComponent implements OnInit {
  @Input() public biddingEvent: IBiddingEvent;
  user: any;
  id: any;
  question: any;
  result: any;
  quetionsData = [];
  tempQuestionData = [];
  protected dataService: CompleterData;
  showdata: boolean= true;
  searchTerm: string;
  queid: string;
  questionObserver = new Subject();
  questionObserver$ = this.questionObserver.asObservable();

  constructor(private router: Router,private completerService: CompleterService, private route: ActivatedRoute,private bidEventService:BiddingEventService, private _socket: WebsocketService) {
  }

  async ngOnInit() {

    this.user = JSON.parse(localStorage.getItem('currentUser')).userInfo._id;
    this.id = this.route.snapshot.paramMap.get('key');
     this.route.queryParams.subscribe(params => {
      this.queid = params['queid'];
    })

    let obj = JSON.parse(localStorage.getItem('currentUser'));
    if (obj !== null) {
      await this.initSocket(obj.token);
    }

    await this._socket.removeListener({ type: 3 });
    this._socket.addListener({
      type: 3,
      callback: this.questionObserver
    });

    this.questionObserver$.subscribe((res: any) => {
      this.handleQuestionData(res);
    });

    this._socket.sendMessage({
      type: 3,
      data: {
        _id : this.id,
        subType: "getAllQuestions",
        type : JSON.parse(localStorage.getItem('currentUser')).userInfo.userRole
      }
    });

    this.bidEventService.getBiddingEventById(this.id).subscribe((data)=>{
      this.biddingEvent = data;
    });
    
  }

  async initSocket(token) {
    await this._socket.getInstance(token);
  }

  handleQuestionData(res: any) {
    switch (res.subType) {
      case "getAllQuestions" :
        // add all questions to list.
        if(res.data.length > 0){
          this.quetionsData = res.data;
          this.tempQuestionData = res.data;
        }
        break;
      case "question" :
        // add question to list.
        if(res.result){
          this.question = '';
          Materialize.toast('Question added successfully', 1000)
          this.quetionsData.push(res.data.data);
          this.tempQuestionData.push(res.data.data);
        }
        break;
      case "answer" :
          // add answer to list.
          this.updateElement(res.data.result);
          Materialize.toast('Answer added', 1000);
          break;
      default:
        break;
    }
  }

  updateElement(obj){
    for(let i=0;i<this.quetionsData.length;i++){
        if(this.quetionsData[i]._id === obj._id){
          this.quetionsData[i].Ans=obj.Ans;
          break;
        }
    }
  }

  showDiv(){
    this.showdata = !this.showdata;
  }

  updateSearch(e) {
    this.question = e.target.value;
    
    if(this.question === ''){
      this.quetionsData=[...this.tempQuestionData];
      return ;
    }

    var regexp = new RegExp(this.question, 'i');
    this.quetionsData = this.tempQuestionData.filter(question => {
      let name=question.question;
      return regexp.test(name);
    });

  }

  AskQuestions(){
    var info = {
      question : this.question,
      biddingEventId : this.biddingEvent._id,
      RecruiterId : this.user,
      EmployerId : this.biddingEvent.employerKey,
      JobProfile : this.biddingEvent.jobProfileKey
    };

    this._socket.sendMessage({
      type: 3,
      data: {
        info : info,
        subType: "askedQuestion"
      }
    });

    this.quetionsData=[...this.tempQuestionData];
  }

}
