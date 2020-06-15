import { SharedVideoModule } from './shared-video.module';

describe('SharedVideoModule', () => {
  let sharedVideoModule: SharedVideoModule;

  beforeEach(() => {
    sharedVideoModule = new SharedVideoModule();
  });

  it('should create an instance', () => {
    expect(sharedVideoModule).toBeTruthy();
  });
});
