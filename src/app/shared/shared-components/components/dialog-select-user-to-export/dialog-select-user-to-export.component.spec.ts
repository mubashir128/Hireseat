import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSelectUserToExportComponent } from './dialog-select-user-to-export.component';

describe('DialogSelectUserToExportComponent', () => {
  let component: DialogSelectUserToExportComponent;
  let fixture: ComponentFixture<DialogSelectUserToExportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSelectUserToExportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSelectUserToExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
