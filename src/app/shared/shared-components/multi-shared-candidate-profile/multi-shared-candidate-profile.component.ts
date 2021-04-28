import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ConstantsService } from 'src/app/_services/constants.service';
import { UserService } from 'src/app/_services/user.service';
import { WebsocketService } from 'src/app/_services/websocket.service';

@Component({
  selector: 'app-multi-shared-candidate-profile',
  templateUrl: './multi-shared-candidate-profile.component.html',
  styleUrls: ['./multi-shared-candidate-profile.component.css']
})
export class MultiSharedCandidateProfileComponent implements OnInit {

  loggedUser: any;
  resumes = [];
  
  // pagination
  p = 1;

  // observer
  multiSharedProfileObserver = new Subject();
  multiSharedProfileObserver$ = this.multiSharedProfileObserver.asObservable();

  constructor(private _socket: WebsocketService, private _constants: ConstantsService, private _userService: UserService){
    this.loggedUser = this._userService.getUserData();
  }

  async ngOnInit(){

    await this._socket.removeListener({ type: this._constants.sharedProfileType });
    this._socket.addListener({
      type: this._constants.sharedProfileType,
      callback: this.multiSharedProfileObserver,
    });

    this.getProfiles();

    this.multiSharedProfileObserver$.subscribe((res: any) => {
      this.handleProfileData(res);
    });

  }

  getProfiles() {
    this._socket.sendMessage({
      type: this._constants.sharedProfileType,
      data: {
        subType: this._constants.getAllMultiSharedProfiles,
      },
    });
  }

  handleProfileData(res: any) {
    switch (res.subType) {
      case this._constants.getAllMultiSharedProfiles:
        this.resumes = res.data;
        console.log("this.resumes : ",this.resumes);
        break;
      default:
        break;
    }
  }

}
