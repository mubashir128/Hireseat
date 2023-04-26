import { TestBed } from '@angular/core/testing';

import { PostJobService } from './post-job.service';

describe('PostJobService', () => {
  let service: PostJobService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostJobService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
