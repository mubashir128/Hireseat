import { TestBed, inject, waitForAsync } from '@angular/core/testing';

import { EmployerGuard } from './employer.guard';

describe('EmployerGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployerGuard]
    });
  });

  it('should ...', inject([EmployerGuard], (guard: EmployerGuard) => {
    expect(guard).toBeTruthy();
  }));
});
