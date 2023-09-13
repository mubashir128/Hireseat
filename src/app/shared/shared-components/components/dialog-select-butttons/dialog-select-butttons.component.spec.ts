import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSelectButttonsComponent } from './dialog-select-butttons.component';

describe('DialogSelectButttonsComponent', () => {
  let component: DialogSelectButttonsComponent;
  let fixture: ComponentFixture<DialogSelectButttonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSelectButttonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSelectButttonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
