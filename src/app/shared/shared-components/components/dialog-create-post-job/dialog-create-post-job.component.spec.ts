import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreatePostJobComponent } from './dialog-create-post-job.component';

describe('DialogCreatePostJobComponent', () => {
  let component: DialogCreatePostJobComponent;
  let fixture: ComponentFixture<DialogCreatePostJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCreatePostJobComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCreatePostJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
