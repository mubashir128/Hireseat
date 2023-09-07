import { TestBed } from '@angular/core/testing';

import { DesiredCompaniesService } from './desired-companies.service';

describe('DesiredCompaniesService', () => {
  let service: DesiredCompaniesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DesiredCompaniesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
