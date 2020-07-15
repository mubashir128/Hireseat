import { UserlistModule } from './userlist.module';

describe('UserlistModule', () => {
  let userlistModule: UserlistModule;

  beforeEach(() => {
    userlistModule = new UserlistModule();
  });

  it('should create an instance', () => {
    expect(userlistModule).toBeTruthy();
  });
});
