import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RecruiterBiddingInterviewInfoComponent } from './recruiter-bidding-interview-info.component';

describe('RecruiterBiddingInterviewInfoComponent', () => {
  let component: RecruiterBiddingInterviewInfoComponent;
  let fixture: ComponentFixture<RecruiterBiddingInterviewInfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruiterBiddingInterviewInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterBiddingInterviewInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
