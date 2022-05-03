import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSelectToAddFriendsComponent } from './dialog-select-to-add-friends.component';

describe('DialogSelectToAddFriendsComponent', () => {
  let component: DialogSelectToAddFriendsComponent;
  let fixture: ComponentFixture<DialogSelectToAddFriendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSelectToAddFriendsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSelectToAddFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
