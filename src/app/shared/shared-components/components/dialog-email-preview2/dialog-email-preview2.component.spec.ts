import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEmailPreview2Component } from './dialog-email-preview2.component';

describe('DialogEmailPreview2Component', () => {
  let component: DialogEmailPreview2Component;
  let fixture: ComponentFixture<DialogEmailPreview2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEmailPreview2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEmailPreview2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
