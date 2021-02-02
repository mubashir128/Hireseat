import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MyReviewedProfilesComponent } from './my-reviewed-profiles.component';

describe('MyReviewedProfilesComponent', () => {
  let component: MyReviewedProfilesComponent;
  let fixture: ComponentFixture<MyReviewedProfilesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MyReviewedProfilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyReviewedProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
