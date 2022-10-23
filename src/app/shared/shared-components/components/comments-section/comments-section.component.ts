import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConferenceRoom } from 'src/app/_services/conference-room.service';

@Component({
  selector: 'app-comments-section',
  templateUrl: './comments-section.component.html',
  styleUrls: ['./comments-section.component.css']
})
export class CommentsSectionComponent implements OnInit {

  @Input() conferenceId: any;
  @Input() canconferenceRoom: any[];

  @Input() profileId: any;
  review: string;

  @Output() postCmtEM = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  postMyConferencecmt() {
    this.postCmtEM.emit({review : this.review, profileId : this.profileId, conferenceId: this.conferenceId});
    this.review = "";
  }

}
