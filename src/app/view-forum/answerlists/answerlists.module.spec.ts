import { AnswerlistsModule } from './answerlists.module';

describe('AnswerlistsModule', () => {
  let answerlistsModule: AnswerlistsModule;

  beforeEach(() => {
    answerlistsModule = new AnswerlistsModule();
  });

  it('should create an instance', () => {
    expect(answerlistsModule).toBeTruthy();
  });
});
