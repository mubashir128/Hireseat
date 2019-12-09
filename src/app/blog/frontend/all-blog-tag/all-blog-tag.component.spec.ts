import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBlogTagComponent } from './all-blog-tag.component';

describe('AllBlogTagComponent', () => {
  let component: AllBlogTagComponent;
  let fixture: ComponentFixture<AllBlogTagComponent>;

  beforeEach(async(() => {
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
