import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CandidateHomeComponent } from './candidate-home.component';

describe('CandidateHomeComponent', () => {
  let component: CandidateHomeComponent;
  let fixture: ComponentFixture<CandidateHomeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
