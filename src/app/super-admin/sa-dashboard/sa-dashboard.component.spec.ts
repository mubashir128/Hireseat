import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SADashboardComponent } from './sa-dashboard.component';

describe('SADashboardComponent', () => {
  let component: SADashboardComponent;
  let fixture: ComponentFixture<SADashboardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SADashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SADashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
