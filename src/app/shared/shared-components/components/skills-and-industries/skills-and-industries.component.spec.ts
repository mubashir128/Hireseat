import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsAndIndustriesComponent } from './skills-and-industries.component';

describe('SkillsAndIndustriesComponent', () => {
  let component: SkillsAndIndustriesComponent;
  let fixture: ComponentFixture<SkillsAndIndustriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillsAndIndustriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsAndIndustriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
