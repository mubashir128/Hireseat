import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WonBidsComponent } from './won-bids.component';

describe('WonBidsComponent', () => {
  let component: WonBidsComponent;
  let fixture: ComponentFixture<WonBidsComponent>;

  beforeEach(async(() => {
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
