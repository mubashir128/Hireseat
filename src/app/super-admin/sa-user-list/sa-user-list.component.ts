import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { SuperAdminService } from "../../_services/super-admin.service";
import { AuthenticationService } from "../../_services/authentication.service";
import { UserService } from "../../_services/user.service";
import { Router } from "@angular/router";
import { fromEvent } from "rxjs";
import { map, filter, debounceTime, distinctUntilChanged, tap } from "rxjs/operators";

declare var Materialize: any;
@Component({
  selector: "app-sa-user-list",
  templateUrl: "./sa-user-list.component.html",
  styleUrls: ["./sa-user-list.component.css"]
})
export class SAUserListComponent implements OnInit {

  p = 1;
  pagesAre=[1];
  createdAt=null;
  dropdownList = [];
  selectedItems = [];
  userList: any[]=[];
  paginatorMove=true;
  searchTerm : string;
  itemsPerPageAre = 100;
  noBiddingEvents=false;
  dropdownSettings = {};
  itemsAre = ["super-admin"];
  @ViewChild('searchInputTerm') searchInputTerm: ElementRef;

  constructor(
    private superAdmin: SuperAdminService,
    private userAuth: AuthenticationService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllUsers({
      onLoad : true,
      list : this.itemsAre,
      itemsPerPageAre : this.itemsPerPageAre
    });
    this.dropdownListForUsers();
  }

  ngAfterViewInit() {
    // server-side search
    fromEvent(this.searchInputTerm.nativeElement,'keyup')
    .pipe(
      map(event=>event),
      filter(Boolean),
      debounceTime(1000),
      distinctUntilChanged(),
      tap((text) => {
        this.p=1;
        this.userList=[];
        this.pagesAre=[1];
        if(this.searchTerm !== ""){
          this.paginatorMove=false;
        }else{
          this.paginatorMove=true;
        }
        this.getAllUsers({
          list : this.itemsAre,
          searchTerm : this.searchTerm,
          itemsPerPageAre : this.itemsPerPageAre
        });
      })
    ).subscribe();
  }

  dropdownListForUsers(){
    this.dropdownList = [
      { item_id: 1, item_text: 'super-admin' },
      { item_id: 2, item_text: 'recruiter' },
      { item_id: 3, item_text: 'employer' },
      { item_id: 4, item_text: 'admin' },
      { item_id: 5, item_text: 'enterprise' }
    ];
    
    this.selectedItems=[{ item_id: 1, item_text: 'super-admin' }];

    this.dropdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      itemsShowLimit: 1,
      allowSearchFilter: false
    };
  }

  onItemSelect(item : any) {
    this.itemsAre=[];
    this.resetValues();
    this.itemsAre.push(item.item_text);
    this.getAllUsers({
      onLoad : true,
      list : this.itemsAre,
      itemsPerPageAre : this.itemsPerPageAre
    });
  }

  onItemDeSelect(item: any){
    this.resetValues();
    this.itemsAre=["super-admin"];
    this.selectedItems=[{ item_id: 1, item_text: 'super-admin' }];
    this.getAllUsers({
      onLoad : true,
      list : this.itemsAre,
      itemsPerPageAre : this.itemsPerPageAre
    });
  }

  resetValues(){
    this.p=1;
    this.userList=[];
    this.pagesAre=[1];
    this.paginatorMove=true;
  }

  getAllUsers(obj) {
    this.superAdmin.getAllUsers(obj).subscribe(
      response => {
        if (response) {
          if(response.length !== 0){
            this.userList = [...this.userList,...response];
            this.createdAt=response[response.length-1].createdAt;
            this.noBiddingEvents=this.userList.length ===0 ? true : false;
          }
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  loginUser(userEmail) {
    localStorage.setItem(
      "super-admin-email",
      this.userService.getUserData().email
    );
    this.userAuth.logoutWithoutNavigate();
    /* localStorage.removeItem('super-admin-email'); */
    this.superAdmin.unSecureLogin({ email: userEmail }).subscribe(
      response => {
        if (response) {
          if (response.userInfo.userRole == "employer") {
            this.router.navigate(["employer/bidding-event-list"]);
          } else if (response.userInfo.userRole == "recruiter") {
            this.router.navigate(["recruiter/bidding-event-list"]);
          } else if (response.userInfo.userRole == "admin") {
            this.router.navigate(["user-list"]);
          } else if (response.userInfo.userRole == "super-admin") {
            this.router.navigate(["super-admin/user-list"]);
          } else if (response.userInfo.userRole == "enterprise") {
            this.router.navigate(["enterprise/user-list"]);
          }
        } else {
          Materialize.toast("Enter valid details", 1000, "rounded");
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  handlePaginator($event){
    this.p=$event;
    if(!this.paginatorMove){
      return ;
    }
    if(this.pagesAre.indexOf($event) !== -1){
      return ;
    }
    this.pagesAre.push($event);
    this.getAllUsers({
      list : this.itemsAre,
      createdAt : this.createdAt,
      itemsPerPageAre : this.itemsPerPageAre
    });
  }

}
