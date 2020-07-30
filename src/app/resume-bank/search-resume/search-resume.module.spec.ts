import { SearchResumeModule } from './search-resume.module';

describe('SearchResumeModule', () => {
  let searchResumeModule: SearchResumeModule;

  beforeEach(() => {
    searchResumeModule = new SearchResumeModule();
  });

  it('should create an instance', () => {
    expect(searchResumeModule).toBeTruthy();
  });
});
