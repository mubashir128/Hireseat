import { SAUserListModule } from './sa-user-list.module';

describe('SAUserListModule', () => {
  let sAUserListModule: SAUserListModule;

  beforeEach(() => {
    sAUserListModule = new SAUserListModule();
  });

  it('should create an instance', () => {
    expect(sAUserListModule).toBeTruthy();
  });
});
