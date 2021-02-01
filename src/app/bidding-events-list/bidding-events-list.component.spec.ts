import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BiddingEventsListComponent } from './bidding-events-list.component';

describe('BiddingEventsListComponent', () => {
  let component: BiddingEventsListComponent;
  let fixture: ComponentFixture<BiddingEventsListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BiddingEventsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiddingEventsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
