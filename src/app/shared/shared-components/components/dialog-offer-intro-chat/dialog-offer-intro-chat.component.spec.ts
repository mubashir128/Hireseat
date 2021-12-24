import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOfferIntroChatComponent } from './dialog-offer-intro-chat.component';

describe('DialogOfferIntroChatComponent', () => {
  let component: DialogOfferIntroChatComponent;
  let fixture: ComponentFixture<DialogOfferIntroChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogOfferIntroChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogOfferIntroChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
