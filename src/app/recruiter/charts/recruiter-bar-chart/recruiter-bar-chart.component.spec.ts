import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RecruiterBarChartComponent } from './recruiter-bar-chart.component';

describe('RecruiterBarChartComponent', () => {
  let component: RecruiterBarChartComponent;
  let fixture: ComponentFixture<RecruiterBarChartComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruiterBarChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
