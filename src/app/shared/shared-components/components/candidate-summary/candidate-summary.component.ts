import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-candidate-summary',
  templateUrl: './candidate-summary.component.html',
  styleUrls: ['./candidate-summary.component.css']
})
export class CandidateSummaryComponent implements OnInit {

  title: string = "Candidate's Summary : ";
  @Input() resume: any;

  constructor() {
  }

  ngOnInit(): void {
  }

}
