import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUploadPictureComponent } from './dialog-upload-picture.component';

describe('DialogUploadPictureComponent', () => {
  let component: DialogUploadPictureComponent;
  let fixture: ComponentFixture<DialogUploadPictureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogUploadPictureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUploadPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
