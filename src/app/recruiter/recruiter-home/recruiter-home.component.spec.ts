import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RecruiterHomeComponent } from './recruiter-home.component';

describe('RecruiterHomeComponent', () => {
  let component: RecruiterHomeComponent;
  let fixture: ComponentFixture<RecruiterHomeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruiterHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
