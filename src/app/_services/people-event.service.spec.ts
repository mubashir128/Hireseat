import { TestBed } from '@angular/core/testing';

import { PeopleEventService } from './people-event.service';

describe('PeopleEventService', () => {
  let service: PeopleEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeopleEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
