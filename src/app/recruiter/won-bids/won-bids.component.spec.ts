import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WonBidsComponent } from './won-bids.component';

describe('WonBidsComponent', () => {
  let component: WonBidsComponent;
  let fixture: ComponentFixture<WonBidsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WonBidsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WonBidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
