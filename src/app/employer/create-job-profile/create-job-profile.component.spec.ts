import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateJobProfileComponent } from './create-job-profile.component';

describe('CreateJobProfileComponent', () => {
  let component: CreateJobProfileComponent;
  let fixture: ComponentFixture<CreateJobProfileComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateJobProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateJobProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
