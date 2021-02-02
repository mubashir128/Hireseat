import { TestBed, inject, waitForAsync } from '@angular/core/testing';

import { RecruiterGuard } from './recruiter.guard';

describe('RecruiterGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecruiterGuard]
    });
  });

  it('should ...', inject([RecruiterGuard], (guard: RecruiterGuard) => {
    expect(guard).toBeTruthy();
  }));
});
