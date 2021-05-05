import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateEmployerComponent } from './create-employer.component';

describe('CreateEmployerComponent', () => {
  let component: CreateEmployerComponent;
  let fixture: ComponentFixture<CreateEmployerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEmployerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEmployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
