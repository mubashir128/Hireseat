import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateImagePostComponent } from './create-image-post.component';

describe('CreateImagePostComponent', () => {
  let component: CreateImagePostComponent;
  let fixture: ComponentFixture<CreateImagePostComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateImagePostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateImagePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
