import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RecruiterDoughnutChartComponent } from './recruiter-doughnut-chart.component';

describe('RecruiterDoughnutChartComponent', () => {
  let component: RecruiterDoughnutChartComponent;
  let fixture: ComponentFixture<RecruiterDoughnutChartComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruiterDoughnutChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterDoughnutChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
