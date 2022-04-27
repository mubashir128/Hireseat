import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-close-screen',
  templateUrl: './close-screen.component.html',
  styleUrls: ['./close-screen.component.css']
})
export class CloseScreenComponent implements OnInit {

  @Output() closeEm = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  closeShareModal(){
    this.closeEm.emit(false);
  }

}
