import { Component, OnInit } from '@angular/core';
import { CandidateService } from 'src/app/_services/candidate.service';
import { ConstantsService } from 'src/app/_services/constants.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-suggest-connected',
  templateUrl: './suggest-connected.component.html',
  styleUrls: ['./suggest-connected.component.css']
})
export class SuggestConnectedComponent implements OnInit {
  friendsConnections: any;
  loggedUser: any;

  constructor(
    private _candidateService : CandidateService,
    private _constants : ConstantsService, 
    protected _userService: UserService, 
  ) {
    this.loggedUser = this._userService.getUserData();
  }

  ngOnInit(): void {
    this.getConnectedFriends();
  }

  getConnectedFriends(){
    let payload = {
      type : this._constants.asAFriend
    }
    this._candidateService.getAllConnectedUsers(payload).subscribe((res) => {
      this.friendsConnections = res.data;
    }, (err) => {
      console.log(err);
    });
  }

  getIntroduceCount(requestedFriendIs,obj){
    return requestedFriendIs?.[obj]?.introduceCount ? requestedFriendIs[obj].introduceCount : 0;
  }

  changeLogo(notify){
    notify.showCreatedLogo = true;
  }

}
