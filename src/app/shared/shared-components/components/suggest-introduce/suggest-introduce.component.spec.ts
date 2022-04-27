import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestIntroduceComponent } from './suggest-introduce.component';

describe('SuggestIntroduceComponent', () => {
  let component: SuggestIntroduceComponent;
  let fixture: ComponentFixture<SuggestIntroduceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestIntroduceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestIntroduceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
