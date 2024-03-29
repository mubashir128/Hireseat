import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SinglePageComponent } from './single-page.component';

describe('SinglePageComponent', () => {
  let component: SinglePageComponent;
  let fixture: ComponentFixture<SinglePageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
