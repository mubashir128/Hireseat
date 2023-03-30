import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSelectUserComponent } from './dialog-select-user.component';

describe('DialogSelectUserComponent', () => {
  let component: DialogSelectUserComponent;
  let fixture: ComponentFixture<DialogSelectUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSelectUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSelectUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
