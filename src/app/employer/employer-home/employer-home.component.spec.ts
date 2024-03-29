import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EmployerHomeComponent } from './employer-home.component';

describe('EmployerHomeComponent', () => {
  let component: EmployerHomeComponent;
  let fixture: ComponentFixture<EmployerHomeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployerHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
