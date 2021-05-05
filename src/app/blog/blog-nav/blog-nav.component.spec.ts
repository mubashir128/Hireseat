import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BlogNavComponent } from './blog-nav.component';

describe('BlogNavComponent', () => {
  let component: BlogNavComponent;
  let fixture: ComponentFixture<BlogNavComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
