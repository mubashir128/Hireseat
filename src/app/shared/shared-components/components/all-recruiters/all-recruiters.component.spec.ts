import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllRecruitersComponent } from './all-recruiters.component';

describe('AllRecruitersComponent', () => {
  let component: AllRecruitersComponent;
  let fixture: ComponentFixture<AllRecruitersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AllRecruitersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllRecruitersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
