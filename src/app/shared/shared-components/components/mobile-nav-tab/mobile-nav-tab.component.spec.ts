import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileNavTabComponent } from './mobile-nav-tab.component';

describe('MobileNavTabComponent', () => {
  let component: MobileNavTabComponent;
  let fixture: ComponentFixture<MobileNavTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileNavTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileNavTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
