import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateQuestionComponent } from './candidate-question.component';

describe('CandidateQuestionComponent', () => {
  let component: CandidateQuestionComponent;
  let fixture: ComponentFixture<CandidateQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
