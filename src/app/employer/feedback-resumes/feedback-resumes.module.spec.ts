import { FeedbackResumesModule } from './feedback-resumes.module';

describe('FeedbackResumesModule', () => {
  let feedbackResumesModule: FeedbackResumesModule;

  beforeEach(() => {
    feedbackResumesModule = new FeedbackResumesModule();
  });

  it('should create an instance', () => {
    expect(feedbackResumesModule).toBeTruthy();
  });
});
