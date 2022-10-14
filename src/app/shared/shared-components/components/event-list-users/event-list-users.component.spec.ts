import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventListUsersComponent } from './event-list-users.component';

describe('EventListUsersComponent', () => {
  let component: EventListUsersComponent;
  let fixture: ComponentFixture<EventListUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventListUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventListUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
