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
  quetionsData: any;
  protected dataService: CompleterData;
  showdata: boolean= true;
  searchTerm: string;
  queid: string;
  questionObserver = new Subject();
  questionObserver$ = this.questionObserver.asObservable();

  constructor(private router: Router,private completerService: CompleterService, private route: ActivatedRoute,private bidEventService:BiddingEventService,private _socket: WebsocketService) {
  }

  async ngOnInit() {

    this.user = JSON.parse(localStorage.getItem('currentUser')).userInfo._id;
    this.id = this.route.snapshot.paramMap.get('key');
     this.route.queryParams.subscribe(params => {
      this.queid = params['queid']
    })

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
        subType: "getAllQuestions",
        data : {
          _id : this.id,
          type : this.user.userRole
        }
      }
    });

    // console.log(this.queid);
    this.bidEventService.getBiddingEventById(this.id).subscribe((data)=>{
      this.biddingEvent = data;
    });

    // this.bidEventService.getAllQuestions(this.id,this.user.userRole).subscribe((data)=>{ 
    //   this.quetionsData = data;
    //   console.log(this.quetionsData);
    //   this.dataService = this.completerService.local(this.quetionsData, 'question', 'question');
    // });
    
  }

  handleQuestionData(res: any) {
    switch (res.subType) {
      case "getAllNotifications" :
        console.log("socket data : ",res.data);
        this.quetionsData = res.data;
        break;
      default:
        break;
    }
  }

  showDiv(){
    this.showdata = !this.showdata;
  }
  updateSearch(e) {
    this.question = e.target.value;
    // console.log(this.question);
    var info = {
      question: this.question,
      biddingEventId:this.biddingEvent._id
    }
    this.bidEventService.getQuestions(info).subscribe((data)=>{
      // console.log(data);
      this.quetionsData = data;
    })
  }

  AskQuestions(){
    var info = {
      question: this.question,
      biddingEventId:this.biddingEvent._id,
      RecruiterId:this.user,     
      EmployerId:this.biddingEvent.employerKey,
      JobProfile:this.biddingEvent.jobProfileKey
   };
      this.bidEventService.addRecruiterQuetions(info).subscribe((res)=>{
      this.result = res;
        if(this.result.result == "inserted"){
          Materialize.toast('Question added successfully', 1000)
          this.question = '';
          this.bidEventService.getAllQuestions(this.id,this.user.userRole).subscribe((data)=>{
     
            this.quetionsData = data;
            
            
            
          })
        }
      })
    }
  

}
