import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RecruiterQuestionComponent } from './recruiter-question.component';

describe('RecruiterQuestionComponent', () => {
  let component: RecruiterQuestionComponent;
  let fixture: ComponentFixture<RecruiterQuestionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruiterQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
