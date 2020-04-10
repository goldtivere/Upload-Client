import { AuthServicesModule } from './auth-services.module';

describe('AuthServicesModule', () => {
  let authServicesModule: AuthServicesModule;

  beforeEach(() => {
    authServicesModule = new AuthServicesModule();
  });

  it('should create an instance', () => {
    expect(authServicesModule).toBeTruthy();
  });
});
