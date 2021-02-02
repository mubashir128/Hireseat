import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ResumeItemComponent } from './resume-item.component';

describe('ResumeItemComponent', () => {
  let component: ResumeItemComponent;
  let fixture: ComponentFixture<ResumeItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumeItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
