import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-profile-buttons',
  templateUrl: './profile-buttons.component.html',
  styleUrls: ['./profile-buttons.component.css']
})
export class ProfileButtonsComponent implements OnInit {

  title: string = "";
  @Input() resume: any;

  @Output() onDownloadEM = new EventEmitter();
  @Output() onLinkedInEM = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  transform(url){
    this.onDownloadEM.emit(url);
  }

  onLinkedIn(link){
    this.onLinkedInEM.emit(link);
  }
}
