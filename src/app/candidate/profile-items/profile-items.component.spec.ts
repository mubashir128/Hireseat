import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileItemsComponent } from './profile-items.component';

describe('ProfileItemsComponent', () => {
  let component: ProfileItemsComponent;
  let fixture: ComponentFixture<ProfileItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
