import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeopleEventService } from 'src/app/_services/people-event.service';
import { PeoplesEvent } from '../app-list/app-list.component';
import { UserService } from "../../../../_services/user.service";

@Component({
  selector: 'app-event-list-users',
  templateUrl: './event-list-users.component.html',
  styleUrls: ['./event-list-users.component.css']
})
export class EventListUsersComponent implements OnInit {
  eventId: any;
  eventsList: PeoplesEvent;

  loggedUser: any;
  showLoader: boolean = true;
  
  constructor(
    private _route: ActivatedRoute,
    private _peopleEventService: PeopleEventService,
    private _router: Router,
    private _userService:UserService
  ) {
    this._route.params.subscribe(params => {
      this.eventId = params.eventId;
    });
    this.loggedUser = this._userService.getUserData();
  }

  ngOnInit(): void {
    this.getPeopleEvents();
  }

  getPeopleEvents() {
    this._peopleEventService.getEvents(this.eventId).subscribe(data => {
      this.showLoader = false;
      this.eventsList = data[0];
    },err=>{
      this.showLoader = false;
    });
  }

  backToEvents(){
    this._router.navigate(["/candidate/suggest-and-events"], { queryParams: { eventRoute: 1}});
  }

  gotoChat(userId){
    this._router.navigate(["/"+this.loggedUser.userRole+"/chat-record", userId]);
  }

  getIntroYouToAndDesiredCompanies(userId,field){
    let text = '';
    for(let candidate of this.eventsList.attendingCandidateList){
      if(candidate.candidate_id == userId){
        text = candidate[field];
        break;
      }
    }
    return text;
  }
}
