import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SANavbarComponent } from './sa-navbar.component';

describe('SANavbarComponent', () => {
  let component: SANavbarComponent;
  let fixture: ComponentFixture<SANavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SANavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SANavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
