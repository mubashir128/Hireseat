import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeerAnsComponent } from './employeer-ans.component';

describe('EmployeerAnsComponent', () => {
  let component: EmployeerAnsComponent;
  let fixture: ComponentFixture<EmployeerAnsComponent>;

  beforeEach(async(() => {
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
