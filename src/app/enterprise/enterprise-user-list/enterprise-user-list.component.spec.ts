import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EnterpriseUserListComponent } from './enterprise-user-list.component';

describe('EnterpriseUserListComponent', () => {
  let component: EnterpriseUserListComponent;
  let fixture: ComponentFixture<EnterpriseUserListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterpriseUserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterpriseUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
