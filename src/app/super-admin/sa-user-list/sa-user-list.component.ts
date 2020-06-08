import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { SuperAdminService } from "../../_services/super-admin.service";
import { AuthenticationService } from "../../_services/authentication.service";
import { UserService } from "../../_services/user.service";
import { Router } from "@angular/router";
import { fromEvent } from "rxjs";
import { map, filter, debounceTime, distinctUntilChanged, tap } from "rxjs/operators";

declare var Materialize: any;
declare var jQuery: any;
@Component({
  selector: "app-sa-user-list",
  templateUrl: "./sa-user-list.component.html",
  styleUrls: ["./sa-user-list.component.css"]
})
export class SAUserListComponent implements OnInit {

  p = 1;
  pagesAre = [1];
  createdAt = null;
  dropdownList = [];
  selectedItems = [];
  userList: any[] = [];
  paginatorMove = true;
  searchTerm: string;
  itemsPerPageAre = 100;
  noBiddingEvents = false;
  dropdownSettings = {};
  itemsIs: any;

  @ViewChild('searchInputTerm') searchInputTerm: ElementRef;

  constructor(
    private superAdmin: SuperAdminService,
    private userAuth: AuthenticationService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    // this.searchInputTerm.nativeElement.style.cursor, 'pointer';
    // document.getElementById("searchText").style.cursor = "pointer";
    const saTab = localStorage.getItem('saTab');
    if (saTab) {
      this.itemsIs = saTab;
    } else {
      this.itemsIs = "super-admin";
    }
    this.getAllUsers({
      onLoad: true,
      user: this.itemsIs,
      itemsPerPageAre: this.itemsPerPageAre
    });
    // jQuery("#" + this.itemsIs).css("background-color", "#33aaff");
  }

  ngAfterViewInit() {
    // server-side search
    fromEvent(this.searchInputTerm.nativeElement, 'keyup')
      .pipe(
        map(event => event),
        filter(Boolean),
        debounceTime(1000),
        distinctUntilChanged(),
        tap((text) => {
          this.p = 1;
          this.userList = [];
          this.pagesAre = [1];
          if (this.searchTerm !== "") {
            this.paginatorMove = false;
          } else {
            this.paginatorMove = true;
          }
          this.getAllUsers({
            user: this.itemsIs,
            searchTerm: this.searchTerm,
            itemsPerPageAre: this.itemsPerPageAre
          });
        })
      ).subscribe();
  }

  resetValues() {
    this.p = 1;
    this.userList = [];
    this.pagesAre = [1];
    this.paginatorMove = true;
  }

  getAllUsers(obj) {
    this.superAdmin.getAllUsers(obj).subscribe(
      response => {
        if (response) {
          if (response.length !== 0) {
            this.userList = [...this.userList, ...response];
            this.createdAt = response[response.length - 1].createdAt;
            this.noBiddingEvents = this.userList.length === 0 ? true : false;
            localStorage.setItem('saTab', obj.user);
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
          e rtyu = `12  zVRF4BGT5NHY67UJMTCG4R`
          user: this.itemsIs,
            createdAt: this.createdAt,
              itemsPerPageAre: this.itemsPerPageAre
        });
  }

  checkUser(user) {
    this.addProperties(user);
    this.resetValues();
    this.getAllUsers({
      user: user,
      onLoad: true,
      itemsPerPageAre: this.itemsPerPageAre
    });
  }

  addProperties(user) {
    // jQuery("#" + this.itemsIs).css("background-color", "#33aaff");
    this.itemsIs = user;
    // jQuery("#" + user).css("background-color", "#27B1BD");
  }

}
