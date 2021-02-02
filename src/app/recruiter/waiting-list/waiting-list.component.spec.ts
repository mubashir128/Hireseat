import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WaitingListComponent } from './waiting-list.component';

describe('WaitingListComponent', () => {
  let component: WaitingListComponent;
  let fixture: ComponentFixture<WaitingListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
