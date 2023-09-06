import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDesiredCompaniesComponent } from './select-desired-companies.component';

describe('SelectDesiredCompaniesComponent', () => {
  let component: SelectDesiredCompaniesComponent;
  let fixture: ComponentFixture<SelectDesiredCompaniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectDesiredCompaniesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectDesiredCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
