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
      this.setCheckInUsersInEventList();
      
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

  setCheckInUsersInEventList(){
    if(this.eventsList.attendingUsers.length!=0){
      for (let index = 0; index < this.eventsList.attendingUsers.length; index++) {
        this.eventsList.attendingUsers[index].checkIn=false;
        this.verifyCheckInUser(this.eventsList.attendingUsers[index].userId._id,this.eventsList.checkInUsers)          
      }
      let attendingUsers = this.eventsList.attendingUsers.sort((x,y)=>{
        return Number(y.checkIn)-Number(x.checkIn);
      })

      this.eventsList.attendingUsers = attendingUsers;
    }
  }

  verifyCheckInUser(userId, checkInUsers) {
    // console.log(userId, checkInUsers)
    for (let index = 0; index < checkInUsers.length; index++) {
      if (checkInUsers[index].userId._id == userId && checkInUsers[index].checkIn) {
        for (let j = 0; j < this.eventsList.attendingUsers.length; j++) {
          if(this.eventsList.attendingUsers[j].userId._id==checkInUsers[index].userId._id){
            this.eventsList.attendingUsers[j].checkIn=true;
           //console.log(checkInUsers[index].userId._id,this.eventsList.attendingUsers[j])
          }          
        }
        return true;
      }
    }
  }
}
