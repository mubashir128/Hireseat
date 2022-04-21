import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAskToSendProfileLinkComponent } from './dialog-ask-to-send-profile-link.component';

describe('DialogAskToSendProfileLinkComponent', () => {
  let component: DialogAskToSendProfileLinkComponent;
  let fixture: ComponentFixture<DialogAskToSendProfileLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAskToSendProfileLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAskToSendProfileLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
