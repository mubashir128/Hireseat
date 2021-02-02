import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RecruiterNavbarComponent } from './recruiter-navbar.component';

describe('RecruiterNavbarComponent', () => {
  let component: RecruiterNavbarComponent;
  let fixture: ComponentFixture<RecruiterNavbarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruiterNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
