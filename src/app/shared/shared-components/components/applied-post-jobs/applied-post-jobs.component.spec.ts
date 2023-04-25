import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliedPostJobsComponent } from './applied-post-jobs.component';

describe('AppliedPostJobsComponent', () => {
  let component: AppliedPostJobsComponent;
  let fixture: ComponentFixture<AppliedPostJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppliedPostJobsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppliedPostJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
