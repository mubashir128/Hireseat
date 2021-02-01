import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RecruterBiddingInfoComponent } from './recruter-bidding-info.component';

describe('RecruterBiddingInfoComponent', () => {
  let component: RecruterBiddingInfoComponent;
  let fixture: ComponentFixture<RecruterBiddingInfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruterBiddingInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruterBiddingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
