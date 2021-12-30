import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogShareToUsersComponent } from './dialog-share-to-users.component';

describe('DialogShareToUsersComponent', () => {
  let component: DialogShareToUsersComponent;
  let fixture: ComponentFixture<DialogShareToUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogShareToUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogShareToUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
