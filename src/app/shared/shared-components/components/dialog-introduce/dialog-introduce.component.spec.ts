import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogIntroduceComponent } from './dialog-introduce.component';

describe('DialogIntroduceComponent', () => {
  let component: DialogIntroduceComponent;
  let fixture: ComponentFixture<DialogIntroduceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogIntroduceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogIntroduceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
