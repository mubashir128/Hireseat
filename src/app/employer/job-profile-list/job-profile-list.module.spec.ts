import { JobProfileListModule } from './job-profile-list.module';

describe('JobProfileListModule', () => {
  let jobProfileListModule: JobProfileListModule;

  beforeEach(() => {
    jobProfileListModule = new JobProfileListModule();
  });

  it('should create an instance', () => {
    expect(jobProfileListModule).toBeTruthy();
  });
});
