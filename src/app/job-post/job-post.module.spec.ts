import { JobPostModule } from './job-post.module';

describe('JobPostModule', () => {
  let jobPostModule: JobPostModule;

  beforeEach(() => {
    jobPostModule = new JobPostModule();
  });

  it('should create an instance', () => {
    expect(jobPostModule).toBeTruthy();
  });
});
