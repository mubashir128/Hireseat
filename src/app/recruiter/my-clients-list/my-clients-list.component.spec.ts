import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyClientsListComponent } from './my-clients-list.component';

describe('MyClientsListComponent', () => {
  let component: MyClientsListComponent;
  let fixture: ComponentFixture<MyClientsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyClientsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyClientsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
