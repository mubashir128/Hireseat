import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntrosToCompaniesComponent } from './intros-to-companies.component';

describe('IntrosToCompaniesComponent', () => {
  let component: IntrosToCompaniesComponent;
  let fixture: ComponentFixture<IntrosToCompaniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntrosToCompaniesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntrosToCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
