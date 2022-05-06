import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CandidateService } from 'src/app/_services/candidate.service';
import { AbstractDialogComponent } from '../abstract-dialog.component';

declare var jQuery;
declare var Materialize;

@Component({
  selector: 'app-dialog-select-to-add-friends',
  templateUrl: './dialog-select-to-add-friends.component.html',
  styleUrls: ['./dialog-select-to-add-friends.component.css']
})
export class DialogSelectToAddFriendsComponent extends AbstractDialogComponent implements OnInit {

  users : any[];
  profileContents : any[];
  selectedList: any = [];

  profileSet = new Map();

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogSelectToAddFriendsComponent, 
    public dialog: MatDialog, 
    public dialogRef: MatDialogRef<DialogSelectToAddFriendsComponent>, 
    protected _candidateService: CandidateService
  ){
    super(data, dialogRef);
  }

  ngOnInit(): void {
    this.getTopProfiles();
  }

  getTopProfiles(){
    this._candidateService.getCandidateSharedProfiles().subscribe((res) => {
      if(res){
        this.profileContents = res;
      }
    }, err=>{
    });
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
      this.dialogRef.close();
    }, (err) => {
    });
  }

  changeLogo(notify){
    notify.showCreatedLogo = true;
  }

}
