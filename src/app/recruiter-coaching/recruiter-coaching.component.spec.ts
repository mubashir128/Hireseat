import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterCoachingComponent } from './recruiter-coaching.component';

describe('RecruiterCoachingComponent', () => {
  let component: RecruiterCoachingComponent;
  let fixture: ComponentFixture<RecruiterCoachingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruiterCoachingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterCoachingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
