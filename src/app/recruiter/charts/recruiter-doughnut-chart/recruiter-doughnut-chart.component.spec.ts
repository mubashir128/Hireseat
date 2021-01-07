import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterDoughnutChartComponent } from './recruiter-doughnut-chart.component';

describe('RecruiterDoughnutChartComponent', () => {
  let component: RecruiterDoughnutChartComponent;
  let fixture: ComponentFixture<RecruiterDoughnutChartComponent>;

  beforeEach(async(() => {
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
