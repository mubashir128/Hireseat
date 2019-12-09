import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterFeedbackComponent } from './recruiter-feedback.component';

describe('RecruiterFeedbackComponent', () => {
  let component: RecruiterFeedbackComponent;
  let fixture: ComponentFixture<RecruiterFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruiterFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
