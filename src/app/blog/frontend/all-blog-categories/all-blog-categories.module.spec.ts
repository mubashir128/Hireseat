import { AllBlogCategoriesModule } from './all-blog-categories.module';

describe('AllBlogCategoriesModule', () => {
  let allBlogCategoriesModule: AllBlogCategoriesModule;

  beforeEach(() => {
    allBlogCategoriesModule = new AllBlogCategoriesModule();
  });

  it('should create an instance', () => {
    expect(allBlogCategoriesModule).toBeTruthy();
  });
});
