import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestedPostJobsComponent } from './suggested-post-jobs.component';

describe('SuggestedPostJobsComponent', () => {
  let component: SuggestedPostJobsComponent;
  let fixture: ComponentFixture<SuggestedPostJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestedPostJobsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestedPostJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
