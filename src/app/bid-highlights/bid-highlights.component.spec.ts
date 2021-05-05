import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BidHighlightsComponent } from './bid-highlights.component';

describe('BidHighlightsComponent', () => {
  let component: BidHighlightsComponent;
  let fixture: ComponentFixture<BidHighlightsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BidHighlightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BidHighlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
