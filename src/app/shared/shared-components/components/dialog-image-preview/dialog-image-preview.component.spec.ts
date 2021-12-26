import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogImagePreviewComponent } from './dialog-image-preview.component';

describe('DialogImagePreviewComponent', () => {
  let component: DialogImagePreviewComponent;
  let fixture: ComponentFixture<DialogImagePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogImagePreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogImagePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
