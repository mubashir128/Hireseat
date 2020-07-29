import { MycandidatesModule } from './mycandidates.module';

describe('MycandidatesModule', () => {
  let mycandidatesModule: MycandidatesModule;

  beforeEach(() => {
    mycandidatesModule = new MycandidatesModule();
  });

  it('should create an instance', () => {
    expect(mycandidatesModule).toBeTruthy();
  });
});
