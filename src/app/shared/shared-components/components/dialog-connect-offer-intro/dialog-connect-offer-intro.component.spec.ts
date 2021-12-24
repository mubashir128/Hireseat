import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConnectOfferIntroComponent } from './dialog-connect-offer-intro.component';

describe('DialogConnectOfferIntroComponent', () => {
  let component: DialogConnectOfferIntroComponent;
  let fixture: ComponentFixture<DialogConnectOfferIntroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogConnectOfferIntroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConnectOfferIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
