import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBlogCategoriesComponent } from './all-blog-categories.component';

describe('AllBlogCategoriesComponent', () => {
  let component: AllBlogCategoriesComponent;
  let fixture: ComponentFixture<AllBlogCategoriesComponent>;

  beforeEach(async(() => {
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
