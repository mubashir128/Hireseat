import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-interview-questions',
  templateUrl: './interview-questions.component.html',
  styleUrls: ['./interview-questions.component.css']
})
export class InterviewQuestionsComponent implements OnInit {

  @Input() videoURL;
  @Input() questionsByRecruiter;

  @Output() setCurrentTimeEM = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  setCurrentTime(seconds, questionNumber) {
    this.setCurrentTimeEM.emit({seconds : seconds, questionNumber : questionNumber});
  }

}
