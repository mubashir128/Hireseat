import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BiddingInterviewInfoComponent } from './bidding-interview-info.component';

describe('BiddingInterviewInfoComponent', () => {
  let component: BiddingInterviewInfoComponent;
  let fixture: ComponentFixture<BiddingInterviewInfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BiddingInterviewInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiddingInterviewInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
