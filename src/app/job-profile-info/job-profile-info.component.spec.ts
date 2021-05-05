import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { JobProfileInfoComponent } from './job-profile-info.component';

describe('JobProfileInfoComponent', () => {
  let component: JobProfileInfoComponent;
  let fixture: ComponentFixture<JobProfileInfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ JobProfileInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobProfileInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
