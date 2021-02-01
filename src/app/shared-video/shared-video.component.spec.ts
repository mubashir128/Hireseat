import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SharedVideoComponent } from './shared-video.component';

describe('SharedVideoComponent', () => {
  let component: SharedVideoComponent;
  let fixture: ComponentFixture<SharedVideoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
