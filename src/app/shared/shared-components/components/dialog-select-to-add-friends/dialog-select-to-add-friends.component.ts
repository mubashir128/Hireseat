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

  step = 1;

  suggestProfileContents : any[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogSelectToAddFriendsComponent, 
    public dialog: MatDialog, 
    public dialogRef: MatDialogRef<DialogSelectToAddFriendsComponent>, 
    protected _candidateService: CandidateService
  ){
    super(data, dialogRef);
  }

  ngOnInit(): void {
    this.getTopProfilesByDesiredComapines();
    this.getTopProfiles();
  }

  getTopProfilesByDesiredComapines(){
    this._candidateService.getCandidateSharedProfiles(true).subscribe((res) => {
      if(res){
        this.suggestProfileContents = res;
      }
      if(this.suggestProfileContents.length == 0){
        this.step = 2;
      }
    }, err=>{
    });
  }

  getTopProfiles(){
    this._candidateService.getCandidateSharedProfiles().subscribe((res) => {
      if(res){
        res.splice(1);
        this.profileContents = res;
      }
    }, err=>{
    });
  }

  closeDialog($event){
    this.dialogRef.close($event);
  }

  nextStep(object){
    this.step = object.step ? object.step : this.step;
    this.profileSet = object.profileSet ? object.profileSet : this.profileSet
  }
}
