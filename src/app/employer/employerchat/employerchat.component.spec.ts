import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerchatComponent } from './employerchat.component';

describe('EmployerchatComponent', () => {
  let component: EmployerchatComponent;
  let fixture: ComponentFixture<EmployerchatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerchatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
