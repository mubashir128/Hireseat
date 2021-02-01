import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AnswerlistsComponent } from './answerlists.component';

describe('AnswerlistsComponent', () => {
  let component: AnswerlistsComponent;
  let fixture: ComponentFixture<AnswerlistsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswerlistsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerlistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
