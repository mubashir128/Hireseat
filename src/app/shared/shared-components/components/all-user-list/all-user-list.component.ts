import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConstantsService } from 'src/app/_services/constants.service';
import { UserService } from 'src/app/_services/user.service';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';

declare var jQuery;
declare var Materialize;

export interface UsersData {
  fullName: string;
  email: number;
}

@Component({
  selector: 'app-all-user-list',
  templateUrl: './all-user-list.component.html',
  styleUrls: ['./all-user-list.component.css']
})
export class AllUserListComponent implements OnInit {
  title: string = "";
  type: string = "";
  displayedColumns: string[] = ['action', 'fullName', 'email', 'status', 'createdAt'];
  dataSource;

  constructor(
    private _route: ActivatedRoute,
    private _userService: UserService,
    protected _dialog: MatDialog,
    private _spinner: NgxSpinnerService,
    private _constants: ConstantsService
  ) { }

  ngOnInit(): void {
    this._route.queryParams.subscribe(params => {
      this.type = params.type;
    });
    this.title = (this.type == this._constants.pendingCandidates) ? "Pending Candidates" : "";
    this.getTypeUsers(this.type);
  }

  getTypeUsers(type){
    let promises = this._userService.getTypeUsers(type).toPromise();
    promises.then(result=>{
      this.dataSource = result;
    });
  }

  delete(element){
    const dialogDeleteRef = this._dialog.open(DialogDeleteComponent,{
      data: {
        dialogType : "ConfirmDeleteAction",
        dialogTitle : "Confirm Delete Action",
        dialogText : "Are want to sure delete this user-" + element.fullName + " ?"
      }
    });

    dialogDeleteRef.afterClosed().subscribe(result => {
      if(result && result.process){
        this._spinner.show();
        let promises = this._userService.deleteParticularUser(element._id).toPromise();
        promises.then(result2=>{
          this.getTypeUsers(this.type);
          this._spinner.hide();
          Materialize.toast("User deleted successfully", 1000, "green");
        }).catch((err)=>{
          this._spinner.hide();
        });
      }
    });
  }

}
