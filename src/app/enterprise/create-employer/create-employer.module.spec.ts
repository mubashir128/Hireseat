import { CreateEmployerModule } from './create-employer.module';

describe('CreateEmployerModule', () => {
  let createEmployerModule: CreateEmployerModule;

  beforeEach(() => {
    createEmployerModule = new CreateEmployerModule();
  });

  it('should create an instance', () => {
    expect(createEmployerModule).toBeTruthy();
  });
});
