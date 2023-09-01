import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectJobTitleComponent } from './select-job-title.component';

describe('SelectJobTitleComponent', () => {
  let component: SelectJobTitleComponent;
  let fixture: ComponentFixture<SelectJobTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectJobTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectJobTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
