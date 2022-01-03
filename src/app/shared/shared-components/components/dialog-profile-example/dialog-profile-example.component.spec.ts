import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProfileExampleComponent } from './dialog-profile-example.component';

describe('DialogProfileExampleComponent', () => {
  let component: DialogProfileExampleComponent;
  let fixture: ComponentFixture<DialogProfileExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogProfileExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogProfileExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
