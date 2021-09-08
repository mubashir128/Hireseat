import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter-data',
  templateUrl: './filter-data.component.html',
  styleUrls: ['./filter-data.component.css']
})
export class FilterDataComponent implements OnInit {

  searchTab = false;
  @Output() handleToggleSign = new EventEmitter();

  searchText = "";
  @Input() item;

  constructor() { }

  ngOnInit() {
    this.handleSeachText();
  }

  toggleSearch(){
    this.searchTab = !this.searchTab;
    this.handleToggleSign.emit({searchTab : this.searchTab});
  }

  handleSeachText(){
    switch(this.item){
      case "onlyCandidateSearch" : 
        this.searchText = "Search for New Introductions";
        break ;
      default :
        this.searchText = "Search by Industries or Name"; 
        break ;
    }
  }

}
