import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateBiddingInfoComponent } from './candidate-bidding-info.component';

describe('CandidateBiddingInfoComponent', () => {
  let component: CandidateBiddingInfoComponent;
  let fixture: ComponentFixture<CandidateBiddingInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateBiddingInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateBiddingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
