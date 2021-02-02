import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserCalendarComponent } from './user-calendar.component';

describe('UserCalendarComponent', () => {
  let component: UserCalendarComponent;
  let fixture: ComponentFixture<UserCalendarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
