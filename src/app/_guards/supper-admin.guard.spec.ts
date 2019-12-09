import { TestBed, async, inject } from '@angular/core/testing';

import { SupperAdminGuard } from './supper-admin.guard';

describe('SupperAdminGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SupperAdminGuard]
    });
  });

  it('should ...', inject([SupperAdminGuard], (guard: SupperAdminGuard) => {
    expect(guard).toBeTruthy();
  }));
});
