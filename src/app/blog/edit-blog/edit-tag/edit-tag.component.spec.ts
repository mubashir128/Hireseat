import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditTagComponent } from './edit-tag.component';

describe('EditTagComponent', () => {
  let component: EditTagComponent;
  let fixture: ComponentFixture<EditTagComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
