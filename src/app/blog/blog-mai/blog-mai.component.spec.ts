import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogMaiComponent } from './blog-mai.component';

describe('BlogMaiComponent', () => {
  let component: BlogMaiComponent;
  let fixture: ComponentFixture<BlogMaiComponent>;

  beforeEach(async(() => {
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
