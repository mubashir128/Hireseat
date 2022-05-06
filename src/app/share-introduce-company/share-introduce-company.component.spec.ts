import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareIntroduceCompanyComponent } from './share-introduce-company.component';

describe('ShareIntroduceCompanyComponent', () => {
  let component: ShareIntroduceCompanyComponent;
  let fixture: ComponentFixture<ShareIntroduceCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareIntroduceCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareIntroduceCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
