import { Component, Inject, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CandidateService } from 'src/app/_services/candidate.service';
import { DialogMessageComponent } from '../dialog-message/dialog-message.component';

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
  
  @Input() profileSet = new Map();
  
  @Input() profileContents : any[];
  @Input() step : number = 1;

  @Output() closeEM = new EventEmitter();
  @Output() nextEM = new EventEmitter();

  constructor(protected _candidateService: CandidateService, protected _dialog: MatDialog){
  }

  ngOnInit(): void {
  }

  selectionChange($event: any) {
    this.profileSet.set($event.option.value, !this.profileSet.get($event.option.value));
  }

  sendFriendRequest(){
    // if(this.profileSet.size == 0){
    //   Materialize.toast("Select atleast one person.", 1000, "red");
    //   return ;
    // }

    this.profileSet.set(this.profileContents[0]?.candidate_id?._id, true);
    this._candidateService.connectWithMultipleUsers(this.profileSet).subscribe((res) => {
      Materialize.toast("Friend requestes are sended", 1000, "green");
      if(this.step == 1){
        this.nextStep(2);
        return ;
      }else if(this.step == 2){
        this.thanksUser();
      }
      this.closeEM.emit(true);
    }, (err) => {
    });
  }

  thanksUser(){
    const dialogMessageRef = this._dialog.open(DialogMessageComponent,{
      data: {
        dialogType : "goodJob",
        dialogTitle : "Thanks",
        dialogText : "Good job for starting to build your network and unlocking opportunities with your favorite companies",
        btns : {"cancel" : "Close"}
      }
    });

    dialogMessageRef.afterClosed().subscribe(result => {
      if(result){
      }
    });
  }

  changeLogo(notify){
    notify.showCreatedLogo = true;
  }

  nextStep(step){
    this.nextEM.emit({step : step, profileSet : this.profileSet});
  }

  getStep(step){
    return this.step == step ? true : false;
  }

}
