import { AppComponentsModule } from './app-components.module';

describe('AppComponentsModule', () => {
  let appComponentsModule: AppComponentsModule;

  beforeEach(() => {
    appComponentsModule = new AppComponentsModule();
  });

  it('should create an instance', () => {
    expect(appComponentsModule).toBeTruthy();
  });
});
