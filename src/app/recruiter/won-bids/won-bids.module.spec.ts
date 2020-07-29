import { WonBidsModule } from './won-bids.module';

describe('WonBidsModule', () => {
  let wonBidsModule: WonBidsModule;

  beforeEach(() => {
    wonBidsModule = new WonBidsModule();
  });

  it('should create an instance', () => {
    expect(wonBidsModule).toBeTruthy();
  });
});
