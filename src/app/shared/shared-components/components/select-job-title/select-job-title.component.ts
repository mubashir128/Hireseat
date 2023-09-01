import { Component, OnInit, Input, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { map, startWith, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { JobTitleService } from 'src/app/_services/job-title.service';

enum ModuleMode {
  multiple = 'multiple',
  single = 'single'
}

@Component({
  selector: 'app-select-job-title',
  templateUrl: './select-job-title.component.html',
  styleUrls: ['./select-job-title.component.css']
})
export class SelectJobTitleComponent implements OnInit {

  @Input() mode: ModuleMode;
  jobTitleLists = [];
  jobTitleControl = new FormControl();
  filteredOptions: Observable<any>;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild('jobTitleInput') jobTitleInput: ElementRef<HTMLInputElement>;

  constructor(
    public _jobTitleService: JobTitleService
  ) {
    this.mode = this.mode ? this.mode : ModuleMode.multiple;
    this.filteredOptions = this.jobTitleControl.valueChanges.pipe(
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
  get jobTitleAre() {
    return this.jobTitleLists;
  }

  set jobTitleAre(val) {
    this.jobTitleLists = val;
  }

  getOptionText(option) {
    return option ? option.name : null;
  }

  add(event: MatChipInputEvent): void {
    console.log(event);
    const value = (event.value || '').trim();
    if (value) {
      if (this.mode == ModuleMode.multiple) {
        this.jobTitleLists.push(value);
      } else {
        this.jobTitleLists[0] = value;
      }
    }
    event.input.value = '';
    this.jobTitleControl.setValue(null);
  }

  filter(val: any): Observable<any[]> {
    if (typeof val === 'string' || val instanceof String) {
      let searchFilters = new Map();
      searchFilters.set("name", val);
      return this._jobTitleService.getJobTitles().pipe(map((data: any) => data.filter(option => {
        let result = option.name.toLowerCase().indexOf(val.toLowerCase()) === 0;
        return result;
      }))
      );
    } else {
      return this.filteredOptions;
    }
  }

  jobTitleSelected(option: any) {
    if (this.mode == ModuleMode.multiple && this.jobTitleLists) {
      this.jobTitleLists.push(option.value.name);
    }
    else {
      this.jobTitleLists = [option.value.name];
    }

    this.jobTitleInput.nativeElement.value = '';
    this.jobTitleControl.setValue(null);
  }

  remove(jobTitle: any): void {
    const index = this.jobTitleLists.indexOf(jobTitle);
    if (index >= 0) {
      this.jobTitleLists.splice(index, 1);
    }
  }
}
