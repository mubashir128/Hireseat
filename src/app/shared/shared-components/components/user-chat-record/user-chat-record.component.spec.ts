import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserChatRecordComponent } from './user-chat-record.component';

describe('UserChatRecordComponent', () => {
  let component: UserChatRecordComponent;
  let fixture: ComponentFixture<UserChatRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserChatRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserChatRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
