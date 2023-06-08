import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOnlyTextMessageComponent } from './dialog-only-text-message.component';

describe('DialogOnlyTextMessageComponent', () => {
  let component: DialogOnlyTextMessageComponent;
  let fixture: ComponentFixture<DialogOnlyTextMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogOnlyTextMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogOnlyTextMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
