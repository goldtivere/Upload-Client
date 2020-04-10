import { AppServicesModule } from './app-services.module';

describe('AppServicesModule', () => {
  let appServicesModule: AppServicesModule;

  beforeEach(() => {
    appServicesModule = new AppServicesModule();
  });

  it('should create an instance', () => {
    expect(appServicesModule).toBeTruthy();
  });
});
