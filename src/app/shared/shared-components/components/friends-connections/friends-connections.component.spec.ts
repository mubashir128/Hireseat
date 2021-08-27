import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsConnectionsComponent } from './friends-connections.component';

describe('FriendsConnectionsComponent', () => {
  let component: FriendsConnectionsComponent;
  let fixture: ComponentFixture<FriendsConnectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendsConnectionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsConnectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
