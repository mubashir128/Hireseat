import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiddingResumesComponent } from './bidding-resumes.component';

describe('BiddingResumesComponent', () => {
  let component: BiddingResumesComponent;
  let fixture: ComponentFixture<BiddingResumesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiddingResumesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiddingResumesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
