import { TestBed } from '@angular/core/testing';

import { SkillsetsService } from './skillsets.service';

describe('SkillsetsService', () => {
  let service: SkillsetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkillsetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
