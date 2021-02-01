import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditBlogComponent } from './edit-blog.component';

describe('EditBlogComponent', () => {
  let component: EditBlogComponent;
  let fixture: ComponentFixture<EditBlogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
