import { Component, OnInit, Input, ElementRef, ViewChild } from "@angular/core";
import { JobProfile, IJobProfile } from "../../models/job-profile";
import { UserService } from "../../_services/user.service";
import { AuthenticationService } from "../../_services/authentication.service";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { BiddingEventService } from "../../_services/bidding-event.service";
import { map, filter, debounceTime, distinctUntilChanged, tap } from "rxjs/operators";
import { fromEvent } from "rxjs";

declare var jQuery: any;
declare var Materialize: any;
@Component({
  selector: "app-job-profile-list",
  templateUrl: "./job-profile-list.component.html",
  styleUrls: ["./job-profile-list.component.css"]
})
export class JobProfileListComponent implements OnInit {
  public loggedUser: any;
  public jp: JobProfile[] = [];
  public noJp: boolean = true;
  p=1;
  createdAt;
  itemsList=[1];
  searchTerm;
  search=false;
  itemsPerPage=10;
  @ViewChild('searchByName') searchByName: ElementRef;

  constructor(
    private userService: UserService,
    private authService: AuthenticationService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private bidEventService: BiddingEventService
  ) {
    this.loggedUser = this.userService.getUserData();
    if (this.loggedUser != "no") {
      let obj={
        onLoad : true,
        itemsPerPage : this.itemsPerPage
      }
      this.getJobProfilesByLimit(obj);
    } else {
      this.authService.logout();
      this.router.navigate(["login"]);
    }
  }

  ngOnInit() {
    this.spinner.show();
  }

  ngAfterViewInit() {
    this.searchTermByName();
  }

  searchTermByName(){
    fromEvent(this.searchByName.nativeElement,'keyup')
    .pipe(
      map(event=>event),
      filter(Boolean),
      debounceTime(1000),
      distinctUntilChanged(),
      tap((text) => {
        this.search = this.searchTerm === "" ? false : true;
        this.getJobProfilesByLimit({
          searchTerm : this.searchTerm,
          onLoad : this.searchTerm === "" ? true : undefined,
          itemsPerPage : this.searchTerm === "" ? this.itemsPerPage : undefined
        });
        this.resetValues();
      })
    )
    .subscribe();
  }

  resetValues(){
    this.p=1;
    this.jp=[];
    this.itemsList=[1];
    this.createdAt=null;
  }

  getJobProfilesByLimit(obj) {
    this.spinner.show();
    this.bidEventService.getJobProfilesByLimit(obj).subscribe(
      (data: JobProfile[]) => {
        if (data.length > 0) {
          this.jp=[...this.jp, ...data];
          this.createdAt=this.jp[this.jp.length-1].createdAt;
          this.noJp = false;
        }
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
        console.log(error);
      }
    );
  }

  select(item) {
    // console.log(item);
    localStorage.setItem("jp_id", item);
    this.router.navigate(["employer/edit-job-profile"]);
  }

  onSelected(jobProfile: IJobProfile) {
    //console.log(jobProfile);
  }

  handlePagination($event){
    this.p = $event;
    if (this.itemsList.indexOf($event) !== -1 && !this.search) {
      return ;
    }

    this.itemsList.push($event);

    let obj={
      createdAt : this.createdAt,
      itemsPerPage : this.itemsPerPage
    }
    this.getJobProfilesByLimit(obj);
  }

}
