import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntrosTabComponent } from './intros-tab.component';

describe('IntrosTabComponent', () => {
  let component: IntrosTabComponent;
  let fixture: ComponentFixture<IntrosTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntrosTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntrosTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
