import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogInputTextMessageComponent } from './dialog-input-text-message.component';

describe('DialogInputTextMessageComponent', () => {
  let component: DialogInputTextMessageComponent;
  let fixture: ComponentFixture<DialogInputTextMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogInputTextMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogInputTextMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
