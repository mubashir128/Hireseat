import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobProfileInfoComponent } from './job-profile-info.component';

describe('JobProfileInfoComponent', () => {
  let component: JobProfileInfoComponent;
  let fixture: ComponentFixture<JobProfileInfoComponent>;

  beforeEach(async(() => {
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
