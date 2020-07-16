import { RecruiterFeedbackModule } from './recruiter-feedback.module';

describe('RecruiterFeedbackModule', () => {
  let recruiterFeedbackModule: RecruiterFeedbackModule;

  beforeEach(() => {
    recruiterFeedbackModule = new RecruiterFeedbackModule();
  });

  it('should create an instance', () => {
    expect(recruiterFeedbackModule).toBeTruthy();
  });
});
