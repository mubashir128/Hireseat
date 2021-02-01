import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllBlogTagComponent } from './all-blog-tag.component';

describe('AllBlogTagComponent', () => {
  let component: AllBlogTagComponent;
  let fixture: ComponentFixture<AllBlogTagComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AllBlogTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllBlogTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
