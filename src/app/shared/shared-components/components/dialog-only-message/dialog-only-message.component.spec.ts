import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOnlyMessageComponent } from './dialog-only-message.component';

describe('DialogOnlyMessageComponent', () => {
  let component: DialogOnlyMessageComponent;
  let fixture: ComponentFixture<DialogOnlyMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogOnlyMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogOnlyMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
