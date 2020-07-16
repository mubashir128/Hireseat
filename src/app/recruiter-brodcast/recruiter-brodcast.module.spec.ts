import { RecruiterBrodcastModule } from './recruiter-brodcast.module';

describe('RecruiterBrodcastModule', () => {
  let recruiterBrodcastModule: RecruiterBrodcastModule;

  beforeEach(() => {
    recruiterBrodcastModule = new RecruiterBrodcastModule();
  });

  it('should create an instance', () => {
    expect(recruiterBrodcastModule).toBeTruthy();
  });
});
