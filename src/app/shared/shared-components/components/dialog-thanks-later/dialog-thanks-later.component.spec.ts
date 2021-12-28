import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogThanksLaterComponent } from './dialog-thanks-later.component';

describe('DialogThanksLaterComponent', () => {
  let component: DialogThanksLaterComponent;
  let fixture: ComponentFixture<DialogThanksLaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogThanksLaterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogThanksLaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
