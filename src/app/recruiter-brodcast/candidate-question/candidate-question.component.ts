import { Component, OnInit, Input } from '@angular/core';
import { IBiddingEvent } from '../../models/bidding-event';
import { CompleterData, CompleterService } from 'ng2-completer';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { BiddingEventService } from '../../_services/bidding-event.service';
import { WebsocketService } from '../../_services/websocket.service';
import { ConstantsService } from '../../_services/constants.service';

declare var Materialize;

@Component({
  selector: 'app-candidate-question',
  templateUrl: './candidate-question.component.html',
  styleUrls: ['./candidate-question.component.css']
})
export class CandidateQuestionComponent implements OnInit {
  
  @Input() public biddingEvent: IBiddingEvent;
  user: any;
  id: any;
  question: any;
  result: any;
  quetionsData = [];
  tempQuestionData = [];
  protected dataService: CompleterData;
  showdata: boolean = true;
  searchTerm: string;
  queid: string;
  questionObserver = new Subject();
  questionObserver$ = this.questionObserver.asObservable();

  askedQuestion = "askedQuestion";

  constructor(private router: Router, private completerService: CompleterService, private route: ActivatedRoute, private bidEventService: BiddingEventService, private _socket: WebsocketService,  private _constants : ConstantsService) {
  }

  async ngOnInit() {

    this.user = JSON.parse(localStorage.getItem('currentUser')).userInfo._id;
    this.id = this.route.snapshot.paramMap.get('key');
    this.route.queryParams.subscribe(params => {
      this.queid = params['queid'];
    })

    let obj = JSON.parse(localStorage.getItem('currentUser'));
    if (obj !== null) {
      await this.initSocket(obj.token, obj.userInfo.userRole);
    }

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
        _id: this.id,
        subType: this._constants.getAllQuestions
      }
    });

    this.bidEventService.getBiddingEventById(this.id).subscribe((data) => {
      this.biddingEvent = data;
    });

  }

  async initSocket(token, userRole) {
    await this._socket.getInstance(token, userRole);
  }

  handleQuestionData(res: any) {
    if (res.data.biddingEventId !== this.id && res.subType !== this._constants.getAllQuestions) {
      return;
    }

    switch (res.subType) {
      case this._constants.getAllQuestions:
        // add all questions to list.
        if (res.data.length > 0) {
          this.quetionsData = res.data;
          this.tempQuestionData = res.data;
        }
        break;
      case this._constants.question:
        // add question to list.
        if (res.result) {
          this.question = '';
          Materialize.toast('Question added successfully', 1000)
          this.quetionsData.push(res.data);
          this.tempQuestionData.push(res.data);
        }
        break;
      case this._constants.answer:
        // add answer to list.
        this.updateElement(res.data);
        Materialize.toast('Answer added', 1000);
        break;
      default:
        break;
    }
  }

  updateElement(obj) {
    for (let i = 0; i < this.quetionsData.length; i++) {
      if (this.quetionsData[i]._id === obj._id) {
        this.quetionsData[i].Ans = obj.Ans;
        break;
      }
    }
  }

  showDiv() {
    this.showdata = !this.showdata;
  }

  updateSearch(e) {
    this.question = e.target.value;

    if (this.question === '') {
      this.quetionsData = [...this.tempQuestionData];
      return;
    }

    var regexp = new RegExp(this.question, 'i');
    var search_regexp = new RegExp(this.question, "g");

    this.quetionsData = this.tempQuestionData.filter(question => {
      let name = question.question;
     


      return regexp.test(name);
    });

  }

  AskQuestions() {
    var info = {
      question: this.question,
      biddingEventId: this.biddingEvent._id,
      candidateId: this.user,
      recruiterId: this.biddingEvent.employerKey,//job profile creater
      JobProfile: this.biddingEvent.jobProfileKey
    };

    this._socket.sendMessage({
      type: this._constants.candidateJobQuestionType,
      data: {
        info: info,
        subType: this.askedQuestion
      }
    });

    this.quetionsData = [...this.tempQuestionData];
  }

  ngOnDestroy() {
    this._socket.removeListener({ type: this._constants.candidateJobQuestionType });
    this.questionObserver.unsubscribe();
  }

}
