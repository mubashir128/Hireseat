import { SharedVideoRoutingModule } from './shared-video-routing.module';

describe('SharedVideoRoutingModule', () => {
  let sharedVideoRoutingModule: SharedVideoRoutingModule;

  beforeEach(() => {
    sharedVideoRoutingModule = new SharedVideoRoutingModule();
  });

  it('should create an instance', () => {
    expect(sharedVideoRoutingModule).toBeTruthy();
  });
});
