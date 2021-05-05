import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EnterpriseNavbarComponent } from './enterprise-navbar.component';

describe('EnterpriseNavbarComponent', () => {
  let component: EnterpriseNavbarComponent;
  let fixture: ComponentFixture<EnterpriseNavbarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterpriseNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterpriseNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
