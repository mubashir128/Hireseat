import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterLineChartComponent } from './recruiter-line-chart.component';

describe('RecruiterLineChartComponent', () => {
  let component: RecruiterLineChartComponent;
  let fixture: ComponentFixture<RecruiterLineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruiterLineChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
