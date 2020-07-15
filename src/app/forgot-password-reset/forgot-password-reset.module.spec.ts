import { ForgotPasswordResetModule } from './forgot-password-reset.module';

describe('ForgotPasswordResetModule', () => {
  let forgotPasswordResetModule: ForgotPasswordResetModule;

  beforeEach(() => {
    forgotPasswordResetModule = new ForgotPasswordResetModule();
  });

  it('should create an instance', () => {
    expect(forgotPasswordResetModule).toBeTruthy();
  });
});
