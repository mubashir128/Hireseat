import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SAUserListComponent } from './sa-user-list.component';

describe('SAUserListComponent', () => {
  let component: SAUserListComponent;
  let fixture: ComponentFixture<SAUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SAUserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SAUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
