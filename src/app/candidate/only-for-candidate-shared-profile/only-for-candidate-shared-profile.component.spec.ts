import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlyForCandidateSharedProfileComponent } from './only-for-candidate-shared-profile.component';

describe('OnlyForCandidateSharedProfileComponent', () => {
  let component: OnlyForCandidateSharedProfileComponent;
  let fixture: ComponentFixture<OnlyForCandidateSharedProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlyForCandidateSharedProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlyForCandidateSharedProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
