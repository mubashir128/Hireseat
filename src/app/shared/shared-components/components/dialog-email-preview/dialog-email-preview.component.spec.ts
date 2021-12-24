import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEmailPreviewComponent } from './dialog-email-preview.component';

describe('DialogEmailPreviewComponent', () => {
  let component: DialogEmailPreviewComponent;
  let fixture: ComponentFixture<DialogEmailPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEmailPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEmailPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
