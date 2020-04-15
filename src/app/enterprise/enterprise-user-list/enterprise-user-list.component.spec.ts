import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseUserListComponent } from './enterprise-user-list.component';

describe('EnterpriseUserListComponent', () => {
  let component: EnterpriseUserListComponent;
  let fixture: ComponentFixture<EnterpriseUserListComponent>;

  beforeEach(async(() => {
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
