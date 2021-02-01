import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllBlogCategoriesComponent } from './all-blog-categories.component';

describe('AllBlogCategoriesComponent', () => {
  let component: AllBlogCategoriesComponent;
  let fixture: ComponentFixture<AllBlogCategoriesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AllBlogCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllBlogCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
