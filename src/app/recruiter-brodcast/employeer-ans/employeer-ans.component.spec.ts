import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EmployeerAnsComponent } from './employeer-ans.component';

describe('EmployeerAnsComponent', () => {
  let component: EmployeerAnsComponent;
  let fixture: ComponentFixture<EmployeerAnsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeerAnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeerAnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
