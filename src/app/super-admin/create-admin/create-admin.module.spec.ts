import { CreateAdminModule } from './create-admin.module';

describe('CreateAdminModule', () => {
  let createAdminModule: CreateAdminModule;

  beforeEach(() => {
    createAdminModule = new CreateAdminModule();
  });

  it('should create an instance', () => {
    expect(createAdminModule).toBeTruthy();
  });
});
