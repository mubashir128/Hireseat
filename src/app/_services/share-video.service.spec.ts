import { TestBed, inject } from '@angular/core/testing';

import { ShareVideoService } from './share-video.service';

describe('ShareVideoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShareVideoService]
    });
  });

  it('should be created', inject([ShareVideoService], (service: ShareVideoService) => {
    expect(service).toBeTruthy();
  }));
});
