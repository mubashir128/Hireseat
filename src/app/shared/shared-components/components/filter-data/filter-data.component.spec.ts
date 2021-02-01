import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FilterDataComponent } from './filter-data.component';

describe('FilterDataComponent', () => {
  let component: FilterDataComponent;
  let fixture: ComponentFixture<FilterDataComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
