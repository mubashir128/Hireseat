import { Component, OnInit } from '@angular/core';
import { CandidateService } from 'src/app/_services/candidate.service';
import { ConstantsService } from 'src/app/_services/constants.service';
import { SubscriberslistService } from 'src/app/_services/subscriberslist.service';
declare var Materialize;

@Component({
  selector: 'app-friends-connections',
  templateUrl: './friends-connections.component.html',
  styleUrls: ['./friends-connections.component.css']
})
export class FriendsConnectionsComponent implements OnInit {

  friendsConnections = [];
  requestedFriendAre =  [];

  showRequest = true;
  showFriends = true;

  reqeustClass = "fas fa-sort-down";
  friendClass = "fas fa-sort-down";

  constructor(
    private _candidateService: CandidateService,
    private _subList: SubscriberslistService,
    private _constants: ConstantsService
  ){}

  ngOnInit(){
    this.getFriendConnections();
  }

  getFriendConnections(){
    let payload = {};
    this._subList.loaderList.next({type : "1"});
    this._candidateService.getAllConnectedUsers(payload).subscribe((res) => {
      this._subList.loaderList.next({type : "0"});
      this.sortBasedOnStatusAsFriend(res.data);
    }, (err) => {
      console.log(err);
      this._subList.loaderList.next({type : "0"});
    });
  }

  sortBasedOnStatusAsFriend(data){
    data.forEach((friend, index) => {
      if(friend.status === this._constants.asAFriend){
        this.friendsConnections = [...this.friendsConnections, friend];
      }else if(friend.status === this._constants.asARequested){
        this.requestedFriendAre = [...this.requestedFriendAre, friend];
      }
    });
    console.log("this.friendsConnections : ",this.friendsConnections);
    console.log("this.requestedFriendAre : ",this.requestedFriendAre);
  }

  toggleRequestedAre(){
    this.showRequest = !this.showRequest;
    this.reqeustClass = this.reqeustClass == "fas fa-sort-down" ? "fas fa-sort-up" : "fas fa-sort-down";
  }

  toggleFriendAre(){
    this.showFriends = !this.showFriends;
    this.friendClass = this.friendClass == "fas fa-sort-down" ? "fas fa-sort-up" : "fas fa-sort-down";
  }

  acceptClick(){
    
  }

  rejectClick(){
    
  }

}
