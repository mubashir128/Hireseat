import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaplogOfferIntroEmailComponent } from './diaplog-offer-intro-email.component';

describe('DiaplogOfferIntroEmailComponent', () => {
  let component: DiaplogOfferIntroEmailComponent;
  let fixture: ComponentFixture<DiaplogOfferIntroEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiaplogOfferIntroEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaplogOfferIntroEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
