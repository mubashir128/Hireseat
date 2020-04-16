import { TestBed, inject } from '@angular/core/testing';

import { VideoCallingService } from './video-calling.service';

describe('VideoCallingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VideoCallingService]
    });
  });

  it('should be created', inject([VideoCallingService], (service: VideoCallingService) => {
    expect(service).toBeTruthy();
  }));
});
