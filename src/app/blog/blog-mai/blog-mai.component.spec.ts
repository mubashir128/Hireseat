import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BlogMaiComponent } from './blog-mai.component';

describe('BlogMaiComponent', () => {
  let component: BlogMaiComponent;
  let fixture: ComponentFixture<BlogMaiComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogMaiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogMaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
