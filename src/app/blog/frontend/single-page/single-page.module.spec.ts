import { SinglePageModule } from './single-page.module';

describe('SinglePageModule', () => {
  let singlePageModule: SinglePageModule;

  beforeEach(() => {
    singlePageModule = new SinglePageModule();
  });

  it('should create an instance', () => {
    expect(singlePageModule).toBeTruthy();
  });
});
