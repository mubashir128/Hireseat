import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterCandidateBidingInfoComponent } from './recruiter-candidate-biding-info.component';

describe('RecruiterCandidateBidingInfoComponent', () => {
  let component: RecruiterCandidateBidingInfoComponent;
  let fixture: ComponentFixture<RecruiterCandidateBidingInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecruiterCandidateBidingInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterCandidateBidingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
