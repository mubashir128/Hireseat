import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BiddingEventItemComponent } from './bidding-event-item.component';

describe('BiddingEventItemComponent', () => {
  let component: BiddingEventItemComponent;
  let fixture: ComponentFixture<BiddingEventItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BiddingEventItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiddingEventItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
