import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedCandidateProfilesComponent } from './shared-candidate-profiles.component';

describe('SharedCandidateProfilesComponent', () => {
  let component: SharedCandidateProfilesComponent;
  let fixture: ComponentFixture<SharedCandidateProfilesComponent>;

  beforeEach(async(() => {
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
