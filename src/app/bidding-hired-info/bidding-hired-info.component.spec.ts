import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiddingHiredInfoComponent } from './bidding-hired-info.component';

describe('BiddingHiredInfoComponent', () => {
  let component: BiddingHiredInfoComponent;
  let fixture: ComponentFixture<BiddingHiredInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiddingHiredInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiddingHiredInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
