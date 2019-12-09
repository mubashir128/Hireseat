import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateJobProfileComponent } from './create-job-profile.component';

describe('CreateJobProfileComponent', () => {
  let component: CreateJobProfileComponent;
  let fixture: ComponentFixture<CreateJobProfileComponent>;

  beforeEach(async(() => {
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
