import { Component, OnInit, Input } from '@angular/core';

export enum SortDirection {
  asc = 'asc',
  desc = 'desc',
}

export class Sort {
  public column: string;
  public sortDirection: SortDirection = SortDirection.desc
}


@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.css']
})
export class SortComponent implements OnInit {

  @Input() column: string;
  @Input() sortColumn: string;
  @Input() sortDirection: SortDirection;

  eSortDirection = SortDirection;

  constructor() { }

  ngOnInit() {
  }

}
