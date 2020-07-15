import { AllBlogTagModule } from './all-blog-tag.module';

describe('AllBlogTagModule', () => {
  let allBlogTagModule: AllBlogTagModule;

  beforeEach(() => {
    allBlogTagModule = new AllBlogTagModule();
  });

  it('should create an instance', () => {
    expect(allBlogTagModule).toBeTruthy();
  });
});
