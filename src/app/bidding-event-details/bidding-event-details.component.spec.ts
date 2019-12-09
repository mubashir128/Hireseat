import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiddingEventDetailsComponent } from './bidding-event-details.component';

describe('BiddingEventDetailsComponent', () => {
  let component: BiddingEventDetailsComponent;
  let fixture: ComponentFixture<BiddingEventDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiddingEventDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiddingEventDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
