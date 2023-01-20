import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteUsersComponent } from './dialog-delete-users.component';

describe('DialogDeleteUsersComponent', () => {
  let component: DialogDeleteUsersComponent;
  let fixture: ComponentFixture<DialogDeleteUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDeleteUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDeleteUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
