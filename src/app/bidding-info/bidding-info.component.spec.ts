import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiddingInfoComponent } from './bidding-info.component';

describe('BiddingInfoComponent', () => {
  let component: BiddingInfoComponent;
  let fixture: ComponentFixture<BiddingInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiddingInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiddingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
