import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLoaderSearchComponent } from './list-loader-search.component';

describe('ListLoaderSearchComponent', () => {
  let component: ListLoaderSearchComponent;
  let fixture: ComponentFixture<ListLoaderSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListLoaderSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLoaderSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
