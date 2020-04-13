import { Component, OnInit, Input } from "@angular/core";
import { SuperAdminService } from "../../_services/super-admin.service";
import { AuthenticationService } from "../../_services/authentication.service";
import { UserService } from "../../_services/user.service";
import { Router } from "@angular/router";
import { IDropdownSettings } from 'ng-multiselect-dropdown';

declare var Materialize: any;
@Component({
  selector: "app-sa-user-list",
  templateUrl: "./sa-user-list.component.html",
  styleUrls: ["./sa-user-list.component.css"]
})
export class SAUserListComponent implements OnInit {

  p = 1;
  userList: any[];
  itemsPerPageAre = 10;
  noBiddingEvents=false;
  private _searchTerm : any;

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  itemsAre = [];
  constructor(
    private superAdmin: SuperAdminService,
    private userAuth: AuthenticationService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllUsers({list : this.selectedItems});
    this.dropdownListForUsers();
  }

  dropdownListForUsers(){
    this.dropdownList = [
      { item_id: 1, item_text: 'super-admin' },
      { item_id: 2, item_text: 'recruiter' },
      { item_id: 3, item_text: 'employer' },
      { item_id: 4, item_text: 'admin' },
      { item_id: 5, item_text: 'enterprise' }
    ];
    
    this.selectedItems=[...this.dropdownList];
    this.itemsAre=["super-admin","recruiter","employer","admin","enterprise"];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: false
    };
  }

  onItemSelect(item : any) {
    this.itemsAre.push(item.item_text);
    this.getAllUsers({
      list : this.itemsAre
    });
  }

  onItemDeSelect(item: any){
    let index=this.itemsAre.indexOf(item.item_text);
    this.itemsAre.splice(index,1);
    this.getAllUsers({
      list : this.itemsAre
    });
  }

  onSelectAll(items: any) {
    this.itemsAre=[];
    items.map(item=>{
      this.itemsAre.push(item.item_text);
    });
    this.getAllUsers({
      list : this.itemsAre
    });
  }

  onDeSelectAll(items: any) {
    this.itemsAre=[];
    this.getAllUsers({
      list : this.itemsAre
    });
  }

  getAllUsers(obj) {
    this.superAdmin.getAllUsers(obj).subscribe(
      response => {
        if (response) {
          this.userList = response;
          this.noBiddingEvents = this.userList.length === 0 ? true : false;
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

  get searchTerm(){
    return this._searchTerm;
  }

  set searchTerm(value){
    this._searchTerm=value;
    this.itemsPerPageAre = this._searchTerm === "" ? 5 : 100;
  }

}
