import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConferenceRoom } from 'src/app/_services/conference-room.service';

@Component({
  selector: 'app-comments-section',
  templateUrl: './comments-section.component.html',
  styleUrls: ['./comments-section.component.css']
})
export class CommentsSectionComponent implements OnInit {

  @Input() conference: ConferenceRoom;
  review: string;

  @Output() postCmtEM = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    console.log("conference : ",this.conference);
  }

  postMycmt() {
    this.postCmtEM.emit({review : this.review, conference : this.conference});
    this.review = "";
  }

}
