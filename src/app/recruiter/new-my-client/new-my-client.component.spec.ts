import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMyClientComponent } from './new-my-client.component';

describe('NewMyClientComponent', () => {
  let component: NewMyClientComponent;
  let fixture: ComponentFixture<NewMyClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewMyClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMyClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
