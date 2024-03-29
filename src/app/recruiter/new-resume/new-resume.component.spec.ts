import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NewResumeComponent } from './new-resume.component';

describe('NewResumeComponent', () => {
  let component: NewResumeComponent;
  let fixture: ComponentFixture<NewResumeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NewResumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
