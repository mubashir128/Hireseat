import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-suggest-and-events',
  templateUrl: './suggest-and-events.component.html',
  styleUrls: ['./suggest-and-events.component.css']
})
export class SuggestAndEventsComponent implements OnInit {

  itemsIs = 0;
  showIntro: boolean = true;
  showEvents: boolean = false;

  constructor(
    private _route: ActivatedRoute
  ){
    this.itemsIs = this._route.snapshot.queryParams["eventRoute"] ? this._route.snapshot.queryParams["eventRoute"] : this.itemsIs;
    let eventRoute = this._route.snapshot.queryParams["eventRoute"];
    let eventId = this._route.snapshot.queryParams["eventId"];
    if(eventRoute){
      this.itemsIs = eventRoute;
      this.activeEventstab();
    }
  }

  ngOnInit(): void {
  }

  switchPage(page){
    jQuery("#switch" + this.itemsIs).css("background-color", "#33aaff");
    this.itemsIs = page;
    jQuery("#switch" + page).css("background-color", "#27B1BD");

    if(this.itemsIs == 0){
      this.activeIntrotab();
    }else if(this.itemsIs == 1){
      this.activeEventstab();
    }
  }

  activeIntrotab(){
    this.showIntro = true;
    this.showEvents = false;
  }

  activeEventstab(){
    this.showIntro = false;
    this.showEvents = true;
  }
}
