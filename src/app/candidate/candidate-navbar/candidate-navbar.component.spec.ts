import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CandidateNavbarComponent } from './candidate-navbar.component';

describe('CandidateNavbarComponent', () => {
  let component: CandidateNavbarComponent;
  let fixture: ComponentFixture<CandidateNavbarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
