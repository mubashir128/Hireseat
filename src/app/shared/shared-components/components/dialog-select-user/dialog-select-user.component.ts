import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/_services/user.service';
import { AbstractDialogComponent } from '../abstract-dialog.component';
import { actionUserType, Paginator, SearchFilter, UserList } from '../user-list/user-list.component';

@Component({
  selector: 'app-dialog-select-user',
  templateUrl: './dialog-select-user.component.html',
  styleUrls: ['./dialog-select-user.component.css']
})
export class DialogSelectUserComponent extends AbstractDialogComponent implements OnInit {
  userList: UserList;
  searchFilters = new Map();
  actionType: actionUserType = actionUserType.user;
  columnNames = {
    'fullName': 'Full Name'
  };

  btns: any[];
  multiSelect: boolean;
  selectUserCount: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogSelectUserComponent,
    public _dialog: MatDialog,
    public _dialogRef: MatDialogRef<DialogSelectUserComponent>,
    private _userService: UserService
  ) {
    super(data, _dialogRef);
    this.btns = this.data.btns;
    this.multiSelect = this.data.multiSelect;
    this.selectUserCount = this.data.selectUserCount;
    
    this.userList = new UserList(
      ['fullName'],
      ['fullName'],
      new MatTableDataSource<any>([]),
      new SelectionModel<any>(true, []),
      [
      ],
      null
    );
    this.userList.displayedColumns = ['select', 'fullName'];
  }

  ngOnInit(): void {
    this.getUsersWithRole();
  }

  getUsersWithRole() {
    let userRole = "candidate";
    this._userService.getUsersWithRole(userRole, this.searchFilters).subscribe((data: any) => {
      this.userList.dataSource = new MatTableDataSource<any>(data.result);
      this.userList.paginator = new Paginator(data.pagination.total, data.pagination.size, data.pagination.page - 1);
    });
  }

  filterModules(searchFilter: SearchFilter) {
    this.searchFilters.set(searchFilter.column, searchFilter.value);
    this.getUsersWithRole();
  }

  batchOperations(event) {
    this.getOnlySelected();
  }

  getOnlySelected() {
    let onlySelected: any[] = [];
    this.userList.dataSource.data.forEach(row => {
      if (this.userList.selection.isSelected(row)) {
        onlySelected.push(row);
      }
    });
    return onlySelected;
  }

  getOnlySelectedUserId() {
    let onlySelected: any[] = [];
    this.userList.dataSource.data.forEach(row => {
      if (this.userList.selection.isSelected(row)) {
        onlySelected.push(row._id);
      }
    });
    return onlySelected;
  }

  introduce(event) {
    let onlySelected: any[] = this.getOnlySelectedUserId();
    this._dialogRef.close(onlySelected);
  }

  selectUsers(event) {
    let onlySelected: any[] = this.getOnlySelectedUserId();
    this._dialogRef.close(onlySelected);
  }
}
