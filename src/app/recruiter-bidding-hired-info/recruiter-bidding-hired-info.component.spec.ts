import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterBiddingHiredInfoComponent } from './recruiter-bidding-hired-info.component';

describe('RecruiterBiddingHiredInfoComponent', () => {
  let component: RecruiterBiddingHiredInfoComponent;
  let fixture: ComponentFixture<RecruiterBiddingHiredInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruiterBiddingHiredInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterBiddingHiredInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
