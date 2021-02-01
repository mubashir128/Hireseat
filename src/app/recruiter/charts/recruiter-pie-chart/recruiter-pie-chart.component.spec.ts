import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RecruiterPieChartComponent } from './recruiter-pie-chart.component';

describe('RecruiterPieChartComponent', () => {
  let component: RecruiterPieChartComponent;
  let fixture: ComponentFixture<RecruiterPieChartComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruiterPieChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
