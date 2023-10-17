import { Component, Input, OnInit } from '@angular/core';
import { CandidateService } from 'src/app/_services/candidate.service';

@Component({
  selector: 'app-connection-requests',
  templateUrl: './connection-requests.component.html',
  styleUrls: ['./connection-requests.component.css']
})
export class ConnectionRequestsComponent implements OnInit {

  @Input() requestedFriendAre;

  constructor(
    private _candidateService: CandidateService
  ) { }

  ngOnInit() {
  }

  changeLogo(notify) {
    notify.showCreatedLogo = true;
  }

  getIntroduceCount(requestedFriendIs, obj) {
    return requestedFriendIs?.[obj]?.introduceCount ? requestedFriendIs[obj].introduceCount : 0;
  }

  acceptClick(userObj) {
    let payload = {
      id: userObj._id
    };

    this._candidateService.acceptFriendRequest(payload).subscribe((res) => {
      this.removeRequestFromFriendRequest(res.data);
    }, (err) => {
      console.log(err);
    });
  }

  removeRequestFromFriendRequest(res) {
    this.requestedFriendAre.forEach((frdRequest, index) => {
      if (res._id == frdRequest._id) {
        this.requestedFriendAre.splice(index, 1);
      }
    });
  }

  cancelClick(id) {
    let payload = {
      id: id
    };

    this._candidateService.cancelFriendRequest(payload).subscribe((res) => {
      this.removeRequestFromFriendRequest(res.data);
    }, (err) => {
      console.log(err);
    });
  }

  onLinkedIn(link: string) {
    if (link.includes("https")) {
      window.open(link, "_blank");
    } else {
      window.open("https://" + link, "_blank");
    }
  }
}
