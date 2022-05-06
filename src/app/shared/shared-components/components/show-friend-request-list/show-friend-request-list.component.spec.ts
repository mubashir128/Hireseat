import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFriendRequestListComponent } from './show-friend-request-list.component';

describe('ShowFriendRequestListComponent', () => {
  let component: ShowFriendRequestListComponent;
  let fixture: ComponentFixture<ShowFriendRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowFriendRequestListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowFriendRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
