import { ResumeListModule } from './resume-list.module';

describe('ResumeListModule', () => {
  let resumeListModule: ResumeListModule;

  beforeEach(() => {
    resumeListModule = new ResumeListModule();
  });

  it('should create an instance', () => {
    expect(resumeListModule).toBeTruthy();
  });
});
