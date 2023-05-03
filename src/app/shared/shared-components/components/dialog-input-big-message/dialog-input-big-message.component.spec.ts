import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogInputBigMessageComponent } from './dialog-input-big-message.component';

describe('DialogInputBigMessageComponent', () => {
  let component: DialogInputBigMessageComponent;
  let fixture: ComponentFixture<DialogInputBigMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogInputBigMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogInputBigMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
