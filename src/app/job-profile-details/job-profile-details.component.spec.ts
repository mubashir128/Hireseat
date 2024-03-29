import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { JobProfileDetailsComponent } from './job-profile-details.component';

describe('JobProfileDetailsComponent', () => {
  let component: JobProfileDetailsComponent;
  let fixture: ComponentFixture<JobProfileDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ JobProfileDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobProfileDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
