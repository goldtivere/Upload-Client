import { AuthComponentsModule } from './auth-components.module';

describe('AuthComponentsModule', () => {
  let authComponentsModule: AuthComponentsModule;

  beforeEach(() => {
    authComponentsModule = new AuthComponentsModule();
  });

  it('should create an instance', () => {
    expect(authComponentsModule).toBeTruthy();
  });
});
