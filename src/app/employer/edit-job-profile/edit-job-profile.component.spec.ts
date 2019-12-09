import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditJobProfileComponent } from './edit-job-profile.component';

describe('EditJobProfileComponent', () => {
  let component: EditJobProfileComponent;
  let fixture: ComponentFixture<EditJobProfileComponent>;

  beforeEach(async(() => {
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
