import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateProfilesComponent } from './candidate-profiles.component';

describe('CandidateProfilesComponent', () => {
  let component: CandidateProfilesComponent;
  let fixture: ComponentFixture<CandidateProfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateProfilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
