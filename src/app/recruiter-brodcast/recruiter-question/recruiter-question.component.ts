import { Component, OnInit, Input, Pipe, PipeTransform, OnDestroy } from '@angular/core';
import { IBiddingEvent, BiddingEvent } from 'src/app/models/bidding-event';
import { Router, ActivatedRoute } from '@angular/router';
import { BiddingEventService } from 'src/app/_services/bidding-event.service';
import { CompleterService, CompleterData } from 'ng2-completer';
import { WebsocketService } from 'src/app/_services/websocket.service';
import { Subject } from 'rxjs';
import { ConstantsService } from 'src/app/_services/constants.service';

declare var Materialize;
@Component({
  selector: 'app-recruiter-question',
  templateUrl: './recruiter-question.component.html',
  styleUrls: ['./recruiter-question.component.css']
})
export class RecruiterQuestionComponent implements OnInit, OnDestroy {
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
    });

    await this._socket.removeListener({ type: this._constants.profileQuestionType });
    this._socket.addListener({
      type: this._constants.profileQuestionType,
      callback: this.questionObserver
    });

    this.questionObserver$.subscribe((res: any) => {
      this.handleQuestionData(res);
    });

    this._socket.sendMessage({
      type: this._constants.profileQuestionType,
      data: {
        _id: this.id,
        subType: this._constants.getAllQuestions
      }
    });

    this.bidEventService.getBiddingEventById(this.id).subscribe((data) => {
      this.biddingEvent = data;
    });

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
      RecruiterId: this.user,
      EmployerId: this.biddingEvent.employerKey,
      JobProfile: this.biddingEvent.jobProfileKey
    };

    this._socket.sendMessage({
      type: this._constants.profileQuestionType,
      data: {
        info: info,
        subType: this.askedQuestion
      }
    });

    this.quetionsData = [...this.tempQuestionData];
  }

  ngOnDestroy() {
    this._socket.removeListener({ type: this._constants.profileQuestionType });
    this.questionObserver.unsubscribe();
  }

}
