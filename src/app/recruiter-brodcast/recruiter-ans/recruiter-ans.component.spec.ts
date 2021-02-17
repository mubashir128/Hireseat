import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterAnsComponent } from './recruiter-ans.component';

describe('RecruiterAnsComponent', () => {
  let component: RecruiterAnsComponent;
  let fixture: ComponentFixture<RecruiterAnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecruiterAnsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterAnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
