import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditJobProfileComponent } from './edit-job-profile.component';

describe('EditJobProfileComponent', () => {
  let component: EditJobProfileComponent;
  let fixture: ComponentFixture<EditJobProfileComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditJobProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditJobProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
