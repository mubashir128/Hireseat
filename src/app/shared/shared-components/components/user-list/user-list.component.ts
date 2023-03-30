import { SelectionModel } from '@angular/cdk/collections';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Sort, SortDirection } from '../sort/sort.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export class Paginator {
  constructor(
    public length: number,
    public pageSize: number,
    public pageIndex: number
  ) { }
}

export class SearchFilter {
  constructor(
    public column: string,
    public value: string
  ) { }
}

export class UserList {
  displayedColumns: string[];
  expandedElement: PeriodicElement | null;
  public dragDropEnabled: boolean = false;
  constructor(
    public dynamicColumns: string[],
    public filters: string[],
    public dataSource: MatTableDataSource<any>,
    public selection: SelectionModel<any>,
    public operations: string[],
    public paginator: Paginator,
  ) {
    // this.displayedColumns = ['select',...dynamicColumns,'action'];
  }
}

export enum actionUserType {
  user = "user",
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  listFormGroup: FormGroup;
  @Input() list: UserList;
  @Input() columnNames: any;
  @Input() type: actionUserType;

  @Output() filterEM = new EventEmitter();
  @Output() editEM = new EventEmitter();
  @Output() selectEM = new EventEmitter();

  @Output() sortEM = new EventEmitter();
  currentSort: Sort = new Sort();

  @Output() batchOptEM = new EventEmitter();
  @Output() introduceEM = new EventEmitter();

  constructor(
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.listFormGroup = this._formBuilder.group({
      column: ['', Validators.required]
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    const previousIndex = this.list.dataSource.data.findIndex(row => row === event.item.data);
    moveItemInArray(this.list.dataSource.data, previousIndex, event.currentIndex);
    this.list.dataSource.data = this.list.dataSource.data.slice();
    // this.orderEM.emit();
  }

  filterActive(column: string) {
    return this.list.filters.includes(column);
  }

  sortTable(column: string) {
    this.currentSort.column = column;
    this.currentSort.sortDirection = this.currentSort.sortDirection == SortDirection.asc ? SortDirection.desc : SortDirection.asc;
    this.sortEM.emit(this.currentSort);
  }

  onFilterChange(column: string, searchValue: string) {
    this.filterEM.emit(new SearchFilter(column, searchValue));
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.list.selection.selected.length;
    const numRows = this.list.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.list.selection.clear() :
      this.list.dataSource.data.forEach(row => this.list.selection.select(row));
    this.batchOptEM.emit(this.isAllSelected());
  }

  singleSelection(row) {
    let isSingleItemSelected: boolean = false;
    this.list.selection.toggle(row);
    this.list.dataSource.data.forEach(row => {
      this.list.selection.isSelected(row) ? isSingleItemSelected = true : null;
    });
    this.batchOptEM.emit(isSingleItemSelected);
  }

  getTitle(column: string) {
    return this.columnNames && this.columnNames[column] ? this.columnNames[column] : column;
  }

  introduce() {
    this.introduceEM.emit();
  }
}
