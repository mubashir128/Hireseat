import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionrulesComponent } from './auctionrules.component';

describe('AuctionrulesComponent', () => {
  let component: AuctionrulesComponent;
  let fixture: ComponentFixture<AuctionrulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuctionrulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionrulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
