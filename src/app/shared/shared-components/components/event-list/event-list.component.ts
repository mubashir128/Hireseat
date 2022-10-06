import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { PeoplesEvent } from '../app-list/app-list.component';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  @Input() eventsList: PeoplesEvent[];
  @Output() attendEM = new EventEmitter();
  @Output() cancelAttendEM = new EventEmitter();

  loggedUser: any;
  profileImageLength: number = 5;

  constructor(
    protected _userService: UserService,
    private _router: Router
  ){}

  ngOnInit(): void {
    this.loggedUser = this._userService.getUserData();
  }

  checkStatus(event){
    let status: boolean = false;
    if(this.loggedUser.userRole == 'candidate'){
      event.attendingUsers.forEach(user=>{
        if(user.userId._id == this.loggedUser._id){
          status = true;
        }
      });
    }
    return status;
  }

  attendEvent(event){
    this.attendEM.emit({eventId : event._id});
  }

  cancelAttendEvent(event){
    this.cancelAttendEM.emit({eventId : event._id});
  }

  seeEventUsers(event){
    this._router.navigate(["/candidate/see-event-users/", event._id]);
  }
}
