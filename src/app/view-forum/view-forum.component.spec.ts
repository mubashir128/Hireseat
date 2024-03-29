import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ViewForumComponent } from './view-forum.component';

describe('ViewForumComponent', () => {
  let component: ViewForumComponent;
  let fixture: ComponentFixture<ViewForumComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewForumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
