import { CreateEnterpriseModule } from './create-enterprise.module';

describe('CreateEnterpriseModule', () => {
  let createEnterpriseModule: CreateEnterpriseModule;

  beforeEach(() => {
    createEnterpriseModule = new CreateEnterpriseModule();
  });

  it('should create an instance', () => {
    expect(createEnterpriseModule).toBeTruthy();
  });
});
