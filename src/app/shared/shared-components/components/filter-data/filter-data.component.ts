import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter-data',
  templateUrl: './filter-data.component.html',
  styleUrls: ['./filter-data.component.css']
})
export class FilterDataComponent implements OnInit {

  searchTab = false;
  @Output() handleToggleSign = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  toggleSearch(){
    this.searchTab = !this.searchTab;
    this.handleToggleSign.emit({searchTab : this.searchTab});
  }

}
