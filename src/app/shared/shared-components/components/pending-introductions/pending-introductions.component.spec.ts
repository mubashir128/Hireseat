import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingIntroductionsComponent } from './pending-introductions.component';

describe('PendingIntroductionsComponent', () => {
  let component: PendingIntroductionsComponent;
  let fixture: ComponentFixture<PendingIntroductionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingIntroductionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingIntroductionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
