import { BiddingEventDetailsModule } from './bidding-event-details.module';

describe('BiddingEventDetailsModule', () => {
  let biddingEventDetailsModule: BiddingEventDetailsModule;

  beforeEach(() => {
    biddingEventDetailsModule = new BiddingEventDetailsModule();
  });

  it('should create an instance', () => {
    expect(biddingEventDetailsModule).toBeTruthy();
  });
});
