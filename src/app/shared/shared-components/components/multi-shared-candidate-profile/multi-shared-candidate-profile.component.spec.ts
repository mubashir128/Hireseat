import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiSharedCandidateProfileComponent } from './multi-shared-candidate-profile.component';

describe('MultiSharedCandidateProfileComponent', () => {
  let component: MultiSharedCandidateProfileComponent;
  let fixture: ComponentFixture<MultiSharedCandidateProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiSharedCandidateProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiSharedCandidateProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
