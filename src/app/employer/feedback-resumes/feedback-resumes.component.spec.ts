import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackResumesComponent } from './feedback-resumes.component';

describe('FeedbackResumesComponent', () => {
  let component: FeedbackResumesComponent;
  let fixture: ComponentFixture<FeedbackResumesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackResumesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackResumesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
