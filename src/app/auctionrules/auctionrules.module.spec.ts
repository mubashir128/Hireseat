import { AuctionrulesModule } from './auctionrules.module';

describe('AuctionrulesModule', () => {
  let auctionrulesModule: AuctionrulesModule;

  beforeEach(() => {
    auctionrulesModule = new AuctionrulesModule();
  });

  it('should create an instance', () => {
    expect(auctionrulesModule).toBeTruthy();
  });
});
