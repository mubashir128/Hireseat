import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from '@angular/material/dialog';
import { AbstractDialogComponent } from '../abstract-dialog.component';

declare var Materialize;

@Component({
  selector: 'app-dialog-share-to-users',
  templateUrl: './dialog-share-to-users.component.html',
  styleUrls: ['./dialog-share-to-users.component.css']
})
export class DialogShareToUsersComponent extends AbstractDialogComponent implements OnInit {

  loggedUser: any;

  topRecruiters: any[];
  finalRecruitersAre: any[];
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogShareToUsersComponent, public dialog: MatDialog, public dialogRef: MatDialogRef<DialogShareToUsersComponent>){
    super(data, dialogRef);
    if(data){
      this.loggedUser = this.data.loggedUser;
      this.topRecruiters = this.data.topRecruiters;
      this.finalRecruitersAre = this.data.finalRecruitersAre;
    }
  }

  ngOnInit(): void {
  }

  handleTopSelected($event,type){
    if($event.target.checked){
      this.finalRecruitersAre.push($event.target.name);
    }else{
      this.finalRecruitersAre.map((item, index)=>{
        if(item === $event.target.name){
          this.finalRecruitersAre.splice(index, 1);
        }
      });
    }
  }

  shareToUsers(){
    this.dialogRef.close({
      type : "shareToUsers",
      process : true,
      finalRecruitersAre : this.finalRecruitersAre
    });
  }
}
