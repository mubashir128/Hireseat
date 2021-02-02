import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SharedCandidateProfilesComponent } from './shared-candidate-profiles.component';

describe('SharedCandidateProfilesComponent', () => {
  let component: SharedCandidateProfilesComponent;
  let fixture: ComponentFixture<SharedCandidateProfilesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedCandidateProfilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedCandidateProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
