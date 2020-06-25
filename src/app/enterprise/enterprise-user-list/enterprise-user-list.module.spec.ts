import { EnterpriseUserListModule } from './enterprise-user-list.module';

describe('EnterpriseUserListModule', () => {
  let enterpriseUserListModule: EnterpriseUserListModule;

  beforeEach(() => {
    enterpriseUserListModule = new EnterpriseUserListModule();
  });

  it('should create an instance', () => {
    expect(enterpriseUserListModule).toBeTruthy();
  });
});
