import { AllPostModule } from './all-post.module';

describe('AllPostModule', () => {
  let allPostModule: AllPostModule;

  beforeEach(() => {
    allPostModule = new AllPostModule();
  });

  it('should create an instance', () => {
    expect(allPostModule).toBeTruthy();
  });
});
