import { Component, OnInit, Input, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { map, startWith, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { JobTitleService } from 'src/app/_services/job-title.service';
import { DesiredCompaniesService } from 'src/app/_services/desired-companies.service';

enum ModuleMode {
  multiple = 'multiple',
  single = 'single'
}

@Component({
  selector: 'app-select-desired-companies',
  templateUrl: './select-desired-companies.component.html',
  styleUrls: ['./select-desired-companies.component.css']
})
export class SelectDesiredCompaniesComponent implements OnInit {

  @Input() mode: ModuleMode;
  desiredCompaniesLists = [];
  desiredCompaniesControl = new FormControl();
  filteredOptions: Observable<any>;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild('desiredCompaniesInput') desiredCompaniesInput: ElementRef<HTMLInputElement>;

  constructor(
    public _desiredCompaniesService: DesiredCompaniesService
  ) {
    this.mode = this.mode ? this.mode : ModuleMode.multiple;
    this.filteredOptions = this.desiredCompaniesControl.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(val => {
        return this.filter(val || '')
      })
    );
  }

  ngOnInit(): void {
  }

  @Input()
  get desiredCompaniesAre() {
    return this.desiredCompaniesLists;
  }

  set desiredCompaniesAre(val) {
    this.desiredCompaniesLists = val;
  }

  getOptionText(option) {
    return option ? option.name : null;
  }

  add(event: MatChipInputEvent): void {
    console.log(event);
    const value = (event.value || '').trim();
    if (value) {
      if (this.mode == ModuleMode.multiple) {
        this.desiredCompaniesLists.push(value);
      } else {
        this.desiredCompaniesLists[0] = value;
      }
    }
    event.input.value = '';
    this.desiredCompaniesControl.setValue(null);
  }

  filter(val: any): Observable<any[]> {
    if (typeof val === 'string' || val instanceof String) {
      let searchFilters = new Map();
      searchFilters.set("name", val);
      return this._desiredCompaniesService.getDesiredCompanies().pipe(map((data: any) => data.filter(option => {
        let result = option.name.toLowerCase().indexOf(val.toLowerCase()) === 0;
        return result;
      }))
      );
    } else {
      return this.filteredOptions;
    }
  }

  desiredCompaniesSelected(option: any) {
    if (this.mode == ModuleMode.multiple && this.desiredCompaniesLists) {
      this.desiredCompaniesLists.push(option.value.name);
    }
    else {
      this.desiredCompaniesLists = [option.value.name];
    }

    this.desiredCompaniesInput.nativeElement.value = '';
    this.desiredCompaniesControl.setValue(null);
  }

  remove(jobTitle: any): void {
    const index = this.desiredCompaniesLists.indexOf(jobTitle);
    if (index >= 0) {
      this.desiredCompaniesLists.splice(index, 1);
    }
  }

}
