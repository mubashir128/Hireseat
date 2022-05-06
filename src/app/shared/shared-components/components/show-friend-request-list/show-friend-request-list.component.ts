import { Component, Inject, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CandidateService } from 'src/app/_services/candidate.service';

declare var jQuery;
declare var Materialize;

@Component({
  selector: 'app-show-friend-request-list',
  templateUrl: './show-friend-request-list.component.html',
  styleUrls: ['./show-friend-request-list.component.css']
})
export class ShowFriendRequestListComponent implements OnInit {

  users : any[];
  selectedList: any = [];
  
  profileSet = new Map();
  
  @Input() profileContents : any[];
  @Input() step : number = 1;

  @Output() closeEM = new EventEmitter();
  @Output() nextEM = new EventEmitter();

  constructor(protected _candidateService: CandidateService){
  }

  ngOnInit(): void { 
  }

  selectionChange($event: any) {
    this.profileSet.set($event.option.value, !this.profileSet.get($event.option.value));
  }

  sendFriendRequest(){
    if(this.profileSet.size == 0){
      return ;
    }

    this._candidateService.connectWithMultipleUsers(this.profileSet).subscribe((res) => {
      Materialize.toast("Friend requestes are sended", 1000, "green");
      if(this.step == 1){
        this.nextStep(2);
        return ;
      }
      this.closeEM.emit(true);
    }, (err) => {
    });
  }

  changeLogo(notify){
    notify.showCreatedLogo = true;
  }

  nextStep(step){
    this.nextEM.emit(step);
  }

  getStep(step){
    return this.step == step ? true : false;
  }

}
