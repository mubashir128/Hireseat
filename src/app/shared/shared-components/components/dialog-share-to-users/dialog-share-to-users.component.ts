import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from '@angular/material/dialog';
import { fromEvent } from 'rxjs';
import { AbstractDialogComponent } from '../abstract-dialog.component';
import {
  map,
  filter,
  debounceTime,
  distinctUntilChanged,
  tap,
} from "rxjs/operators";
import { BiddingEventService } from 'src/app/_services/bidding-event.service';

declare var jQuery;

@Component({
  selector: 'app-dialog-share-to-users',
  templateUrl: './dialog-share-to-users.component.html',
  styleUrls: ['./dialog-share-to-users.component.css']
})
export class DialogShareToUsersComponent extends AbstractDialogComponent implements OnInit, AfterViewInit {

  loggedUser: any;

  topRecruiters: any[];
  allTopRecruiters: any[];
  finalRecruitersAre: any[];

  searchTermByNameIs: string = "";

  @ViewChild('searchInputTerm') searchInputTerm: ElementRef;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogShareToUsersComponent, 
  public dialog: MatDialog, 
  public dialogRef: MatDialogRef<DialogShareToUsersComponent>,
  protected _bidEventService: BiddingEventService
  ){
    super(data, dialogRef);
    if(data){
      this.loggedUser = this.data.loggedUser;
      this.topRecruiters = this.data.topRecruiters;
      this.allTopRecruiters = this.topRecruiters;
      this.finalRecruitersAre = this.data.finalRecruitersAre;
    }
  }

  ngOnInit(): void {
  }
  
  ngAfterViewInit(){
    this.searchDebouce();
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

  searchDebouce(){
    // server-side search
    fromEvent(this.searchInputTerm.nativeElement,'keyup')
    .pipe(
      map(event=>event),
      filter(Boolean),
      debounceTime(1000),
      distinctUntilChanged(),
      tap((text) => {
        this.getRecruiterList({
          searchTerm : this.searchTermByNameIs,
          userRole : this.loggedUser.userRole
        });
      })
    ).subscribe();
  }

  getRecruiterList(obj){
    if(obj.searchTerm === '' || obj.searchTerm === undefined){
      this.topRecruiters = this.allTopRecruiters;
      return ;
    }

    this._bidEventService.getRecruiterList(obj).subscribe(res=>{
      jQuery(".searchData").scrollTop(0);
      if(res.length !== 0 ){
        this.topRecruiters = res;
      }else{
        this.topRecruiters = this.allTopRecruiters;
      }
    },err=>{
      console.log(err);
    });
  }

}
