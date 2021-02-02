import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SearchResumeComponent } from './search-resume.component';

describe('SearchResumeComponent', () => {
  let component: SearchResumeComponent;
  let fixture: ComponentFixture<SearchResumeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchResumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
