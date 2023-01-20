import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestConnectedComponent } from './suggest-connected.component';

describe('SuggestConnectedComponent', () => {
  let component: SuggestConnectedComponent;
  let fixture: ComponentFixture<SuggestConnectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestConnectedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestConnectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
