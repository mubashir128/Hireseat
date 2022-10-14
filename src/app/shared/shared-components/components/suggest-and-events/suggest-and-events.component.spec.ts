import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestAndEventsComponent } from './suggest-and-events.component';

describe('SuggestAndEventsComponent', () => {
  let component: SuggestAndEventsComponent;
  let fixture: ComponentFixture<SuggestAndEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestAndEventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestAndEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
