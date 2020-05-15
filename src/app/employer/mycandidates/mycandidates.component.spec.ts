import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MycandidatesComponent } from './mycandidates.component';

describe('MycandidatesComponent', () => {
  let component: MycandidatesComponent;
  let fixture: ComponentFixture<MycandidatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MycandidatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MycandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
