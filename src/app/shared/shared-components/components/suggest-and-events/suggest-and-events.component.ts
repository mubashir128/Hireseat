import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IntroduceService } from 'src/app/_services/introduce.service';

@Component({
  selector: 'app-suggest-and-events',
  templateUrl: './suggest-and-events.component.html',
  styleUrls: ['./suggest-and-events.component.css']
})
export class SuggestAndEventsComponent implements OnInit {

  itemsIs = 0;
  showEvents: boolean = true;
  showNewIntro: boolean = false;
  showIntro: boolean = false;
  showJobs: boolean = false;

  pendingIntroduceCount = 0;

  constructor(
    private _route: ActivatedRoute,
    private _introduceService: IntroduceService
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
    this.getReadIntroduceCount();
  }

  switchPage(page){
    jQuery("#switch" + this.itemsIs).css("background-color", "#33aaff");
    this.itemsIs = page;
    jQuery("#switch" + page).css("background-color", "#27B1BD");

    if(this.itemsIs == 0){
      this.activeEventstab();
    }else if(this.itemsIs == 1){
      this.activeNewIntros();
    }else if(this.itemsIs == 2){
      this.activeIntrotab();
    }else if(this.itemsIs == 3){
      this.activeJobs();
    }
  }

  activeEventstab(){
    this.showEvents = true;
    this.showNewIntro = false;
    this.showIntro = false;
    this.showJobs = false;
  }

  activeIntrotab(){
    this.showIntro = true;
    this.showEvents = false;
    this.showNewIntro = false;
    this.showJobs = false;
  }

  activeNewIntros(){
    this.updateReadIntroduceCount();
    this.showNewIntro = true;
    this.showEvents = false;
    this.showIntro = false;
    this.showJobs = false;
  }

  activeJobs(){
    this.showJobs = true;
    this.showEvents = false;
    this.showNewIntro = false;
    this.showIntro = false;
  }

  getReadIntroduceCount(){
    this._introduceService.getReadIntroduceCount().subscribe((res) => {
      if(res){
        this.pendingIntroduceCount = res.count;
      }
    }, (err) => {
      console.log(err);
    });
  }

  updateReadIntroduceCount(){
    this._introduceService.updateReadIntroduceCount().subscribe((res) => {
      this.pendingIntroduceCount = 0;
    }, (err) => {
      console.log(err);
    });
  }
}
