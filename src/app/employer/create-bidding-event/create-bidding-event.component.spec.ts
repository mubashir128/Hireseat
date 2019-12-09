import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBiddingEventComponent } from './create-bidding-event.component';

describe('CreateBiddingEventComponent', () => {
  let component: CreateBiddingEventComponent;
  let fixture: ComponentFixture<CreateBiddingEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBiddingEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBiddingEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
