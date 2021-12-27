import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogGroupMembersComponent } from './dialog-group-members.component';

describe('DialogGroupMembersComponent', () => {
  let component: DialogGroupMembersComponent;
  let fixture: ComponentFixture<DialogGroupMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogGroupMembersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogGroupMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
