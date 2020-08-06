import { RecruiterCoachingModule } from './recruiter-coaching.module';

describe('RecruiterCoachingModule', () => {
  let recruiterCoachingModule: RecruiterCoachingModule;

  beforeEach(() => {
    recruiterCoachingModule = new RecruiterCoachingModule();
  });

  it('should create an instance', () => {
    expect(recruiterCoachingModule).toBeTruthy();
  });
});
